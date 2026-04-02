using backend.Mapping;
using backend.Models;

namespace backend.DTOs
{
    /// <summary>
    /// Represents medical document response payload.
    /// </summary>
    public class MedicalDocumentResponse
    {
        /// <summary>
        /// Gets or sets document identifier.
        /// </summary>
        [MapProperty("L09F01")]
        public int DocumentId { get; set; }

        /// <summary>
        /// Gets or sets patient user identifier.
        /// </summary>
        [MapProperty("L09F02")]
        public int PatientUserId { get; set; }

        /// <summary>
        /// Gets or sets document title.
        /// </summary>
        [MapProperty("L09F03")]
        public string DocumentTitle { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets document description.
        /// </summary>
        [MapProperty("L09F04")]
        public string? Description { get; set; }

        /// <summary>
        /// Gets or sets file name.
        /// </summary>
        [MapProperty("L09F05")]
        public string FileName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets file size in bytes.
        /// </summary>
        [MapProperty("L09F07")]
        public long FileSize { get; set; }

        /// <summary>
        /// Gets or sets file MIME type.
        /// </summary>
        [MapProperty("L09F08")]
        public string FileType { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets upload UTC date and time.
        /// </summary>
        [MapProperty("L09F09")]
        public DateTime UploadedAtUtc { get; set; }

        /// <summary>
        /// Gets or sets patient name (populated by service).
        /// </summary>
        public string? PatientName { get; set; }
    }
}
