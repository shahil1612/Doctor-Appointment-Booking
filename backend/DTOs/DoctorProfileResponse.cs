using backend.Mapping;

namespace backend.DTOs
{
    /// <summary>
    /// Represents doctor profile response data.
    /// </summary>
    public class DoctorProfileResponse
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets doctor identifier.
        /// </summary>
        [MapProperty("L03F01")]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets related user identifier.
        /// </summary>
        [MapProperty("L03F02")]
        public int UserId { get; set; }

        /// <summary>
        /// Gets or sets full name.
        /// </summary>
        [MapProperty("L01F03")]
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets email address.
        /// </summary>
        [MapProperty("L01F04")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets phone number.
        /// </summary>
        [MapProperty("L01F05")]
        public string Phone { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets date of birth.
        /// </summary>
        [MapProperty("L01F06")]
        public DateTime Dob { get; set; }

        /// <summary>
        /// Gets or sets doctor specialization.
        /// </summary>
        [MapProperty("L03F03")]
        public string? Specialization { get; set; }

        /// <summary>
        /// Gets or sets doctor license number.
        /// </summary>
        [MapProperty("L03F04")]
        public string? LicenseNumber { get; set; }

        /// <summary>
        /// Gets or sets doctor years of experience.
        /// </summary>
        [MapProperty("L03F05")]
        public int? YearsExperience { get; set; }

        /// <summary>
        /// Gets or sets doctor bio/description.
        /// </summary>
        [MapProperty("L03F08")]
        public string? Bio { get; set; }

        /// <summary>
        /// Gets or sets doctor default consultation fee.
        /// </summary>
        [MapProperty("L03F10")]
        public decimal ConsultationFee { get; set; }

        /// <summary>
        /// Gets or sets doctor average rating.
        /// </summary>
        [MapProperty("L03F11")]
        public decimal RatingAvg { get; set; }

        /// <summary>
        /// Gets or sets total number of reviews.
        /// </summary>
        [MapProperty("L03F12")]
        public int TotalReviews { get; set; }

        #endregion
    }
}
