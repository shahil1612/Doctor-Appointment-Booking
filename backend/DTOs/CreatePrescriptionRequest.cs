using backend.Mapping;

namespace backend.DTOs
{
    /// <summary>
    /// Represents prescription creation request payload.
    /// </summary>
    public class CreatePrescriptionRequest
    {
        /// <summary>
        /// Gets or sets appointment identifier this prescription is for.
        /// </summary>
        [MapProperty("L08F02")]
        public int AppointmentId { get; set; }

        /// <summary>
        /// Gets or sets medication name.
        /// </summary>
        [MapProperty("L08F05")]
        public string MedicationName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets dosage (e.g., "500mg", "10ml").
        /// </summary>
        [MapProperty("L08F06")]
        public string Dosage { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets frequency (e.g., "Twice daily", "Once at night").
        /// </summary>
        [MapProperty("L08F07")]
        public string Frequency { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets duration (e.g., "7 days", "2 weeks").
        /// </summary>
        [MapProperty("L08F08")]
        public string Duration { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets additional instructions/notes.
        /// </summary>
        [MapProperty("L08F09")]
        public string? Instructions { get; set; }
    }
}
