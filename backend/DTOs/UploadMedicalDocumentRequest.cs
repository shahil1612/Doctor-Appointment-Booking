using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    /// <summary>
    /// Represents request payload for uploading medical document.
    /// </summary>
    public class UploadMedicalDocumentRequest
    {
        /// <summary>
        /// Gets or sets the document title.
        /// </summary>
        [Required(ErrorMessage = "Document title is required.")]
        [StringLength(200, MinimumLength = 3, ErrorMessage = "Document title must be between 3 and 200 characters.")]
        public string DocumentTitle { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the document description.
        /// </summary>
        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        /// <summary>
        /// Gets or sets the file to upload.
        /// </summary>
        [Required(ErrorMessage = "File is required.")]
        public IFormFile File { get; set; } = null!;
    }
}
