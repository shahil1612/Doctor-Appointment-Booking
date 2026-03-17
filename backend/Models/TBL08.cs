using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    /// <summary>
    /// Represents prescription data table.
    /// </summary>
    [Table("prescriptions")]
    public class TBL08
    {
        #region Public Properties

        /// <summary>
        /// Represents prescription identifier.
        /// </summary>
        [Key]
        [Column("id")]
        public int L08F01 { get; set; }

        /// <summary>
        /// Represents appointment identifier (foreign key).
        /// </summary>
        [Column("appointment_id")]
        public int L08F02 { get; set; }

        /// <summary>
        /// Represents doctor user identifier (who issued).
        /// </summary>
        [Column("doctor_user_id")]
        public int L08F03 { get; set; }

        /// <summary>
        /// Represents patient user identifier.
        /// </summary>
        [Column("patient_user_id")]
        public int L08F04 { get; set; }

        /// <summary>
        /// Represents medication name.
        /// </summary>
        [Column("medication_name")]
        public string L08F05 { get; set; } = string.Empty;

        /// <summary>
        /// Represents dosage (e.g., "500mg", "10ml").
        /// </summary>
        [Column("dosage")]
        public string L08F06 { get; set; } = string.Empty;

        /// <summary>
        /// Represents frequency (e.g., "Twice daily", "Once at night").
        /// </summary>
        [Column("frequency")]
        public string L08F07 { get; set; } = string.Empty;

        /// <summary>
        /// Represents duration (e.g., "7 days", "2 weeks").
        /// </summary>
        [Column("duration")]
        public string L08F08 { get; set; } = string.Empty;

        /// <summary>
        /// Represents additional instructions/notes.
        /// </summary>
        [Column("instructions")]
        public string? L08F09 { get; set; }

        /// <summary>
        /// Represents prescription issue date UTC.
        /// </summary>
        [Column("issued_at_utc")]
        public DateTime L08F10 { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Represents prescription creation UTC date and time.
        /// </summary>
        [Column("created_at_utc")]
        public DateTime L08F11 { get; set; } = DateTime.UtcNow;

        #endregion
    }
}
