using backend.Mapping;

namespace backend.DTOs
{
    /// <summary>
    /// Represents prescription payload returned by prescription APIs.
    /// </summary>
    public class PrescriptionResponse
    {
        /// <summary>
        /// Gets or sets prescription identifier.
        /// </summary>
        [MapProperty("L08F01")]
        public int PrescriptionId { get; set; }

        /// <summary>
        /// Gets or sets appointment identifier.
        /// </summary>
        [MapProperty("L08F02")]
        public int AppointmentId { get; set; }

        /// <summary>
        /// Gets or sets doctor user identifier who issued.
        /// </summary>
        [MapProperty("L08F03")]
        public int DoctorUserId { get; set; }

        /// <summary>
        /// Gets or sets patient user identifier.
        /// </summary>
        [MapProperty("L08F04")]
        public int PatientUserId { get; set; }

        /// <summary>
        /// Gets or sets medication name.
        /// </summary>
        [MapProperty("L08F05")]
        public string MedicationName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets dosage.
        /// </summary>
        [MapProperty("L08F06")]
        public string Dosage { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets frequency.
        /// </summary>
        [MapProperty("L08F07")]
        public string Frequency { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets duration.
        /// </summary>
        [MapProperty("L08F08")]
        public string Duration { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets additional instructions/notes.
        /// </summary>
        [MapProperty("L08F09")]
        public string? Instructions { get; set; }

        /// <summary>
        /// Gets or sets prescription issue date UTC.
        /// </summary>
        [MapProperty("L08F10")]
        public DateTime IssuedAtUtc { get; set; }

        /// <summary>
        /// Gets or sets prescription creation UTC date and time.
        /// </summary>
        [MapProperty("L08F11")]
        public DateTime CreatedAtUtc { get; set; }

        /// <summary>
        /// Gets or sets doctor name (non-mapped, enriched from service).
        /// </summary>
        public string? DoctorName { get; set; }

        /// <summary>
        /// Gets or sets patient name (non-mapped, enriched from service).
        /// </summary>
        public string? PatientName { get; set; }

        /// <summary>
        /// Gets or sets appointment date (non-mapped, enriched from service).
        /// </summary>
        public DateTime? AppointmentDate { get; set; }
    }
}
