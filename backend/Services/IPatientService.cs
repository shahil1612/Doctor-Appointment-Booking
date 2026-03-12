using backend.DTOs;

namespace backend.Services
{
    /// <summary>
    /// Defines business operations for patient profile management workflows.
    /// </summary>
    public interface IPatientService
    {
        #region Public Methods

        /// <summary>
        /// Retrieves patient profile with complete details.
        /// </summary>
        /// <param name="patientUserId">The patient user identifier.</param>
        /// <returns>The patient profile response.</returns>
        Task<PatientProfileResponse> GetPatientProfileAsync(int patientUserId);

        /// <summary>
        /// Prepares patient profile update workflow by mapping request DTO to entity.
        /// </summary>
        /// <param name="patientUserId">The patient user identifier.</param>
        /// <param name="request">The profile update request payload.</param>
        Task UpdateProfilePresaveAsync(int patientUserId, UpdatePatientProfileRequest request);

        /// <summary>
        /// Validates prepared profile update workflow state and business rules.
        /// </summary>
        Task UpdateProfileValidateAsync();

        /// <summary>
        /// Persists validated profile update workflow state.
        /// </summary>
        /// <returns>The updated patient profile response.</returns>
        Task<PatientProfileResponse> UpdateProfileSaveAsync();

        #endregion
    }
}
