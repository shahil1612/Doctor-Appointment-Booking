using backend.DTOs;

namespace backend.Services
{
    /// <summary>
    /// Defines the contract for prescription business logic operations.
    /// </summary>
    public interface IPrescriptionService
    {
        /// <summary>
        /// Creates a new prescription issued by a doctor for a patient appointment.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier issuing the prescription.</param>
        /// <param name="request">The prescription creation request.</param>
        /// <returns>The created prescription response.</returns>
        /// <exception cref="Exceptions.AppException">Thrown when doctor does not own the appointment.</exception>
        Task<PrescriptionResponse> CreatePrescriptionAsync(int doctorUserId, CreatePrescriptionRequest request);

        /// <summary>
        /// Retrieves all prescriptions for a patient.
        /// </summary>
        /// <param name="patientUserId">The patient user identifier.</param>
        /// <returns>List of patient's prescriptions.</returns>
        Task<List<PrescriptionResponse>> GetPatientPrescriptionsAsync(int patientUserId);

        /// <summary>
        /// Retrieves all prescriptions issued by a doctor.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier.</param>
        /// <returns>List of prescriptions issued by the doctor.</returns>
        Task<List<PrescriptionResponse>> GetDoctorIssuedPrescriptionsAsync(int doctorUserId);

        /// <summary>
        /// Retrieves a specific prescription by identifier.
        /// </summary>
        /// <param name="prescriptionId">The prescription identifier.</param>
        /// <returns>The prescription response if found; otherwise null.</returns>
        Task<PrescriptionResponse?> GetPrescriptionByIdAsync(int prescriptionId);

        /// <summary>
        /// Updates an existing prescription.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier attempting the update.</param>
        /// <param name="prescriptionId">The prescription identifier.</param>
        /// <param name="request">The prescription update request.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        /// <exception cref="Exceptions.AppException">Thrown when prescription not found or doctor is not the issuer.</exception>
        Task UpdatePrescriptionAsync(int doctorUserId, int prescriptionId, CreatePrescriptionRequest request);

        /// <summary>
        /// Deletes a prescription.
        /// </summary>
        /// <param name="doctorUserId">The doctor user identifier attempting the deletion.</param>
        /// <param name="prescriptionId">The prescription identifier.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        /// <exception cref="Exceptions.AppException">Thrown when prescription not found or doctor is not the issuer.</exception>
        Task DeletePrescriptionAsync(int doctorUserId, int prescriptionId);
    }
}
