using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    /// <summary>
    /// Provides persistence operations for doctor profiles and clinic management.
    /// </summary>
    public class DoctorRepository : IDoctorRepository
    {
        #region Private Fields

        /// <summary>
        /// Represents the database context instance.
        /// </summary>
        private readonly ApplicationDbContext _context;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="DoctorRepository"/> class.
        /// </summary>
        /// <param name="context">The application database context.</param>
        public DoctorRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        #endregion

        #region Public Methods

        /// <inheritdoc/>
        public async Task<TBL03?> GetDoctorByUserIdAsync(int userId)
        {
            return await _context.Doctors
                .Include(d => d.L03F07)
                .AsNoTracking()
                .FirstOrDefaultAsync(d => d.L03F02 == userId);
        }

        /// <inheritdoc/>
        public async Task UpdateDoctorAsync(TBL03 doctor)
        {
            _context.Doctors.Update(doctor);
            await _context.SaveChangesAsync();
        }

        /// <inheritdoc/>
        public async Task<List<TBL06>> GetDoctorClinicsAsync(int doctorUserId)
        {
            return await _context.DoctorClinics
                .Include(dc => dc.L06F07)
                .AsNoTracking()
                .Where(dc => dc.L06F02 == doctorUserId)
                .OrderByDescending(dc => dc.L06F05)
                .ToListAsync();
        }

        /// <inheritdoc/>
        public async Task<int> CreateClinicAsync(TBL05 clinic)
        {
            _context.Clinics.Add(clinic);
            await _context.SaveChangesAsync();
            return clinic.L05F01;
        }

        /// <inheritdoc/>
        public async Task<int> CreateDoctorClinicAssociationAsync(TBL06 doctorClinic)
        {
            _context.DoctorClinics.Add(doctorClinic);
            await _context.SaveChangesAsync();
            return doctorClinic.L06F01;
        }

        /// <inheritdoc/>
        public async Task<bool> DoesClinicExistAsync(string name, string addressLine, string city)
        {
            return await _context.Clinics
                .AnyAsync(c => c.L05F02.ToLower() == name.ToLower() 
                    && c.L05F03.ToLower() == addressLine.ToLower() 
                    && c.L05F04.ToLower() == city.ToLower());
        }

        /// <inheritdoc/>
        public async Task<bool> DoesDoctorExistAsync(int userId)
        {
            return await _context.Doctors
                .AnyAsync(d => d.L03F02 == userId);
        }

        #endregion
    }
}
