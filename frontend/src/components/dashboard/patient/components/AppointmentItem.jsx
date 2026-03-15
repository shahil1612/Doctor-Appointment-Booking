import Badge from "./ui/Badge";
import Button from "./ui/Button";

const AppointmentItem = ({
  appointment,
  showActions = true,
  onViewDetails,
}) => {
  const statusVariant = {
    confirmed: "confirmed",
    pending: "pending",
    cancelled: "cancelled",
    completed: "completed",
  }[appointment.status];

  const isUpcoming = appointment.status === "confirmed";
  const isPending = appointment.status === "pending";

  const statusColors = {
    confirmed: "bg-green-50 border-green-200 shadow-green-100",
    pending: "bg-amber-50 border-yellow-200 shadow-amber-100",
    cancelled: "bg-red-50 border-red-200 shadow-red-100",
    completed: "bg-gray-50 border-gray-200 shadow-gray-100",
  };

  const statusBgColor =
    statusColors[appointment.status] || statusColors.completed;

  return (
    <div
      className={`flex items-center gap-6 p-5 rounded-xl border-2 transition-all hover:shadow-lg ${statusBgColor}`}
    >
      {/* Date Block */}
      <div className="min-w-fit text-center p-3 bg-white rounded-xl border-2 border-blue-300 shadow-sm shrink-0">
        <div
          className="text-3xl font-bold text-blue-600"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          {appointment.day}
        </div>
        <div className="text-xs text-gray-600 uppercase tracking-widest font-bold">
          {appointment.month}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-bold text-[#1e293b]">
          {appointment.doctor}
        </h4>
        <p className="text-sm text-gray-600 mt-1">{appointment.type}</p>
        <p className="text-xs text-gray-500 mt-2 font-mono">
          🕐 {appointment.time}
        </p>
      </div>

      {/* Status Badge */}
      <Badge variant={statusVariant}>
        {appointment.status === "pending"
          ? "Pending Confirmation"
          : appointment.status.charAt(0).toUpperCase() +
            appointment.status.slice(1)}
      </Badge>

      {/* Actions */}
      {showActions && appointment.status !== "completed" && (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails?.(appointment)}
          >
            View Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentItem;
