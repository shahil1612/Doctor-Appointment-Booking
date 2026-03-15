import { useState, useEffect } from "react";
import { appointmentAPI } from "../../../../services/api.js";
import SummaryCards from "../components/SummaryCards";
import AppointmentsList from "../components/AppointmentsList";
import AppointmentDetailsModal from "../components/AppointmentDetailsModal";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

const OverviewPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Fetch appointments for overview
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await appointmentAPI.getPendingAppointments();
        console.log("✅ Pending Appointments Response:", data);
        const now = new Date();
        const transformed = data
          .map((apt) => {
            const aptDate = new Date(apt.appointmentAtUtc);
            return {
              id: apt.appointmentId,
              day: aptDate.getDate().toString(),
              month: aptDate.toLocaleDateString("en-US", { month: "short" }),
              doctor: apt.doctorName || "Dr. Unknown",
              type: apt.reason || "General Checkup",
              reason: apt.reason,
              time: aptDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              status:
                apt.status === "pending"
                  ? "pending"
                  : apt.status === "approved"
                    ? "confirmed"
                    : "cancelled",
              appointmentAtUtc: apt.appointmentAtUtc,
            };
          })
          .filter((apt) => new Date(apt.appointmentAtUtc) > now)
          .sort(
            (a, b) =>
              new Date(a.appointmentAtUtc) - new Date(b.appointmentAtUtc),
          )
          .slice(0, 3);

        setAppointments(transformed);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const summaryData = [
    {
      icon: "📅",
      value: appointments.length.toString(),
      label: "Upcoming Appointments",
      color: "blue",
    },
    {
      icon: "💊",
      value: "—",
      label: "Prescriptions",
      color: "amber",
    },
    {
      icon: "📁",
      value: "—",
      label: "Documents",
      color: "rose",
    },
    {
      icon: "💬",
      value: "—",
      label: "Messages",
      color: "indigo",
    },
  ];

  return (
    <div className="space-y-6">
      <SummaryCards cards={summaryData} />

      {/* Upcoming Appointments */}
      <Card>
        <Card.Header>
          <Card.Title subtitle="Your next scheduled visits">
            Upcoming Appointments
          </Card.Title>
        </Card.Header>
        <Card.Content className="space-y-3">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                You don't have any upcoming appointments
              </p>
              <Button variant="primary">📅 Book Your First Appointment</Button>
            </div>
          ) : (
            appointments.map((appt) => (
              <AppointmentsList
                key={appt.id}
                appointments={[appt]}
                title=""
                subtitle=""
                showTitle={false}
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

export default OverviewPage;
