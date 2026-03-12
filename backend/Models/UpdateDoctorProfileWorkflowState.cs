using backend.DTOs;

namespace backend.Models
{
    /// <summary>
    /// Represents the in-memory state for doctor profile update workflow.
    /// </summary>
    public class UpdateDoctorProfileWorkflowState
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the doctor user identifier.
        /// </summary>
        public int DoctorUserId { get; set; }

        /// <summary>
        /// Gets or sets the update profile request.
        /// </summary>
        public UpdateDoctorProfileRequest Request { get; set; } = null!;

        /// <summary>
        /// Gets or sets the doctor entity loaded from database.
        /// </summary>
        public TBL03? Doctor { get; set; }

        #endregion
    }
}
