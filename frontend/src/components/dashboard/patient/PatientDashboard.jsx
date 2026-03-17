import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Sidebar from "./components/Sidebar";
import Button from "../ui/Button";
import ProfileModal from "./components/ProfileModal";
import OverviewPage from "./pages/OverviewPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import DocumentsPage from "./pages/DocumentsPage";
import MessagesPage from "./pages/MessagesPage";
import CareTeamPage from "./pages/CareTeamPage";
import BillingPage from "./pages/BillingPage";
import { patientAPI, authAPI } from "../../../services/api";
import { logout as logoutAction } from "../../../store/authSlice";
import { getInitials, calculateAge } from "../../../utils/helpers.js";
import toast from "react-hot-toast";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState("overview");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Fetch patient profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await patientAPI.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        // TODO: Handle error appropriately (show toast, redirect to login, etc.)
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle profile update after successful edit
  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await authAPI.logout();
      dispatch(logoutAction());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  // Prepare patient data for sidebar
  const patientData = profile
    ? {
        name: profile.fullName,
        initials: getInitials(profile.fullName),
        id: profile.id.toString().padStart(6, "0"),
        age: calculateAge(profile.dob),
        gender: "Male", // Default as per requirement
        bloodGroup: profile.bloodGroup || "N/A",
      }
    : null;

  const pageMeta = {
    overview: {
      title: "Good morning, Emma 🌿",
      sub: "Here's your health overview",
    },
    appointments: {
      title: "Your Appointments",
      sub: "Manage, reschedule or book new visits",
    },
    "book-appointment": {
      title: "Book An Appointment",
      sub: "Schedule your next visit with a doctor",
    },
    prescriptions: {
      title: "Prescriptions",
      sub: "Your active medications and refill requests",
    },
    documents: {
      title: "Medical Documents",
      sub: "Lab results, reports, and uploaded files",
    },
    messages: {
      title: "Messages",
      sub: "Secure communication with your care team",
    },
    "care-team": {
      title: "Care Team",
      sub: "Doctors and coordinators managing your care",
    },
    billing: {
      title: "Billing & Insurance",
      sub: "Invoices, payments, and insurance details",
    },
  };

  const pageComponents = {
    overview: (
      <OverviewPage onBookAppointment={() => setActivePage("appointments")} />
    ),
    appointments: (
      <AppointmentsPage onBookNew={() => setActivePage("book-appointment")} />
    ),
    "book-appointment": (
      <BookAppointmentPage
        onBookingComplete={() => setActivePage("appointments")}
      />
    ),
    prescriptions: <PrescriptionsPage />,
    documents: <DocumentsPage />,
    messages: <MessagesPage />,
    "care-team": <CareTeamPage />,
    billing: <BillingPage />,
  };

  const meta = pageMeta[activePage];

  // Get first name for greeting
  const firstName = profile?.fullName?.split(" ")[0] || "Guest";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        patientData={patientData}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
          <div className="px-8 py-6 flex items-end justify-between">
            <div>
              <h1
                className={`text-3xl font-semibold text-[#1e293b]`}
                style={{ fontFamily: "Fraunces, serif" }}
              >
                {activePage === "overview" ? (
                  <>
                    Good morning,{" "}
                    <span className="text-[#2563eb]">{firstName}</span> 🌿
                  </>
                ) : (
                  meta.title
                )}
              </h1>
              <p className="text-sm text-gray-600 mt-1">{meta.sub}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Action Buttons */}
              {activePage === "appointments" && (
                <Button
                  variant="primary"
                  onClick={() => setActivePage("book-appointment")}
                >
                  📅 Book Appointment
                </Button>
              )}
              {activePage === "book-appointment" && (
                <Button
                  variant="outline"
                  onClick={() => setActivePage("appointments")}
                >
                  ← Back to Appointments
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setIsProfileModalOpen(true)}
              >
                👤 Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">{pageComponents[activePage]}</div>
      </main>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default PatientDashboard;
