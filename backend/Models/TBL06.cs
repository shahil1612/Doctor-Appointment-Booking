using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    /// <summary>
    /// Represents mapping between doctors and clinics where they provide consultation.
    /// </summary>
    [Table("doctor_clinics")]
    [Index(nameof(L06F02), nameof(L06F03), IsUnique = true)]
    public class TBL06
    {
        #region Public Properties

        /// <summary>
        /// Represents doctor-clinic mapping identifier.
        /// </summary>
        [Key]
        [Column("id")]
        public int L06F01 { get; set; }

        /// <summary>
        /// Represents related doctor user identifier.
        /// Foreign key referencing doctors.user_id.
        /// </summary>
        [Column("doctor_user_id")]
        public int L06F02 { get; set; }

        /// <summary>
        /// Represents related clinic identifier.
        /// Foreign key referencing clinics.id.
        /// </summary>
        [Column("clinic_id")]
        public int L06F03 { get; set; }

        /// <summary>
        /// Represents consultation fee charged by the doctor at this clinic.
        /// </summary>
        [Column("consultation_fee")]
        public decimal? L06F04 { get; set; }

        /// <summary>
        /// Represents doctor-clinic mapping creation UTC date and time.
        /// </summary>
        [Column("created_at")]
        public DateTime L06F05 { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Represents related doctor information.
        /// </summary>
        [ForeignKey(nameof(L06F02))]
        public TBL03 L06F06 { get; set; } = null!;

        /// <summary>
        /// Represents related clinic information.
        /// </summary>
        [ForeignKey(nameof(L06F03))]
        public TBL05 L06F07 { get; set; } = null!;

        #endregion
    }
}