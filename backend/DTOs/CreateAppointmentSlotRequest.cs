using System.ComponentModel.DataAnnotations;
using backend.Mapping;

namespace backend.DTOs
{
    /// <summary>
    /// Represents appointment slot creation request payload.
    /// </summary>
    public class CreateAppointmentSlotRequest
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets clinic identifier where the slot will be available.
        /// </summary>
        [Required(ErrorMessage = "Clinic ID is required.")]
        [MapProperty("L07F03")]
        public int ClinicId { get; set; }

        /// <summary>
        /// Gets or sets appointment slot start UTC date and time.
        /// </summary>
        [Required(ErrorMessage = "Slot start time is required.")]
        [MapProperty("L07F04")]
        public DateTime SlotStartUtc { get; set; }

        /// <summary>
        /// Gets or sets appointment slot end UTC date and time.
        /// </summary>
        [Required(ErrorMessage = "Slot end time is required.")]
        [MapProperty("L07F05")]
        public DateTime SlotEndUtc { get; set; }

        #endregion
    }
}
