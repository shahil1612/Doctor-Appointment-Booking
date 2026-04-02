import { useState, useEffect } from "react";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import SummaryCards from "../components/SummaryCards";
import { doctorAPI, appointmentAPI } from "../../../../services/api.js";
import toast from "react-hot-toast";

const OverviewPage = () => {
  const [loading, setLoading] = useState(true);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [doctorProfile, setDoctorProfile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profileData, approvedData, patientsData] = await Promise.all([
        doctorAPI.getProfile(),
        appointmentAPI.getApprovedAppointments(),
        doctorAPI.getPatients(),
      ]);

      setDoctorProfile(profileData);
      setTotalPatients(patientsData?.length || 0);

      // Separate today's and upcoming approved appointments
      const now = new Date();
      const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );
      const todayEnd = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      );

      const todays = approvedData.filter((apt) => {
        const aptDate = new Date(apt.appointmentAtUtc);
        return aptDate >= todayStart && aptDate < todayEnd;
      });

      const upcoming = approvedData
        .filter((apt) => {
          const aptDate = new Date(apt.appointmentAtUtc);
          return aptDate >= todayEnd;
        })
        .sort(
          (a, b) => new Date(a.appointmentAtUtc) - new Date(b.appointmentAtUtc),
        )
        .slice(0, 5); // Get first 5 upcoming appointments

      setTodaysAppointments(todays);
      setUpcomingAppointments(upcoming);
    } catch (error) {
      console.error("Failed to fetch overview data:", error);
      toast.error("Failed to load overview data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const summaryData = [
    {
      icon: "📅",
      value: todaysAppointments.length.toString(),
      label: "Today's Appointments",
      color: "blue",
    },
    {
      icon: "👥",
      value: totalPatients.toString(),
      label: "Total Patients",
      color: "green",
    },
    {
      icon: "⭐",
      value: doctorProfile?.ratingAvg?.toFixed(1) || "N/A",
      label: "Rating",
      subtitle:
        doctorProfile?.totalReviews > 0
          ? `(${doctorProfile?.totalReviews} reviews)`
          : "",
      color: "amber",
    },
    {
      icon: "📆",
      value: upcomingAppointments.length.toString(),
      label: "Upcoming Appointments",
      color: "indigo",
    },
  ];

  return (
    <div className="space-y-6">
      <SummaryCards cards={summaryData} />

      {/* Upcoming Appointments Section */}
      <Card>
        <Card.Header>
          <Card.Title>Upcoming Appointments</Card.Title>
        </Card.Header>
        <Card.Content>
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No upcoming appointments</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div
                  key={apt.appointmentId}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {apt.patientName}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      📅{" "}
                      {new Date(apt.appointmentAtUtc).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}{" "}
                      at{" "}
                      {new Date(apt.appointmentAtUtc).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                    {apt.reason && (
                      <p className="text-xs text-gray-600 mt-1">
                        💬 {apt.reason}
                      </p>
                    )}
                  </div>
                  <Badge variant="confirmed" className="ml-4">
                    {apt.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>

      {/* Today's Appointments Section */}
      <Card>
        <Card.Header>
          <Card.Title>Today's Appointments</Card.Title>
        </Card.Header>
        <Card.Content>
          {todaysAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No appointments today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todaysAppointments.map((apt) => (
                <div
                  key={apt.appointmentId}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {apt.patientName}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      ⏰{" "}
                      {new Date(apt.appointmentAtUtc).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                    {apt.reason && (
                      <p className="text-xs text-gray-600 mt-1">
                        💬 {apt.reason}
                      </p>
                    )}
                  </div>
                  <Badge variant="confirmed" className="ml-4">
                    {apt.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default OverviewPage;
