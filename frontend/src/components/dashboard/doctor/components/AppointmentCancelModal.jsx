import { useState } from "react";
import { appointmentAPI } from "../../../../services/api.js";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

const AppointmentCancelModal = ({
  isOpen,
  onClose,
  appointment,
  onCancelSuccess,
  isCompleteMode = false,
}) => {
  const [cancellationNotes, setCancellationNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !appointment) return null;

  const handleCancel = async () => {
    if (!cancellationNotes.trim()) {
      toast.error(
        `Please provide ${isCompleteMode ? "completion notes" : "a cancellation reason"}`,
      );
      return;
    }

    if (cancellationNotes.trim().length < 3) {
      toast.error(
        `${isCompleteMode ? "Completion notes" : "Cancellation reason"} must be at least 3 characters`,
      );
      return;
    }

    setIsSubmitting(true);
    try {
      if (isCompleteMode) {
        await appointmentAPI.completeAppointment(appointment.appointmentId, {
          doctorNotes: cancellationNotes,
        });
        toast.success("Appointment marked as completed!");
      } else {
        await appointmentAPI.cancelAppointment(appointment.appointmentId, {
          doctorNotes: cancellationNotes,
        });
        toast.success("Appointment cancelled successfully!");
      }

      onCancelSuccess?.();
      resetForm();
      onClose();
    } catch (error) {
      console.error(
        `Error ${isCompleteMode ? "completing" : "cancelling"} appointment:`,
        error,
      );
      toast.error(
        error.message ||
          `Failed to ${isCompleteMode ? "complete" : "cancel"} appointment`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCancellationNotes("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const appointmentDate = new Date(appointment.appointmentAtUtc);
  const formattedDate = appointmentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = appointmentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h2
            className="text-2xl font-semibold text-[#1e293b]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {isCompleteMode ? "Complete Appointment" : "Cancel Appointment"}
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Warning Banner */}
          {!isCompleteMode && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <div className="text-2xl flex-shrink-0">⚠️</div>
              <div>
                <p className="font-semibold text-red-900">
                  Cancel this appointment?
                </p>
                <p className="text-sm text-red-700 mt-1">
                  This action cannot be undone. The patient will be notified of
                  the cancellation.
                </p>
              </div>
            </div>
          )}

          {isCompleteMode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <div className="text-2xl flex-shrink-0">✅</div>
              <div>
                <p className="font-semibold text-green-900">
                  Mark this appointment as completed?
                </p>
                <p className="text-sm text-green-700 mt-1">
                  This will move the appointment to completed status. Please add
                  any final notes.
                </p>
              </div>
            </div>
          )}

          {/* Appointment Information */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Appointment Details
            </h3>
            <div className="space-y-2">
              <InfoRow label="Patient" value={appointment.patientName} />
              <InfoRow label="Date" value={formattedDate} />
              <InfoRow label="Time" value={formattedTime} />
              <InfoRow label="Reason" value={appointment.reason} />
            </div>
          </div>

          {/* Cancellation/Completion Notes */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-3">
              {isCompleteMode
                ? "Completion Notes *"
                : "Reason for Cancellation *"}
            </label>
            <textarea
              value={cancellationNotes}
              onChange={(e) => setCancellationNotes(e.target.value)}
              maxLength={500}
              placeholder={
                isCompleteMode
                  ? "Add any notes about this completed appointment (minimum 3 characters)..."
                  : "Explain why you are cancelling this appointment (minimum 3 characters)..."
              }
              className={`w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 ${isCompleteMode ? "focus:ring-green-500" : "focus:ring-red-500"} resize-none`}
              rows="5"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                {cancellationNotes.length}/500 characters
              </p>
              {cancellationNotes.trim().length < 3 &&
                cancellationNotes.length > 0 && (
                  <p className="text-xs text-red-500">
                    Minimum 3 characters required
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 flex-shrink-0">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            {isCompleteMode ? "Go Back" : "Keep Appointment"}
          </Button>
          <Button
            variant={isCompleteMode ? "primary" : "danger"}
            onClick={handleCancel}
            disabled={
              !cancellationNotes.trim() ||
              cancellationNotes.trim().length < 3 ||
              isSubmitting
            }
          >
            {isSubmitting
              ? isCompleteMode
                ? "Completing..."
                : "Cancelling..."
              : isCompleteMode
                ? "Mark as Completed"
                : "Cancel Appointment"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-start">
    <span className="text-sm text-gray-600">{label}:</span>
    <span className="text-sm font-medium text-[#1e293b]">{value}</span>
  </div>
);

export default AppointmentCancelModal;
