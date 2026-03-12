using System.ComponentModel.DataAnnotations;
using backend.Mapping;

namespace backend.DTOs
{
    /// <summary>
    /// Represents patient request for creating a new appointment.
    /// </summary>
    public class CreateAppointmentRequest
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets doctor user identifier.
        /// </summary>
        [Required(ErrorMessage = "Please select a doctor.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please select a valid doctor.")]
        [MapProperty("L04F03")]
        public int DoctorUserId { get; set; }

        /// <summary>
        /// Gets or sets appointment slot identifier (required for slot-based booking).
        /// </summary>
        [Required(ErrorMessage = "Please select an appointment slot.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please select a valid appointment slot.")]
        public int SlotId { get; set; }

        /// <summary>
        /// Gets or sets reason for booking.
        /// </summary>
        [Required(ErrorMessage = "Reason is required.")]
        [MinLength(5, ErrorMessage = "Reason must be at least 5 characters.")]
        [MaxLength(500, ErrorMessage = "Reason cannot exceed 500 characters.")]
        [MapProperty("L04F05")]
        public string Reason { get; set; } = string.Empty;

        #endregion
    }
}
