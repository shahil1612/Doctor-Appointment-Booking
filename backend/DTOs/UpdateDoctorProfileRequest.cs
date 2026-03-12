using System.ComponentModel.DataAnnotations;
using backend.Mapping;

namespace backend.DTOs
{
    /// <summary>
    /// Represents doctor profile update request payload.
    /// </summary>
    public class UpdateDoctorProfileRequest
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets doctor specialization.
        /// </summary>
        [MaxLength(100, ErrorMessage = "Specialization cannot exceed 100 characters.")]
        [MapProperty("L03F03")]
        public string? Specialization { get; set; }

        /// <summary>
        /// Gets or sets doctor license number.
        /// </summary>
        [MaxLength(50, ErrorMessage = "License number cannot exceed 50 characters.")]
        [MapProperty("L03F04")]
        public string? LicenseNumber { get; set; }

        /// <summary>
        /// Gets or sets doctor years of experience.
        /// </summary>
        [Range(0, 60, ErrorMessage = "Years of experience must be between 0 and 60.")]
        [MapProperty("L03F05")]
        public int? YearsExperience { get; set; }

        /// <summary>
        /// Gets or sets doctor bio/description.
        /// </summary>
        [MaxLength(1000, ErrorMessage = "Bio cannot exceed 1000 characters.")]
        [MapProperty("L03F08")]
        public string? Bio { get; set; }

        /// <summary>
        /// Gets or sets doctor default consultation fee.
        /// </summary>
        [Range(0, 100000, ErrorMessage = "Consultation fee must be between 0 and 100000.")]
        [MapProperty("L03F10")]
        public decimal? ConsultationFee { get; set; }

        #endregion
    }
}
