using System.ComponentModel.DataAnnotations;
using backend.Mapping;

namespace backend.DTOs
{
    /// <summary>
    /// Represents clinic creation request payload.
    /// </summary>
    public class CreateClinicRequest
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets clinic name.
        /// </summary>
        [Required(ErrorMessage = "Clinic name is required.")]
        [MinLength(3, ErrorMessage = "Clinic name must be at least 3 characters.")]
        [MaxLength(100, ErrorMessage = "Clinic name cannot exceed 100 characters.")]
        [MapProperty("L05F02")]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets clinic address line.
        /// </summary>
        [Required(ErrorMessage = "Address line is required.")]
        [MinLength(5, ErrorMessage = "Address line must be at least 5 characters.")]
        [MaxLength(200, ErrorMessage = "Address line cannot exceed 200 characters.")]
        [MapProperty("L05F03")]
        public string AddressLine { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets clinic city name.
        /// </summary>
        [Required(ErrorMessage = "City is required.")]
        [MinLength(2, ErrorMessage = "City must be at least 2 characters.")]
        [MaxLength(50, ErrorMessage = "City cannot exceed 50 characters.")]
        [MapProperty("L05F04")]
        public string City { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets clinic state name.
        /// </summary>
        [Required(ErrorMessage = "State is required.")]
        [MinLength(2, ErrorMessage = "State must be at least 2 characters.")]
        [MaxLength(50, ErrorMessage = "State cannot exceed 50 characters.")]
        [MapProperty("L05F05")]
        public string State { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets clinic postal pincode.
        /// </summary>
        [Required(ErrorMessage = "Pincode is required.")]
        [RegularExpression(@"^[0-9]{6}$", ErrorMessage = "Pincode must be exactly 6 digits.")]
        [MapProperty("L05F06")]
        public string Pincode { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets consultation fee for this clinic.
        /// </summary>
        [Required(ErrorMessage = "Consultation fee is required.")]
        [Range(0, 100000, ErrorMessage = "Consultation fee must be between 0 and 100000.")]
        [MapProperty("L06F04")]
        public decimal ConsultationFee { get; set; }

        /// <summary>
        /// Gets or sets clinic geographic latitude coordinate (optional).
        /// Can be provided by frontend or calculated via geocoding service.
        /// </summary>
        [Range(-90, 90, ErrorMessage = "Latitude must be between -90 and 90.")]
        [MapProperty("L05F07")]
        public decimal? Latitude { get; set; }

        /// <summary>
        /// Gets or sets clinic geographic longitude coordinate (optional).
        /// Can be provided by frontend or calculated via geocoding service.
        /// </summary>
        [Range(-180, 180, ErrorMessage = "Longitude must be between -180 and 180.")]
        [MapProperty("L05F08")]
        public decimal? Longitude { get; set; }

        /// <summary>
        /// Gets or sets clinic contact phone number (optional).
        /// </summary>
        [RegularExpression(@"^$|^[0-9]{10}$", ErrorMessage = "Phone number must be exactly 10 digits.")]
        [MapProperty("L05F09")]
        public string? Phone { get; set; }

        #endregion
    }
}
