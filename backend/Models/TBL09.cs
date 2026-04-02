using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    /// <summary>
    /// Represents medical documents data table.
    /// </summary>
    [Table("medical_documents")]
    public class TBL09
    {
        #region Public Properties

        /// <summary>
        /// Represents document identifier.
        /// </summary>
        [Key]
        [Column("id")]
        public int L09F01 { get; set; }

        /// <summary>
        /// Represents patient user identifier (owner).
        /// </summary>
        [Column("patient_user_id")]
        public int L09F02 { get; set; }

        /// <summary>
        /// Represents document title/name.
        /// </summary>
        [Column("document_title")]
        [Required]
        [StringLength(200)]
        public string L09F03 { get; set; } = string.Empty;

        /// <summary>
        /// Represents document description.
        /// </summary>
        [Column("description")]
        [StringLength(500)]
        public string? L09F04 { get; set; }

        /// <summary>
        /// Represents file name.
        /// </summary>
        [Column("file_name")]
        [Required]
        [StringLength(255)]
        public string L09F05 { get; set; } = string.Empty;

        /// <summary>
        /// Represents file path on server.
        /// </summary>
        [Column("file_path")]
        [Required]
        [StringLength(500)]
        public string L09F06 { get; set; } = string.Empty;

        /// <summary>
        /// Represents file size in bytes.
        /// </summary>
        [Column("file_size")]
        public long L09F07 { get; set; }

        /// <summary>
        /// Represents file MIME type.
        /// </summary>
        [Column("file_type")]
        [Required]
        [StringLength(100)]
        public string L09F08 { get; set; } = string.Empty;

        /// <summary>
        /// Represents document upload UTC date and time.
        /// </summary>
        [Column("uploaded_at_utc")]
        public DateTime L09F09 { get; set; } = DateTime.UtcNow;

        #endregion
    }
}
