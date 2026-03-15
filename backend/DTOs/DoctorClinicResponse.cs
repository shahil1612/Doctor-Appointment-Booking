using backend.Mapping;

namespace backend.DTOs
{
    /// <summary>
    /// Represents clinic information for doctor's practice location.
    /// </summary>
    public class DoctorClinicResponse
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
        /// Gets or sets clinic city.
        /// </summary>
        [MapProperty("L05F04")]
        public string City { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets clinic address.
        /// </summary>
        [MapProperty("L05F03")]
        public string Address { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets clinic state.
        /// </summary>
        [MapProperty("L05F05")]
        public string State { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets doctor's consultation fee at this clinic.
        /// </summary>
        public decimal? ConsultationFee { get; set; }

        #endregion
    }
}
