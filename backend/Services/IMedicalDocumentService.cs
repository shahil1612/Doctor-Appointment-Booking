using backend.DTOs;

namespace backend.Services
{
    /// <summary>
    /// Defines business operations for medical documents.
    /// </summary>
    public interface IMedicalDocumentService
    {
        /// <summary>
        /// Uploads a new medical document for a patient.
        /// </summary>
        /// <param name="patientUserId">The patient user identifier.</param>
        /// <param name="request">The upload request payload.</param>
        /// <returns>The created document response.</returns>
        Task<MedicalDocumentResponse> UploadDocumentAsync(int patientUserId, UploadMedicalDocumentRequest request);

        /// <summary>
        /// Retrieves all documents for a patient.
        /// </summary>
        /// <param name="patientUserId">The patient user identifier.</param>
        /// <returns>A list of medical documents.</returns>
        Task<List<MedicalDocumentResponse>> GetPatientDocumentsAsync(int patientUserId);

        /// <summary>
        /// Downloads a document file.
        /// </summary>
        /// <param name="documentId">The document identifier.</param>
        /// <param name="requestingUserId">The user requesting the download.</param>
        /// <param name="requestingUserType">The type of user requesting.</param>
        /// <returns>A tuple containing file stream, content type, and file name.</returns>
        Task<(Stream FileStream, string ContentType, string FileName)> DownloadDocumentAsync(
            int documentId,
            int requestingUserId,
            Models.UserType requestingUserType);

        /// <summary>
        /// Deletes a medical document.
        /// </summary>
        /// <param name="documentId">The document identifier.</param>
        /// <param name="patientUserId">The patient user identifier.</param>
        Task DeleteDocumentAsync(int documentId, int patientUserId);
    }
}
