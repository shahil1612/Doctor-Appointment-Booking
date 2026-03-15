using backend.Mapping;

namespace backend.DTOs
{
    /// <summary>
    /// Represents available doctor details for appointment booking.
    /// </summary>
    public class AvailableDoctorResponse
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets doctor user identifier.
        /// </summary>
        [MapProperty("L01F01")]
        public int DoctorUserId { get; set; }

        /// <summary>
        /// Gets or sets doctor full name.
        /// </summary>
        [MapProperty("L01F03")]
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets doctor email address.
        /// </summary>
        [MapProperty("L01F04")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets doctor phone number.
        /// </summary>
        [MapProperty("L01F05")]
        public string Phone { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets doctor specialization.
        /// </summary>
        [MapProperty("L03F03")]
        public string? Specialization { get; set; }

        /// <summary>
        /// Gets or sets doctor years of experience.
        /// </summary>
        [MapProperty("L03F05")]
        public int? YearsExperience { get; set; }

        /// <summary>
        /// Gets or sets doctor bio.
        /// </summary>
        [MapProperty("L03F08")]
        public string? Bio { get; set; }

        /// <summary>
        /// Gets or sets doctor average rating.
        /// </summary>
        [MapProperty("L03F11")]
        public decimal Rating { get; set; }

        /// <summary>
        /// Gets or sets clinics where doctor practices.
        /// </summary>
        public List<DoctorClinicResponse> Clinics { get; set; } = new List<DoctorClinicResponse>();

        #endregion
    }
}
