using backend.Models;

namespace backend.Repositories
{
    /// <summary>
    /// Defines data access operations for doctor profile and clinic management.
    /// </summary>
    public interface IDoctorRepository
    {
        #region Public Methods

        /// <summary>
        /// Finds doctor profile with user navigation by user identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>The doctor entity with user data when found; otherwise null.</returns>
        Task<TBL03?> GetDoctorByUserIdAsync(int userId);

        /// <summary>
        /// Updates doctor profile record.
        /// </summary>
        /// <param name="doctor">The doctor entity to update.</param>
        Task UpdateDoctorAsync(TBL03 doctor);

        /// <summary>
        /// Gets all clinics associated with a doctor.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <returns>List of doctor-clinic associations with clinic data.</returns>
        Task<List<TBL06>> GetDoctorClinicsAsync(int doctorUserId);

        /// <summary>
        /// Creates a new clinic record and returns its identifier.
        /// </summary>
        /// <param name="clinic">The clinic entity to create.</param>
        /// <returns>The created clinic identifier.</returns>
        Task<int> CreateClinicAsync(TBL05 clinic);

        /// <summary>
        /// Creates a doctor-clinic association record.
        /// </summary>
        /// <param name="doctorClinic">The doctor-clinic association entity to create.</param>
        /// <returns>The created doctor-clinic association identifier.</returns>
        Task<int> CreateDoctorClinicAssociationAsync(TBL06 doctorClinic);

        /// <summary>
        /// Checks if a clinic with the same name, address and city already exists.
        /// </summary>
        /// <param name="name">The clinic name.</param>
        /// <param name="addressLine">The clinic address line.</param>
        /// <param name="city">The clinic city.</param>
        /// <returns>True if clinic exists; otherwise false.</returns>
        Task<bool> DoesClinicExistAsync(string name, string addressLine, string city);

        /// <summary>
        /// Checks if a doctor exists by user identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>True if doctor exists; otherwise false.</returns>
        Task<bool> DoesDoctorExistAsync(int userId);

        #endregion
    }
}
