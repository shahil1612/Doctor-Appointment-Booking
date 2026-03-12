using backend.Mapping;

namespace backend.DTOs
{
    /// <summary>
    /// Represents appointment slot response data.
    /// </summary>
    public class AppointmentSlotResponse
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets slot identifier.
        /// </summary>
        [MapProperty("L07F01")]
        public int SlotId { get; set; }

        /// <summary>
        /// Gets or sets doctor user identifier.
        /// </summary>
        [MapProperty("L07F02")]
        public int DoctorUserId { get; set; }

        /// <summary>
        /// Gets or sets clinic identifier.
        /// </summary>
        [MapProperty("L07F03")]
        public int ClinicId { get; set; }

        /// <summary>
        /// Gets or sets clinic name.
        /// </summary>
        public string? ClinicName { get; set; }

        /// <summary>
        /// Gets or sets clinic address.
        /// </summary>
        public string? ClinicAddress { get; set; }

        /// <summary>
        /// Gets or sets clinic city.
        /// </summary>
        public string? ClinicCity { get; set; }

        /// <summary>
        /// Gets or sets appointment slot start UTC date and time.
        /// </summary>
        [MapProperty("L07F04")]
        public DateTime SlotStartUtc { get; set; }

        /// <summary>
        /// Gets or sets appointment slot end UTC date and time.
        /// </summary>
        [MapProperty("L07F05")]
        public DateTime SlotEndUtc { get; set; }

        /// <summary>
        /// Gets or sets whether the slot is already booked.
        /// </summary>
        [MapProperty("L07F06")]
        public bool IsBooked { get; set; }

        /// <summary>
        /// Gets or sets slot creation date.
        /// </summary>
        [MapProperty("L07F07")]
        public DateTime CreatedAt { get; set; }

        #endregion
    }
}
