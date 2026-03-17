namespace backend.Repositories
{
    /// <summary>
    /// Defines the contract for prescription repository operations.
    /// </summary>
    public interface IPrescriptionRepository
    {
        /// <summary>
        /// Finds a prescription by its identifier.
        /// </summary>
        /// <param name="prescriptionId">The prescription identifier.</param>
        /// <returns>The prescription if found; otherwise null.</returns>
        Task<Models.TBL08?> FindPrescriptionByIdAsync(int prescriptionId);

        /// <summary>
        /// Retrieves all prescriptions for a patient.
        /// </summary>
        /// <param name="patientUserId">The patient user identifier.</param>
        /// <returns>List of patient prescriptions ordered by issued date descending.</returns>
        Task<List<Models.TBL08>> GetPatientPrescriptionsAsync(int patientUserId);

        /// <summary>
        /// Retrieves all prescriptions issued by a doctor.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <returns>List of prescriptions issued by the doctor ordered by issued date descending.</returns>
        Task<List<Models.TBL08>> GetDoctorIssuedPrescriptionsAsync(int doctorUserId);

        /// <summary>
        /// Retrieves all prescriptions for a specific appointment.
        /// </summary>
        /// <param name="appointmentId">The appointment identifier.</param>
        /// <returns>List of prescriptions for the appointment.</returns>
        Task<List<Models.TBL08>> GetAppointmentPrescriptionsAsync(int appointmentId);

        /// <summary>
        /// Creates a new prescription.
        /// </summary>
        /// <param name="prescription">The prescription to create.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        Task CreatePrescriptionAsync(Models.TBL08 prescription);

        /// <summary>
        /// Updates an existing prescription.
        /// </summary>
        /// <param name="prescription">The prescription to update.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        Task UpdatePrescriptionAsync(Models.TBL08 prescription);

        /// <summary>
        /// Deletes a prescription by its identifier.
        /// </summary>
        /// <param name="prescriptionId">The prescription identifier.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        Task DeletePrescriptionAsync(int prescriptionId);
    }
}
