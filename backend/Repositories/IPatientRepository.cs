using backend.Models;

namespace backend.Repositories
{
    /// <summary>
    /// Defines data access operations for patient profile management.
    /// </summary>
    public interface IPatientRepository
    {
        #region Public Methods

        /// <summary>
        /// Finds patient profile with user navigation by user identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>The patient entity with user data when found; otherwise null.</returns>
        Task<TBL02?> GetPatientByUserIdAsync(int userId);

        /// <summary>
        /// Updates patient profile record.
        /// </summary>
        /// <param name="patient">The patient entity to update.</param>
        Task UpdatePatientAsync(TBL02 patient);

        /// <summary>
        /// Checks if a patient exists by user identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>True if patient exists; otherwise false.</returns>
        Task<bool> DoesPatientExistAsync(int userId);

        #endregion
    }
}
