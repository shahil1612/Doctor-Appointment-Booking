import { useState, useEffect } from "react";
import { appointmentAPI } from "../../../../services/api.js";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import AppointmentDecisionModal from "../components/AppointmentDecisionModal";
import AppointmentCancelModal from "../components/AppointmentCancelModal";
import toast from "react-hot-toast";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, approved, cancelled, declined, completed
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  // Fetch appointments on mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      // Fetch all appointment statuses in parallel
      const [
        pendingData,
        approvedData,
        declinedData,
        cancelledData,
        completedData,
      ] = await Promise.all([
        appointmentAPI.getPendingAppointments(),
        appointmentAPI.getApprovedAppointments(),
        appointmentAPI.getDeclinedAppointments(),
        appointmentAPI.getCancelledAppointments(),
        appointmentAPI.getCompletedAppointments(),
      ]);

      // Combine all appointments
      const allAppointments = [
        ...pendingData,
        ...approvedData,
        ...declinedData,
        ...cancelledData,
        ...completedData,
      ];

      // Transform backend response to match expected format
      const transformed = allAppointments.map((apt) => {
        const aptDate = new Date(apt.appointmentAtUtc);
        return {
          id: apt.appointmentId,
          appointmentId: apt.appointmentId,
          patientName: apt.patientName || "Unknown Patient",
          patientUserId: apt.patientUserId,
          reason: apt.reason || "General Checkup",
          appointmentAtUtc: apt.appointmentAtUtc,
          date: aptDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          time: aptDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: apt.status?.toLowerCase() || "pending",
          doctorNotes: apt.doctorNotes,
          createdAtUtc: apt.createdAtUtc,
          updatedAtUtc: apt.updatedAtUtc,
        };
      });

      setAppointments(transformed);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  // Filter appointments
  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true;
    return apt.status === filter;
  });

  const getStatusColor = (status) => {
    const statusMap = {
      pending: "pending",
      approved: "confirmed",
      cancelled: "cancelled",
      declined: "cancelled",
      completed: "default",
    };
    return statusMap[status] || "default";
  };

  const handleDecisionClick = (appointment) => {
    if (appointment.status !== "pending") {
      toast.error("You can only approve or decline pending appointments");
      return;
    }
    setSelectedAppointment(appointment);
    setIsDecisionModalOpen(true);
  };

  const handleCancelClick = (appointment) => {
    if (appointment.status !== "approved") {
      toast.error("You can only cancel approved appointments");
      return;
    }
    setSelectedAppointment(appointment);
    setIsCancelModalOpen(true);
  };

  const handleCompleteClick = (appointment) => {
    if (appointment.status !== "approved") {
      toast.error("You can only complete approved appointments");
      return;
    }
    setSelectedAppointment(appointment);
    setIsCompleteModalOpen(true);
  };

  const handleDecisionSuccess = async () => {
    setIsDecisionModalOpen(false);
    setSelectedAppointment(null);
    await fetchAppointments();
    toast.success("Appointment updated successfully!");
  };

  const handleCancelSuccess = async () => {
    setIsCancelModalOpen(false);
    setSelectedAppointment(null);
    await fetchAppointments();
    toast.success("Appointment cancelled successfully!");
  };

  const handleCompleteSuccess = async () => {
    setIsCompleteModalOpen(false);
    setSelectedAppointment(null);
    await fetchAppointments();
    toast.success("Appointment marked as completed successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 pb-4 border-b border-gray-200 overflow-x-auto">
        {[
          "all",
          "pending",
          "approved",
          "completed",
          "cancelled",
          "declined",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize whitespace-nowrap ${
              filter === tab
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <Card>
          <Card.Content className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No appointments found</p>
            <p className="text-sm">
              {filter === "all"
                ? "Start accepting appointment requests to see them here"
                : `No ${filter} appointments at the moment`}
            </p>
          </Card.Content>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredAppointments.map((apt) => (
            <Card
              key={apt.id}
              className={`hover:shadow-md transition-all ${
                apt.status === "pending"
                  ? "border-l-4 border-l-amber-500"
                  : apt.status === "approved"
                    ? "border-l-4 border-l-green-500"
                    : apt.status === "completed"
                      ? "border-l-4 border-l-blue-500"
                      : "border-l-4 border-l-gray-400"
              }`}
            >
              <Card.Content className="flex items-center justify-between gap-4">
                {/* Patient Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {apt.patientName}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{apt.reason}</p>
                  <p className="text-xs text-gray-500 mt-2 font-mono">
                    📅 {apt.date} at {apt.time}
                  </p>
                </div>

                {/* Status Badge */}
                <Badge variant={getStatusColor(apt.status)}>
                  {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                </Badge>

                {/* Actions */}
                <div className="flex gap-2">
                  {apt.status === "pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDecisionClick(apt)}
                    >
                      Review
                    </Button>
                  )}
                  {apt.status === "approved" && (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleCompleteClick(apt)}
                      >
                        Complete
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancelClick(apt)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      )}

      {/* Decision Modal */}
      <AppointmentDecisionModal
        isOpen={isDecisionModalOpen}
        onClose={() => {
          setIsDecisionModalOpen(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
        onDecisionSuccess={handleDecisionSuccess}
      />

      {/* Cancel Modal */}
      <AppointmentCancelModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
        onCancelSuccess={handleCancelSuccess}
      />

      {/* Complete Modal */}
      <AppointmentCancelModal
        isOpen={isCompleteModalOpen}
        onClose={() => {
          setIsCompleteModalOpen(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
        onCancelSuccess={handleCompleteSuccess}
        isCompleteMode={true}
      />
    </div>
  );
};

export default AppointmentsPage;
