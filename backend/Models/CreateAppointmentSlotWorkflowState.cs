using backend.DTOs;

namespace backend.Models
{
    /// <summary>
    /// Represents the in-memory state for appointment slot creation workflow.
    /// </summary>
    public class CreateAppointmentSlotWorkflowState
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the doctor user identifier.
        /// </summary>
        public int DoctorUserId { get; set; }

        /// <summary>
        /// Gets or sets the create appointment slot request.
        /// </summary>
        public CreateAppointmentSlotRequest Request { get; set; } = null!;

        /// <summary>
        /// Gets or sets the appointment slot entity to be created.
        /// </summary>
        public TBL07 Slot { get; set; } = null!;

        #endregion
    }
}
