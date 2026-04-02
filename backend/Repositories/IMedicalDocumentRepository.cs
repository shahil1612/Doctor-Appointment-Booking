using backend.Models;

namespace backend.Repositories
{
    /// <summary>
    /// Defines data access operations for medical documents.
    /// </summary>
    public interface IMedicalDocumentRepository
    {
        /// <summary>
        /// Creates a new medical document record.
        /// </summary>
        /// <param name="document">The document entity to create.</param>
        /// <returns>The created document identifier.</returns>
        Task<int> CreateDocumentAsync(TBL09 document);

        /// <summary>
        /// Retrieves all documents for a specific patient.
        /// </summary>
        /// <param name="patientUserId">The patient user identifier.</param>
        /// <returns>A list of medical documents.</returns>
        Task<List<TBL09>> GetPatientDocumentsAsync(int patientUserId);

        /// <summary>
        /// Retrieves a document by identifier.
        /// </summary>
        /// <param name="documentId">The document identifier.</param>
        /// <returns>The document entity or null.</returns>
        Task<TBL09?> FindDocumentByIdAsync(int documentId);

        /// <summary>
        /// Deletes a document record.
        /// </summary>
        /// <param name="document">The document entity to delete.</param>
        Task DeleteDocumentAsync(TBL09 document);

        /// <summary>
        /// Checks if a user exists by identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>The user entity or null.</returns>
        Task<TBL01?> FindUserByIdAsync(int userId);
    }
}
