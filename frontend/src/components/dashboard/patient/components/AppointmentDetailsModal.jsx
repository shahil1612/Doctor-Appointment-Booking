import Badge from "./ui/Badge";
import Button from "./ui/Button";

const AppointmentDetailsModal = ({ isOpen, onClose, appointment }) => {
  console.log("Selected appointment for details:", appointment);
  if (!isOpen || !appointment) return null;

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
    second: "2-digit",
  });

  const statusVariant = {
    pending: "pending",
    confirmed: "confirmed",
    cancelled: "cancelled",
    completed: "completed",
  }[appointment.status];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2
            className="text-2xl font-semibold text-[#1e293b]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Appointment Details
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Doctor Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Doctor Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Doctor Name" value={appointment.doctor} />
              <InfoItem label="Status" value={null} custom={true}>
                <Badge variant={statusVariant}>
                  {appointment.status === "pending"
                    ? "Pending Confirmation"
                    : appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                </Badge>
              </InfoItem>
            </div>
          </div>

          {/* Appointment Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Date" value={formattedDate} />
              <InfoItem label="Time" value={formattedTime} />
              <InfoItem
                label="Reason"
                value={appointment.reason || "Not specified"}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Additional Information
            </h3>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-2">
                Appointment Reason
              </label>
              <div className="bg-gray-50 rounded-lg p-4 min-h-[100px] text-sm text-[#1e293b]">
                {appointment.reason || "No reason specified"}
              </div>
            </div>

            {appointment.doctorNotes && (
              <div className="mt-4">
                <label className="text-xs font-medium text-gray-500 block mb-2">
                  Doctor Notes
                </label>
                <div className="bg-blue-50 rounded-lg p-4 min-h-[100px] text-sm text-[#1e293b] border-l-4 border-blue-500">
                  {appointment.doctorNotes}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
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

export default AppointmentDetailsModal;
