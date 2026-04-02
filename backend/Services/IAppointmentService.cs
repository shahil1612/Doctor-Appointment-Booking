using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    /// <summary>
    /// Defines business operations for appointment workflows.
    /// </summary>
    public interface IAppointmentService
    {
        #region Public Methods

        /// <summary>
        /// Retrieves available doctors for patient booking.
        /// </summary>
        /// <param name="patientUserId">The patient user identifier.</param>
        /// <returns>A list of available doctors.</returns>
        Task<List<AvailableDoctorResponse>> GetAvailableDoctorsAsync(int patientUserId);

        /// <summary>
        /// Prepares appointment creation workflow by mapping request DTO to entity.
        /// </summary>
        /// <param name="patientUserId">The patient user identifier.</param>
        /// <param name="request">The booking request payload.</param>
        /// <returns>The mapped appointment entity.</returns>
        Task<Models.TBL04> CreateAppointmentPresaveAsync(int patientUserId, CreateAppointmentRequest request);

        /// <summary>
        /// Validates prepared appointment workflow state and business rules.
        /// </summary>
        Task CreateAppointmentValidateAsync();

        /// <summary>
        /// Persists validated appointment creation workflow state.
        /// </summary>
        /// <returns>The created appointment response.</returns>
        Task<AppointmentResponse> CreateAppointmentSaveAsync();

        /// <summary>
        /// Retrieves pending appointments for both doctor and patient.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="userType">The type of user (DOCTOR or PATIENT).</param>
        /// <returns>A list of pending appointments.</returns>
        Task<List<AppointmentResponse>> GetPendingAppointmentsByUserAsync(int userId, UserType userType);

        /// <summary>
        /// Retrieves appointments by status for both doctor and patient.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="userType">The type of user (DOCTOR or PATIENT).</param>
        /// <param name="status">The appointment status to filter by.</param>
        /// <returns>A list of appointments with the specified status.</returns>
        Task<List<AppointmentResponse>> GetAppointmentsByStatusAsync(int userId, UserType userType, AppointmentStatus status);

        /// <summary>
        /// Prepares decide appointment workflow state.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <param name="appointmentId">The appointment identifier.</param>
        /// <param name="request">The decision request payload.</param>
        Task DecideAppointmentPresaveAsync(int doctorUserId, int appointmentId, AppointmentDecisionRequest request);

        /// <summary>
        /// Validates decide appointment workflow state and business rules.
        /// </summary>
        Task DecideAppointmentValidateAsync();

        /// <summary>
        /// Persists decide appointment workflow state.
        /// </summary>
        Task DecideAppointmentSaveAsync();

        /// <summary>
        /// Prepares cancel future appointment workflow state.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <param name="appointmentId">The appointment identifier.</param>
        /// <param name="request">The cancellation request payload.</param>
        Task CancelFutureAppointmentPresaveAsync(int doctorUserId, int appointmentId, CancelAppointmentRequest request);

        /// <summary>
        /// Validates cancel future appointment workflow state and business rules.
        /// </summary>
        Task CancelFutureAppointmentValidateAsync();

        /// <summary>
        /// Persists cancel future appointment workflow state.
        /// </summary>
        Task CancelFutureAppointmentSaveAsync();

        /// <summary>
        /// Prepares appointment slot creation workflow by mapping request DTO to entity.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <param name="request">The slot creation request payload.</param>
        Task CreateSlotPresaveAsync(int doctorUserId, CreateAppointmentSlotRequest request);

        /// <summary>
        /// Validates prepared slot creation workflow state and business rules.
        /// </summary>
        Task CreateSlotValidateAsync();

        /// <summary>
        /// Persists validated slot creation workflow state.
        /// </summary>
        /// <returns>The created slot response.</returns>
        Task<AppointmentSlotResponse> CreateSlotSaveAsync();

        /// <summary>
        /// Retrieves all appointment slots for a doctor.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <param name="clinicId">Optional clinic identifier to filter slots.</param>
        /// <param name="includeBooked">Whether to include booked slots.</param>
        /// <returns>A list of appointment slots.</returns>
        Task<List<AppointmentSlotResponse>> GetDoctorSlotsAsync(int doctorUserId, int? clinicId = null, bool includeBooked = true);

        /// <summary>
        /// Retrieves available appointment slots for a specific doctor.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <param name="clinicId">Optional clinic identifier to filter slots.</param>
        /// <returns>A list of available slots.</returns>
        Task<List<AppointmentSlotResponse>> GetAvailableSlotsForDoctorAsync(int doctorUserId, int? clinicId = null);

        /// <summary>
        /// Deletes an appointment slot if it is not booked.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <param name="slotId">The slot identifier.</param>
        Task DeleteSlotAsync(int doctorUserId, int slotId);

        /// <summary>
        /// Prepares complete appointment workflow state.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <param name="appointmentId">The appointment identifier.</param>
        /// <param name="request">The completion request payload.</param>
        Task CompleteAppointmentPresaveAsync(int doctorUserId, int appointmentId, CancelAppointmentRequest request);

        /// <summary>
        /// Validates complete appointment workflow state and business rules.
        /// </summary>
        Task CompleteAppointmentValidateAsync();

        /// <summary>
        /// Persists complete appointment workflow state.
        /// </summary>
        Task CompleteAppointmentSaveAsync();

        #endregion
    }
}
