using backend.DTOs;
using backend.Exceptions;
using backend.Mapping;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    /// <summary>
    /// Provides business logic for appointment booking operations.
    /// </summary>
    public class AppointmentService : IAppointmentService
    {
        #region Private Fields

        /// <summary>
        /// Represents appointment repository dependency.
        /// </summary>
        private readonly IAppointmentRepository _appointmentRepository;

        /// <summary>
        /// Represents reflection mapper dependency.
        /// </summary>
        private readonly IReflectionMapper _reflectionMapper;

        /// <summary>
        /// Represents in-memory workflow state for appointment creation.
        /// </summary>
        private AppointmentCreateWorkflowState? _createAppointmentState;

        /// <summary>
        /// Represents in-memory workflow state for appointment decision.
        /// </summary>
        private AppointmentDecisionWorkflowState? _decideAppointmentState;

        /// <summary>
        /// Represents in-memory workflow state for appointment cancellation.
        /// </summary>
        private AppointmentCancelWorkflowState? _cancelAppointmentState;

        /// <summary>
        /// Represents in-memory workflow state for slot creation.
        /// </summary>
        private CreateAppointmentSlotWorkflowState? _createSlotState;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="AppointmentService"/> class.
        /// </summary>
        /// <param name="appointmentRepository">The appointment repository.</param>
        /// <param name="reflectionMapper">The reflection mapper.</param>
        public AppointmentService(IAppointmentRepository appointmentRepository, IReflectionMapper reflectionMapper)
        {
            _appointmentRepository = appointmentRepository;
            _reflectionMapper = reflectionMapper;
        }

        #endregion

        #region Public Methods

        /// <inheritdoc/>
        public async Task<List<AvailableDoctorResponse>> GetAvailableDoctorsAsync(int patientUserId)
        {
            TBL01? patient = await _appointmentRepository.FindUserByIdAsync(patientUserId);
            if (patient == null || patient.L01F02 != UserType.PATIENT)
            {
                throw new AppException("Patient profile not found.", StatusCodes.Status400BadRequest);
            }

            List<TBL03> doctors = await _appointmentRepository.GetAllDoctorsAsync();
            List<AvailableDoctorResponse> doctorResponses = new List<AvailableDoctorResponse>();

            foreach (TBL03 doctor in doctors)
            {
                if (doctor.L03F07 == null || doctor.L03F07.L01F02 != UserType.DOCTOR)
                {
                    continue;
                }

                AvailableDoctorResponse response = _reflectionMapper.Map<TBL01, AvailableDoctorResponse>(doctor.L03F07);
                _reflectionMapper.MapToExisting<TBL03, AvailableDoctorResponse>(doctor, response);
                doctorResponses.Add(response);
            }

            return doctorResponses;
        }

        /// <inheritdoc/>
        public Task<TBL04> CreateAppointmentPresaveAsync(int patientUserId, CreateAppointmentRequest request)
        {
            TBL04 appointment = _reflectionMapper.Map<CreateAppointmentRequest, TBL04>(request);

            appointment.L04F02 = patientUserId;
            appointment.L04F06 = AppointmentStatus.PENDING;
            appointment.L04F08 = DateTime.UtcNow;
            appointment.L04F09 = DateTime.UtcNow;

            _createAppointmentState = new AppointmentCreateWorkflowState
            {
                PatientUserId = patientUserId,
                Request = request,
                Appointment = appointment
            };

            return Task.FromResult(appointment);
        }

        /// <inheritdoc/>
        public async Task CreateAppointmentValidateAsync()
        {
            if (_createAppointmentState == null)
            {
                throw new AppException("Invalid appointment workflow state.", StatusCodes.Status400BadRequest);
            }

            TBL01? patient = await _appointmentRepository.FindUserByIdAsync(_createAppointmentState.PatientUserId);
            if (patient == null || patient.L01F02 != UserType.PATIENT)
            {
                throw new AppException("Patient profile not found.", StatusCodes.Status400BadRequest);
            }

            bool doctorExists = await _appointmentRepository.DoesDoctorExistAsync(_createAppointmentState.Request.DoctorUserId);
            if (!doctorExists)
            {
                throw new AppException("Doctor not found.", StatusCodes.Status404NotFound);
            }

            // Validate slot exists and is available
            TBL07? slot = await _appointmentRepository.FindSlotByIdAsync(_createAppointmentState.Request.SlotId);
            if (slot == null)
            {
                throw new AppException("Appointment slot not found.", StatusCodes.Status404NotFound);
            }

            if (slot.L07F02 != _createAppointmentState.Request.DoctorUserId)
            {
                throw new AppException("This slot does not belong to the selected doctor.", StatusCodes.Status400BadRequest);
            }

            if (slot.L07F06)
            {
                throw new AppException("This appointment slot is already booked.", StatusCodes.Status400BadRequest);
            }

            if (slot.L07F04 <= DateTime.UtcNow)
            {
                throw new AppException("Cannot book a slot in the past.", StatusCodes.Status400BadRequest);
            }

            // Set appointment time from slot
            _createAppointmentState.Appointment.L04F04 = slot.L07F04;
        }

        /// <inheritdoc/>
        public async Task<AppointmentResponse> CreateAppointmentSaveAsync()
        {
            if (_createAppointmentState == null)
            {
                throw new AppException("Invalid appointment workflow state.", StatusCodes.Status400BadRequest);
            }

            _createAppointmentState.Appointment.L04F08 = DateTime.UtcNow;
            _createAppointmentState.Appointment.L04F09 = DateTime.UtcNow;

            int appointmentId = await _appointmentRepository.CreateAppointmentAsync(_createAppointmentState.Appointment);
            _createAppointmentState.Appointment.L04F01 = appointmentId;

            // Mark slot as booked
            await _appointmentRepository.MarkSlotAsBookedAsync(_createAppointmentState.Request.SlotId, true);

            AppointmentResponse response = _reflectionMapper.Map<TBL04, AppointmentResponse>(_createAppointmentState.Appointment);
            _createAppointmentState = null;

            return response;
        }

        /// <inheritdoc/>
        public async Task<List<AppointmentResponse>> GetPendingAppointmentsAsync(int doctorUserId)
        {
            bool doctorExists = await _appointmentRepository.DoesDoctorExistAsync(doctorUserId);
            if (!doctorExists)
            {
                throw new AppException("Doctor profile not found.", StatusCodes.Status400BadRequest);
            }

            List<TBL04> appointments = await _appointmentRepository
                .GetDoctorAppointmentsByStatusAsync(doctorUserId, AppointmentStatus.PENDING);

            List<AppointmentResponse> responses = appointments
                .Select(appointment => _reflectionMapper.Map<TBL04, AppointmentResponse>(appointment))
                .ToList();

            return responses;
        }

        /// <inheritdoc/>
        public Task DecideAppointmentPresaveAsync(int doctorUserId, int appointmentId, AppointmentDecisionRequest request)
        {
            _decideAppointmentState = new AppointmentDecisionWorkflowState
            {
                DoctorUserId = doctorUserId,
                AppointmentId = appointmentId,
                Request = request
            };

            return Task.CompletedTask;
        }

        /// <inheritdoc/>
        public async Task DecideAppointmentValidateAsync()
        {
            if (_decideAppointmentState == null)
            {
                throw new AppException("Invalid appointment workflow state.", StatusCodes.Status400BadRequest);
            }

            TBL04 appointment = await ValidateDoctorAndGetOwnedAppointmentAsync(
                _decideAppointmentState.DoctorUserId,
                _decideAppointmentState.AppointmentId);

            if (appointment.L04F06 != AppointmentStatus.PENDING)
            {
                throw new AppException("Only pending appointments can be approved or declined.", StatusCodes.Status400BadRequest);
            }

            _decideAppointmentState.Appointment = appointment;
        }

        /// <inheritdoc/>
        public async Task DecideAppointmentSaveAsync()
        {
            if (_decideAppointmentState?.Appointment == null)
            {
                throw new AppException("Invalid appointment workflow state.", StatusCodes.Status400BadRequest);
            }

            _decideAppointmentState.Appointment.L04F06 = _decideAppointmentState.Request.Decision == AppointmentDecisionAction.APPROVE
                ? AppointmentStatus.APPROVED
                : AppointmentStatus.DECLINED;
            _decideAppointmentState.Appointment.L04F07 = _decideAppointmentState.Request.DoctorNotes;
            _decideAppointmentState.Appointment.L04F09 = DateTime.UtcNow;

            await _appointmentRepository.UpdateAppointmentAsync(_decideAppointmentState.Appointment);

            // If declined, find and unbook the slot
            if (_decideAppointmentState.Request.Decision == AppointmentDecisionAction.DECLINE)
            {
                List<TBL07> slots = await _appointmentRepository.GetDoctorSlotsAsync(
                    _decideAppointmentState.DoctorUserId,
                    includeBooked: true);

                TBL07? bookedSlot = slots.FirstOrDefault(s =>
                    s.L07F04 == _decideAppointmentState.Appointment.L04F04 && s.L07F06);

                if (bookedSlot != null)
                {
                    await _appointmentRepository.MarkSlotAsBookedAsync(bookedSlot.L07F01, false);
                }
            }

            _decideAppointmentState = null;
        }

        /// <inheritdoc/>
        public Task CancelFutureAppointmentPresaveAsync(int doctorUserId, int appointmentId, CancelAppointmentRequest request)
        {
            _cancelAppointmentState = new AppointmentCancelWorkflowState
            {
                DoctorUserId = doctorUserId,
                AppointmentId = appointmentId,
                Request = request
            };

            return Task.CompletedTask;
        }

        /// <inheritdoc/>
        public async Task CancelFutureAppointmentValidateAsync()
        {
            if (_cancelAppointmentState == null)
            {
                throw new AppException("Invalid appointment workflow state.", StatusCodes.Status400BadRequest);
            }

            TBL04 appointment = await ValidateDoctorAndGetOwnedAppointmentAsync(
                _cancelAppointmentState.DoctorUserId,
                _cancelAppointmentState.AppointmentId);

            if (appointment.L04F04 <= DateTime.UtcNow)
            {
                throw new AppException("Only future appointments can be cancelled.", StatusCodes.Status400BadRequest);
            }

            if (appointment.L04F06 != AppointmentStatus.PENDING && appointment.L04F06 != AppointmentStatus.APPROVED)
            {
                throw new AppException("Only pending or approved appointments can be cancelled.", StatusCodes.Status400BadRequest);
            }

            _cancelAppointmentState.Appointment = appointment;
        }

        /// <inheritdoc/>
        public async Task CancelFutureAppointmentSaveAsync()
        {
            if (_cancelAppointmentState?.Appointment == null)
            {
                throw new AppException("Invalid appointment workflow state.", StatusCodes.Status400BadRequest);
            }

            _reflectionMapper.MapToExisting<CancelAppointmentRequest, TBL04>(
                _cancelAppointmentState.Request,
                _cancelAppointmentState.Appointment);
            _cancelAppointmentState.Appointment.L04F06 = AppointmentStatus.CANCELLED;
            _cancelAppointmentState.Appointment.L04F09 = DateTime.UtcNow;

            await _appointmentRepository.UpdateAppointmentAsync(_cancelAppointmentState.Appointment);

            // Find and unbook the slot
            List<TBL07> slots = await _appointmentRepository.GetDoctorSlotsAsync(
                _cancelAppointmentState.DoctorUserId,
                includeBooked: true);

            TBL07? bookedSlot = slots.FirstOrDefault(s =>
                s.L07F04 == _cancelAppointmentState.Appointment.L04F04 && s.L07F06);

            if (bookedSlot != null)
            {
                await _appointmentRepository.MarkSlotAsBookedAsync(bookedSlot.L07F01, false);
            }

            _cancelAppointmentState = null;
        }

        /// <inheritdoc/>
        public async Task CreateSlotPresaveAsync(int doctorUserId, CreateAppointmentSlotRequest request)
        {
            bool doctorExists = await _appointmentRepository.DoesDoctorExistAsync(doctorUserId);
            if (!doctorExists)
            {
                throw new AppException("Doctor profile not found.", StatusCodes.Status404NotFound);
            }

            TBL07 slot = _reflectionMapper.Map<CreateAppointmentSlotRequest, TBL07>(request);
            slot.L07F02 = doctorUserId;
            slot.L07F06 = false;
            slot.L07F07 = DateTime.UtcNow;

            _createSlotState = new CreateAppointmentSlotWorkflowState
            {
                DoctorUserId = doctorUserId,
                Request = request,
                Slot = slot
            };
        }

        /// <inheritdoc/>
        public async Task CreateSlotValidateAsync()
        {
            if (_createSlotState == null)
            {
                throw new AppException("Invalid slot creation workflow state.", StatusCodes.Status400BadRequest);
            }

            if (_createSlotState.Request.SlotStartUtc <= DateTime.UtcNow)
            {
                throw new AppException("Slot start time must be in the future.", StatusCodes.Status400BadRequest);
            }

            if (_createSlotState.Request.SlotEndUtc <= _createSlotState.Request.SlotStartUtc)
            {
                throw new AppException("Slot end time must be after start time.", StatusCodes.Status400BadRequest);
            }

            bool clinicExists = await _appointmentRepository.DoesClinicExistAsync(_createSlotState.Request.ClinicId);
            if (!clinicExists)
            {
                throw new AppException("Clinic not found.", StatusCodes.Status404NotFound);
            }
        }

        /// <inheritdoc/>
        public async Task<AppointmentSlotResponse> CreateSlotSaveAsync()
        {
            if (_createSlotState == null)
            {
                throw new AppException("Invalid slot creation workflow state.", StatusCodes.Status400BadRequest);
            }

            int slotId = await _appointmentRepository.CreateAppointmentSlotAsync(_createSlotState.Slot);
            _createSlotState.Slot.L07F01 = slotId;

            TBL07? createdSlot = await _appointmentRepository.FindSlotByIdAsync(slotId);
            if (createdSlot == null)
            {
                throw new AppException("Failed to retrieve created slot.", StatusCodes.Status500InternalServerError);
            }

            AppointmentSlotResponse response = _reflectionMapper.Map<TBL07, AppointmentSlotResponse>(createdSlot);
            if (createdSlot.L07F09 != null)
            {
                response.ClinicName = createdSlot.L07F09.L05F02;
                response.ClinicAddress = createdSlot.L07F09.L05F03;
                response.ClinicCity = createdSlot.L07F09.L05F04;
            }

            _createSlotState = null;
            return response;
        }

        /// <inheritdoc/>
        public async Task<List<AppointmentSlotResponse>> GetDoctorSlotsAsync(int doctorUserId, int? clinicId = null, bool includeBooked = true)
        {
            bool doctorExists = await _appointmentRepository.DoesDoctorExistAsync(doctorUserId);
            if (!doctorExists)
            {
                throw new AppException("Doctor profile not found.", StatusCodes.Status404NotFound);
            }

            List<TBL07> slots = await _appointmentRepository.GetDoctorSlotsAsync(doctorUserId, clinicId, includeBooked);
            List<AppointmentSlotResponse> responses = new List<AppointmentSlotResponse>();

            foreach (TBL07 slot in slots)
            {
                AppointmentSlotResponse response = _reflectionMapper.Map<TBL07, AppointmentSlotResponse>(slot);
                if (slot.L07F09 != null)
                {
                    response.ClinicName = slot.L07F09.L05F02;
                    response.ClinicAddress = slot.L07F09.L05F03;
                    response.ClinicCity = slot.L07F09.L05F04;
                }
                responses.Add(response);
            }

            return responses;
        }

        /// <inheritdoc/>
        public async Task<List<AppointmentSlotResponse>> GetAvailableSlotsForDoctorAsync(int doctorUserId, int? clinicId = null)
        {
            bool doctorExists = await _appointmentRepository.DoesDoctorExistAsync(doctorUserId);
            if (!doctorExists)
            {
                throw new AppException("Doctor profile not found.", StatusCodes.Status404NotFound);
            }

            List<TBL07> slots = await _appointmentRepository.GetAvailableSlotsByDoctorAsync(doctorUserId, clinicId);
            List<AppointmentSlotResponse> responses = new List<AppointmentSlotResponse>();

            foreach (TBL07 slot in slots)
            {
                AppointmentSlotResponse response = _reflectionMapper.Map<TBL07, AppointmentSlotResponse>(slot);
                if (slot.L07F09 != null)
                {
                    response.ClinicName = slot.L07F09.L05F02;
                    response.ClinicAddress = slot.L07F09.L05F03;
                    response.ClinicCity = slot.L07F09.L05F04;
                }
                responses.Add(response);
            }

            return responses;
        }

        /// <inheritdoc/>
        public async Task DeleteSlotAsync(int doctorUserId, int slotId)
        {
            bool doctorExists = await _appointmentRepository.DoesDoctorExistAsync(doctorUserId);
            if (!doctorExists)
            {
                throw new AppException("Doctor profile not found.", StatusCodes.Status404NotFound);
            }

            TBL07? slot = await _appointmentRepository.FindSlotByIdAsync(slotId);
            if (slot == null)
            {
                throw new AppException("Appointment slot not found.", StatusCodes.Status404NotFound);
            }

            if (slot.L07F02 != doctorUserId)
            {
                throw new AppException("You are not authorized to delete this slot.", StatusCodes.Status403Forbidden);
            }

            if (slot.L07F06)
            {
                throw new AppException("Cannot delete a booked slot.", StatusCodes.Status400BadRequest);
            }

            await _appointmentRepository.DeleteSlotAsync(slot);
        }

        #endregion

        #region Private Methods

        /// <summary>
        /// Validates doctor identity and ownership for a target appointment.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <param name="appointmentId">The appointment identifier.</param>
        /// <returns>A tuple containing appointment entity or validation error.</returns>
        private async Task<TBL04> ValidateDoctorAndGetOwnedAppointmentAsync(int doctorUserId, int appointmentId)
        {
            bool doctorExists = await _appointmentRepository.DoesDoctorExistAsync(doctorUserId);
            if (!doctorExists)
            {
                throw new AppException("Doctor profile not found.", StatusCodes.Status400BadRequest);
            }

            TBL04? appointment = await _appointmentRepository.FindAppointmentByIdAsync(appointmentId);
            if (appointment == null)
            {
                throw new AppException("Appointment not found.", StatusCodes.Status404NotFound);
            }

            if (appointment.L04F03 != doctorUserId)
            {
                throw new AppException("You are not authorized to modify this appointment.", StatusCodes.Status403Forbidden);
            }

            return appointment;
        }

        #endregion
    }
}
