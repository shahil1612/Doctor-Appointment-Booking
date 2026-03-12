using backend.DTOs;

namespace backend.Services
{
    /// <summary>
    /// Defines business operations for doctor profile and clinic management workflows.
    /// </summary>
    public interface IDoctorService
    {
        #region Public Methods

        /// <summary>
        /// Retrieves doctor profile with complete details.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <returns>The doctor profile response.</returns>
        Task<DoctorProfileResponse> GetDoctorProfileAsync(int doctorUserId);

        /// <summary>
        /// Prepares doctor profile update workflow by mapping request DTO to entity.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <param name="request">The profile update request payload.</param>
        Task UpdateProfilePresaveAsync(int doctorUserId, UpdateDoctorProfileRequest request);

        /// <summary>
        /// Validates prepared profile update workflow state and business rules.
        /// </summary>
        Task UpdateProfileValidateAsync();

        /// <summary>
        /// Persists validated profile update workflow state.
        /// </summary>
        /// <returns>The updated doctor profile response.</returns>
        Task<DoctorProfileResponse> UpdateProfileSaveAsync();

        /// <summary>
        /// Prepares clinic creation workflow by mapping request DTO to entities.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <param name="request">The clinic creation request payload.</param>
        Task CreateClinicPresaveAsync(int doctorUserId, CreateClinicRequest request);

        /// <summary>
        /// Validates prepared clinic creation workflow state and business rules.
        /// </summary>
        Task CreateClinicValidateAsync();

        /// <summary>
        /// Persists validated clinic creation workflow state.
        /// </summary>
        /// <returns>The created clinic response.</returns>
        Task<ClinicResponse> CreateClinicSaveAsync();

        /// <summary>
        /// Retrieves all clinics associated with a doctor.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <returns>List of clinic responses with association details.</returns>
        Task<List<ClinicResponse>> GetDoctorClinicsAsync(int doctorUserId);

        #endregion
    }
}
