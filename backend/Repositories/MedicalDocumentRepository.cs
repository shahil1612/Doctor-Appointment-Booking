using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    /// <summary>
    /// Provides data access operations for medical documents.
    /// </summary>
    public class MedicalDocumentRepository : IMedicalDocumentRepository
    {
        #region Private Fields

        /// <summary>
        /// Represents database context dependency.
        /// </summary>
        private readonly ApplicationDbContext _context;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="MedicalDocumentRepository"/> class.
        /// </summary>
        /// <param name="context">The database context.</param>
        public MedicalDocumentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        #endregion

        #region Public Methods

        /// <inheritdoc/>
        public async Task<int> CreateDocumentAsync(TBL09 document)
        {
            _context.MedicalDocuments.Add(document);
            await _context.SaveChangesAsync();
            return document.L09F01;
        }

        /// <inheritdoc/>
        public async Task<List<TBL09>> GetPatientDocumentsAsync(int patientUserId)
        {
            return await _context.MedicalDocuments
                .Where(d => d.L09F02 == patientUserId)
                .OrderByDescending(d => d.L09F09)
                .ToListAsync();
        }

        /// <inheritdoc/>
        public async Task<TBL09?> FindDocumentByIdAsync(int documentId)
        {
            return await _context.MedicalDocuments
                .FirstOrDefaultAsync(d => d.L09F01 == documentId);
        }

        /// <inheritdoc/>
        public async Task DeleteDocumentAsync(TBL09 document)
        {
            _context.MedicalDocuments.Remove(document);
            await _context.SaveChangesAsync();
        }

        /// <inheritdoc/>
        public async Task<TBL01?> FindUserByIdAsync(int userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        #endregion
    }
}
