using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    /// <summary>
    /// Provides persistence operations for patient profiles.
    /// </summary>
    public class PatientRepository : IPatientRepository
    {
        #region Private Fields

        /// <summary>
        /// Represents the database context instance.
        /// </summary>
        private readonly ApplicationDbContext _context;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="PatientRepository"/> class.
        /// </summary>
        /// <param name="context">The application database context.</param>
        public PatientRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        #endregion

        #region Public Methods

        /// <inheritdoc/>
        public async Task<TBL02?> GetPatientByUserIdAsync(int userId)
        {
            return await _context.Patients
                .Include(p => p.L02F06)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.L02F02 == userId);
        }

        /// <inheritdoc/>
        public async Task UpdatePatientAsync(TBL02 patient)
        {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
        }

        /// <inheritdoc/>
        public async Task<bool> DoesPatientExistAsync(int userId)
        {
            return await _context.Patients
                .AnyAsync(p => p.L02F02 == userId);
        }

        #endregion
    }
}
