using backend.DTOs;
using backend.Exceptions;
using backend.Mapping;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    /// <summary>
    /// Provides business logic for doctor profile and clinic management operations.
    /// </summary>
    public class DoctorService : IDoctorService
    {
        #region Private Fields

        /// <summary>
        /// Represents doctor repository dependency.
        /// </summary>
        private readonly IDoctorRepository _doctorRepository;

        /// <summary>
        /// Represents reflection mapper dependency.
        /// </summary>
        private readonly IReflectionMapper _reflectionMapper;

        /// <summary>
        /// Represents in-memory workflow state for doctor profile update.
        /// </summary>
        private UpdateDoctorProfileWorkflowState? _updateProfileState;

        /// <summary>
        /// Represents in-memory workflow state for clinic creation.
        /// </summary>
        private CreateClinicWorkflowState? _createClinicState;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="DoctorService"/> class.
        /// </summary>
        /// <param name="doctorRepository">The doctor repository.</param>
        /// <param name="reflectionMapper">The reflection mapper.</param>
        public DoctorService(IDoctorRepository doctorRepository, IReflectionMapper reflectionMapper)
        {
            _doctorRepository = doctorRepository;
            _reflectionMapper = reflectionMapper;
        }

        #endregion

        #region Public Methods

        /// <inheritdoc/>
        public async Task<DoctorProfileResponse> GetDoctorProfileAsync(int doctorUserId)
        {
            TBL03? doctor = await _doctorRepository.GetDoctorByUserIdAsync(doctorUserId);
            if (doctor == null)
            {
                throw new AppException("Doctor profile not found.", StatusCodes.Status404NotFound);
            }

            DoctorProfileResponse response = _reflectionMapper.Map<TBL01, DoctorProfileResponse>(doctor.L03F07);
            _reflectionMapper.MapToExisting<TBL03, DoctorProfileResponse>(doctor, response);
            return response;
        }

        /// <inheritdoc/>
        public async Task UpdateProfilePresaveAsync(int doctorUserId, UpdateDoctorProfileRequest request)
        {
            TBL03? doctor = await _doctorRepository.GetDoctorByUserIdAsync(doctorUserId);
            if (doctor == null)
            {
                throw new AppException("Doctor profile not found.", StatusCodes.Status404NotFound);
            }

            _updateProfileState = new UpdateDoctorProfileWorkflowState
            {
                DoctorUserId = doctorUserId,
                Request = request,
                Doctor = doctor
            };
        }

        /// <inheritdoc/>
        public Task UpdateProfileValidateAsync()
        {
            if (_updateProfileState == null)
            {
                throw new AppException("Invalid profile update workflow state.", StatusCodes.Status400BadRequest);
            }

            UpdateDoctorProfileRequest request = _updateProfileState.Request;

            if (request.YearsExperience.HasValue && (request.YearsExperience.Value < 0 || request.YearsExperience.Value > 60))
            {
                throw new AppException("Years of experience must be between 0 and 60.", StatusCodes.Status400BadRequest);
            }

            if (request.ConsultationFee.HasValue && request.ConsultationFee.Value < 0)
            {
                throw new AppException("Consultation fee cannot be negative.", StatusCodes.Status400BadRequest);
            }

            return Task.CompletedTask;
        }

        /// <inheritdoc/>
        public async Task<DoctorProfileResponse> UpdateProfileSaveAsync()
        {
            if (_updateProfileState == null || _updateProfileState.Doctor == null)
            {
                throw new AppException("Invalid profile update workflow state.", StatusCodes.Status400BadRequest);
            }

            _reflectionMapper.MapToExisting(_updateProfileState.Request, _updateProfileState.Doctor);
            await _doctorRepository.UpdateDoctorAsync(_updateProfileState.Doctor);

            TBL03? updatedDoctor = await _doctorRepository.GetDoctorByUserIdAsync(_updateProfileState.DoctorUserId);
            if (updatedDoctor == null)
            {
                throw new AppException("Failed to retrieve updated doctor profile.", StatusCodes.Status500InternalServerError);
            }

            DoctorProfileResponse response = _reflectionMapper.Map<TBL01, DoctorProfileResponse>(updatedDoctor.L03F07);
            _reflectionMapper.MapToExisting<TBL03, DoctorProfileResponse>(updatedDoctor, response);
            return response;
        }

        /// <inheritdoc/>
        public async Task CreateClinicPresaveAsync(int doctorUserId, CreateClinicRequest request)
        {
            bool doctorExists = await _doctorRepository.DoesDoctorExistAsync(doctorUserId);
            if (!doctorExists)
            {
                throw new AppException("Doctor profile not found.", StatusCodes.Status404NotFound);
            }

            TBL05 clinic = _reflectionMapper.Map<CreateClinicRequest, TBL05>(request);
            clinic.L05F10 = DateTime.UtcNow;

            TBL06 doctorClinic = new TBL06
            {
                L06F02 = doctorUserId,
                L06F05 = DateTime.UtcNow
            };
            _reflectionMapper.MapToExisting<CreateClinicRequest, TBL06>(request, doctorClinic);

            _createClinicState = new CreateClinicWorkflowState
            {
                DoctorUserId = doctorUserId,
                Request = request,
                Clinic = clinic,
                DoctorClinic = doctorClinic
            };
        }

        /// <inheritdoc/>
        public async Task CreateClinicValidateAsync()
        {
            if (_createClinicState == null)
            {
                throw new AppException("Invalid clinic creation workflow state.", StatusCodes.Status400BadRequest);
            }

            if (_createClinicState.Request.ConsultationFee < 0)
            {
                throw new AppException("Consultation fee cannot be negative.", StatusCodes.Status400BadRequest);
            }

            bool clinicExists = await _doctorRepository.DoesClinicExistAsync(
                _createClinicState.Request.Name,
                _createClinicState.Request.AddressLine,
                _createClinicState.Request.City);

            if (clinicExists)
            {
                throw new AppException("A clinic with the same name and address already exists in this city.", StatusCodes.Status409Conflict);
            }
        }

        /// <inheritdoc/>
        public async Task<ClinicResponse> CreateClinicSaveAsync()
        {
            if (_createClinicState == null)
            {
                throw new AppException("Invalid clinic creation workflow state.", StatusCodes.Status400BadRequest);
            }

            int clinicId = await _doctorRepository.CreateClinicAsync(_createClinicState.Clinic);
            _createClinicState.DoctorClinic.L06F03 = clinicId;

            int doctorClinicId = await _doctorRepository.CreateDoctorClinicAssociationAsync(_createClinicState.DoctorClinic);

            ClinicResponse response = _reflectionMapper.Map<TBL05, ClinicResponse>(_createClinicState.Clinic);
            response.DoctorClinicId = doctorClinicId;
            response.ConsultationFee = _createClinicState.DoctorClinic.L06F04;
            response.AssociatedAt = _createClinicState.DoctorClinic.L06F05;

            return response;
        }

        /// <inheritdoc/>
        public async Task<List<ClinicResponse>> GetDoctorClinicsAsync(int doctorUserId)
        {
            bool doctorExists = await _doctorRepository.DoesDoctorExistAsync(doctorUserId);
            if (!doctorExists)
            {
                throw new AppException("Doctor profile not found.", StatusCodes.Status404NotFound);
            }

            List<TBL06> doctorClinics = await _doctorRepository.GetDoctorClinicsAsync(doctorUserId);
            List<ClinicResponse> responses = new List<ClinicResponse>();

            foreach (TBL06 dc in doctorClinics)
            {
                if (dc.L06F07 == null)
                {
                    continue;
                }

                ClinicResponse response = _reflectionMapper.Map<TBL05, ClinicResponse>(dc.L06F07);
                response.DoctorClinicId = dc.L06F01;
                response.ConsultationFee = dc.L06F04;
                response.AssociatedAt = dc.L06F05;
                responses.Add(response);
            }

            return responses;
        }

        #endregion
    }
}
