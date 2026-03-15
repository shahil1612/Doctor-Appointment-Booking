import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserType } from "../../../../store/authSlice";
import { appointmentAPI } from "../../../../services/api.js";
import SummaryCards from "../components/SummaryCards";
import Card from "../components/ui/Card";
import AppointmentItem from "../components/AppointmentItem";
import AppointmentDetailsModal from "../components/AppointmentDetailsModal";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";

const AppointmentsPage = ({ onBookNew }) => {
  const [tab, setTab] = useState("upcoming");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const userType = useSelector(selectUserType);

  // Fetch appointments on mount and when tab changes
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data = await appointmentAPI.getPendingAppointments();
        // Transform backend response to match expected format
        const transformed = data.map((apt) => {
          const aptDate = new Date(apt.appointmentAtUtc);
          return {
            id: apt.appointmentId,
            day: aptDate.getDate().toString(),
            month: aptDate.toLocaleDateString("en-US", { month: "short" }),
            doctor: apt.doctorName || "Dr. Unknown",
            type: apt.reason || "General Checkup",
            time: aptDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status:
              apt.status === "pending"
                ? "pending"
                : apt.status === "approved"
                  ? "confirmed"
                  : apt.status === "declined"
                    ? "cancelled"
                    : "completed",
            appointmentAtUtc: apt.appointmentAtUtc,
            reason: apt.reason,
            doctorNotes: apt.doctorNotes,
            appointmentId: apt.appointmentId,
            doctorUserId: apt.doctorUserId,
          };
        });

        setAppointments(transformed);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        // Show error only if not a 404 or similar
        if (error.message !== "HTTP 404") {
          toast.error(error.message || "Failed to fetch appointments");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userType]);

  // Separate upcoming and past appointments
  const now = new Date();
  const upcomingAppts = appointments.filter((apt) => {
    const aptDate = new Date(apt.appointmentAtUtc);
    return aptDate > now && apt.status !== "cancelled";
  });

  const pastAppts = appointments.filter((apt) => {
    const aptDate = new Date(apt.appointmentAtUtc);
    return aptDate <= now || apt.status === "cancelled";
  });

  const summaryData = [
    {
      icon: "📅",
      value: upcomingAppts.length.toString(),
      label: "Upcoming",
      color: "blue",
    },
    {
      icon: "⏳",
      value: appointments
        .filter((a) => a.status === "pending")
        .length.toString(),
      label: "Pending Confirmation",
      color: "amber",
    },
    {
      icon: "✅",
      value: pastAppts.length.toString(),
      label: "Completed",
      color: "green",
    },
  ];

  const displayAppts =
    tab === "upcoming"
      ? upcomingAppts.sort(
          (a, b) => new Date(a.appointmentAtUtc) - new Date(b.appointmentAtUtc),
        )
      : pastAppts;

  return (
    <div className="space-y-6">
      <SummaryCards cards={summaryData} />

      <Card>
        <Card.Header>
          <Card.Title subtitle="Manage your schedule">Appointments</Card.Title>
          {userType === "PATIENT" && (
            <Button variant="primary" onClick={onBookNew}>
              + Book Appointment
            </Button>
          )}
        </Card.Header>

        {/* Tabs */}
        <div className="flex gap-2 px-5 pt-4 pb-2 border-b border-gray-200">
          {["upcoming", "past"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                tab === t
                  ? "bg-blue-100 text-blue-600 border border-blue-300"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {t === "upcoming" ? "Upcoming" : "Past & History"}
            </button>
          ))}
        </div>

        <Card.Content className="space-y-3">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : displayAppts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">
                {tab === "upcoming" ? "📭" : "📋"}
              </div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                No appointments
              </h4>
              <p className="text-xs text-gray-600">
                {tab === "upcoming"
                  ? "Book your first appointment to get started"
                  : "Your appointment history will appear here"}
              </p>
            </div>
          ) : (
            displayAppts.map((appt) => (
              <AppointmentItem
                key={appt.id}
                appointment={appt}
                showActions={tab === "upcoming"}
                onViewDetails={(apt) => {
                  setSelectedAppointment(apt);
                  setIsDetailsModalOpen(true);
                }}
              />
            ))
          )}
        </Card.Content>
      </Card>

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default AppointmentsPage;
