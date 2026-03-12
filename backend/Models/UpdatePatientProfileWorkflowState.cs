using backend.DTOs;

namespace backend.Models
{
    /// <summary>
    /// Represents the in-memory state for patient profile update workflow.
    /// </summary>
    public class UpdatePatientProfileWorkflowState
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the patient user identifier.
        /// </summary>
        public int PatientUserId { get; set; }

        /// <summary>
        /// Gets or sets the update profile request.
        /// </summary>
        public UpdatePatientProfileRequest Request { get; set; } = null!;

        /// <summary>
        /// Gets or sets the patient entity loaded from database.
        /// </summary>
        public TBL02? Patient { get; set; }

        #endregion
    }
}
