using backend.DTOs;

namespace backend.Models
{
    /// <summary>
    /// Represents the in-memory state for clinic creation workflow.
    /// </summary>
    public class CreateClinicWorkflowState
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the doctor user identifier.
        /// </summary>
        public int DoctorUserId { get; set; }

        /// <summary>
        /// Gets or sets the create clinic request.
        /// </summary>
        public CreateClinicRequest Request { get; set; } = null!;

        /// <summary>
        /// Gets or sets the clinic entity to be created.
        /// </summary>
        public TBL05 Clinic { get; set; } = null!;

        /// <summary>
        /// Gets or sets the doctor-clinic association entity to be created.
        /// </summary>
        public TBL06 DoctorClinic { get; set; } = null!;

        #endregion
    }
}
