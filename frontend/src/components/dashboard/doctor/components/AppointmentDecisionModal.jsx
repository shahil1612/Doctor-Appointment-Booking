import { useState } from "react";
import { appointmentAPI } from "../../../../services/api.js";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import toast from "react-hot-toast";

const AppointmentDecisionModal = ({
  isOpen,
  onClose,
  appointment,
  onDecisionSuccess,
}) => {
  const [decision, setDecision] = useState(null); // "APPROVE" or "DECLINE"
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !appointment) return null;

  const handleSubmit = async () => {
    if (!decision) {
      toast.error("Please select a decision (Approve or Decline)");
      return;
    }

    setIsSubmitting(true);
    try {
      await appointmentAPI.decideAppointment(appointment.appointmentId, {
        decision: decision,
        doctorNotes: notes || null,
      });

      toast.success(
        `Appointment ${decision === "APPROVE" ? "approved" : "declined"} successfully!`,
      );
      onDecisionSuccess?.();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error making decision:", error);
      toast.error(error.message || "Failed to process appointment decision");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setDecision(null);
    setNotes("");
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
            Review Appointment
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
          {/* Patient Information */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Patient Name" value={appointment.patientName} />
              <InfoItem label="Status" value={null} custom={true}>
                <Badge variant="pending">
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </Badge>
              </InfoItem>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Date" value={formattedDate} />
              <InfoItem label="Time" value={formattedTime} />
              <InfoItem label="Reason" value={appointment.reason} />
            </div>
          </div>

          {/* Decision Section */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Your Decision
            </h3>
            <div className="space-y-3">
              {/* Approve Button */}
              <button
                onClick={() => setDecision("APPROVE")}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  decision === "APPROVE"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      decision === "APPROVE"
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {decision === "APPROVE" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Approve</p>
                    <p className="text-sm text-gray-600">
                      Confirm this appointment
                    </p>
                  </div>
                </div>
              </button>

              {/* Decline Button */}
              <button
                onClick={() => setDecision("DECLINE")}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  decision === "DECLINE"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-red-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      decision === "DECLINE"
                        ? "border-red-500 bg-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {decision === "DECLINE" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Decline</p>
                    <p className="text-sm text-gray-600">
                      Reject this appointment
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-3">
              Add Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={500}
              placeholder="Add any notes for the patient..."
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="4"
            />
            <p className="text-xs text-gray-500 mt-2">
              {notes.length}/500 characters
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 flex-shrink-0">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!decision || isSubmitting}
            className={
              decision === "APPROVE"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Decision"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, custom = false, children }) => {
  return (
    <div>
      <label className="text-xs font-medium text-gray-500 block mb-1">
        {label}
      </label>
      {custom ? (
        children
      ) : (
        <p className="text-sm text-[#1e293b] font-medium">{value}</p>
      )}
    </div>
  );
};

export default AppointmentDecisionModal;
