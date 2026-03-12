using backend.Mapping;

namespace backend.DTOs
{
    /// <summary>
    /// Represents clinic response data with doctor association details.
    /// </summary>
    public class ClinicResponse
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets clinic identifier.
        /// </summary>
        [MapProperty("L05F01")]
        public int ClinicId { get; set; }

        /// <summary>
        /// Gets or sets clinic name.
        /// </summary>
        [MapProperty("L05F02")]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets clinic address line.
        /// </summary>
        [MapProperty("L05F03")]
        public string AddressLine { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets clinic city name.
        /// </summary>
        [MapProperty("L05F04")]
        public string City { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets clinic state name.
        /// </summary>
        [MapProperty("L05F05")]
        public string State { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets clinic postal pincode.
        /// </summary>
        [MapProperty("L05F06")]
        public string Pincode { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets clinic geographic latitude coordinate.
        /// </summary>
        [MapProperty("L05F07")]
        public decimal Latitude { get; set; }

        /// <summary>
        /// Gets or sets clinic geographic longitude coordinate.
        /// </summary>
        [MapProperty("L05F08")]
        public decimal Longitude { get; set; }

        /// <summary>
        /// Gets or sets clinic contact phone number.
        /// </summary>
        [MapProperty("L05F09")]
        public string? Phone { get; set; }

        /// <summary>
        /// Gets or sets doctor-clinic association identifier.
        /// </summary>
        [MapProperty("L06F01")]
        public int DoctorClinicId { get; set; }

        /// <summary>
        /// Gets or sets consultation fee for this doctor at this clinic.
        /// </summary>
        [MapProperty("L06F04")]
        public decimal? ConsultationFee { get; set; }

        /// <summary>
        /// Gets or sets association creation date.
        /// </summary>
        [MapProperty("L06F05")]
        public DateTime AssociatedAt { get; set; }

        #endregion
    }
}
