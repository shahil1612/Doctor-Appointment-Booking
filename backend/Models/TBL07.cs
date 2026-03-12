using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    /// <summary>
    /// Represents appointment slot information for doctors at specific clinics.
    /// </summary>
    [Table("appointment_slots")]
    [Index(nameof(L07F02), nameof(L07F03), nameof(L07F04), IsUnique = true)]
    public class TBL07
    {
        #region Public Properties

        /// <summary>
        /// Represents appointment slot identifier.
        /// </summary>
        [Key]
        [Column("id")]
        public int L07F01 { get; set; }

        /// <summary>
        /// Represents related doctor user identifier.
        /// Foreign key referencing doctors.user_id.
        /// </summary>
        [Column("doctor_user_id")]
        public int L07F02 { get; set; }

        /// <summary>
        /// Represents related clinic identifier.
        /// Foreign key referencing clinics.id.
        /// </summary>
        [Column("clinic_id")]
        public int L07F03 { get; set; }

        /// <summary>
        /// Represents appointment slot start UTC date and time.
        /// </summary>
        [Column("slot_start_utc")]
        public DateTime L07F04 { get; set; }

        /// <summary>
        /// Represents appointment slot end UTC date and time.
        /// </summary>
        [Column("slot_end_utc")]
        public DateTime L07F05 { get; set; }

        /// <summary>
        /// Indicates whether the appointment slot is already booked.
        /// </summary>
        [Column("is_booked")]
        public bool L07F06 { get; set; } = false;

        /// <summary>
        /// Represents appointment slot creation UTC date and time.
        /// </summary>
        [Column("created_at")]
        public DateTime L07F07 { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Represents related doctor information.
        /// </summary>
        [ForeignKey(nameof(L07F02))]
        public TBL03 L07F08 { get; set; } = null!;

        /// <summary>
        /// Represents related clinic information.
        /// </summary>
        [ForeignKey(nameof(L07F03))]
        public TBL05 L07F09 { get; set; } = null!;

        #endregion
    }
}