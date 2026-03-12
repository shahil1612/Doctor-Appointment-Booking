// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Star,
  Activity,
  CheckCircle,
  Award,
  Briefcase,
  MapPin,
  FileText,
  Video,
} from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import StatsGrid from "./StatsGrid";
import AppointmentsList from "./AppointmentsList";
import PatientsList from "./PatientsList";

const DoctorDashboard = () => {
  // Mock data - replace with API calls
  const doctorInfo = {
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    experience: "12 years",
    rating: 4.8,
    totalReviews: 324,
    license: "MD-2024-567890",
    email: "dr.sarah@sehat.com",
    phone: "+1 (555) 123-4567",
    location: "New York Medical Center",
  };

  const stats = [
    {
      id: 1,
      label: "Today's Appointments",
      value: "8",
      change: "+2 from yesterday",
      icon: Calendar,
      color: "blue",
      trend: "up",
    },
    {
      id: 2,
      label: "Total Patients",
      value: "1,284",
      change: "+48 this month",
      icon: Users,
      color: "green",
      trend: "up",
    },
    {
      id: 3,
      label: "Patient Satisfaction",
      value: "96%",
      change: "+3% this quarter",
      icon: Star,
      color: "yellow",
      trend: "up",
    },
    {
      id: 4,
      label: "Revenue This Month",
      value: "$48,290",
      change: "+12% from last month",
      icon: TrendingUp,
      color: "purple",
      trend: "up",
    },
  ];

  const todayAppointments = [
    {
      id: 1,
      patientName: "John Doe",
      time: "09:00 AM",
      type: "Check-up",
      status: "confirmed",
      avatar: "JD",
      condition: "Regular checkup",
      notes: "Follow-up on blood pressure",
    },
    {
      id: 2,
      patientName: "Emma Wilson",
      time: "10:30 AM",
      type: "Consultation",
      status: "confirmed",
      avatar: "EW",
      condition: "Heart palpitations",
      notes: "First-time visit",
    },
    {
      id: 3,
      patientName: "Michael Brown",
      time: "11:45 AM",
      type: "Follow-up",
      status: "pending",
      avatar: "MB",
      condition: "Post-surgery checkup",
      notes: "2 weeks post-op",
    },
    {
      id: 4,
      patientName: "Sarah Davis",
      time: "02:00 PM",
      type: "Emergency",
      status: "urgent",
      avatar: "SD",
      condition: "Chest pain",
      notes: "Requires immediate attention",
    },
    {
      id: 5,
      patientName: "James Taylor",
      time: "03:30 PM",
      type: "Consultation",
      status: "confirmed",
      avatar: "JT",
      condition: "Annual physical",
      notes: "Complete health assessment",
    },
  ];

  const recentPatients = [
    {
      id: 1,
      name: "Alice Johnson",
      age: 45,
      lastVisit: "2 days ago",
      condition: "Hypertension",
      status: "stable",
    },
    {
      id: 2,
      name: "Robert Chen",
      age: 52,
      lastVisit: "1 week ago",
      condition: "Diabetes Type 2",
      status: "monitoring",
    },
    {
      id: 3,
      name: "Maria Garcia",
      age: 38,
      lastVisit: "3 days ago",
      condition: "Anxiety",
      status: "improving",
    },
    {
      id: 4,
      name: "David Kim",
      age: 60,
      lastVisit: "5 days ago",
      condition: "Heart Disease",
      status: "critical",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader doctorInfo={doctorInfo} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div>
          {/* Welcome Section */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-2">
                Welcome back, {doctorInfo.name.split(" ")[1]}! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                You have {todayAppointments.length} appointments scheduled today
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#1e3a5f] px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all"
              >
                <Video size={20} />
                Start Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-300 bg-white/80 hover:bg-white text-[#1e3a5f] px-6 py-3 rounded-lg font-bold text-sm transition-all flex items-center gap-2"
              >
                <Calendar size={20} />
                View Schedule
              </motion.button>
            </div>
          </div>

          {/* Stats Grid */}
          <StatsGrid stats={stats} />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column - Appointments */}
            <div className="lg:col-span-2 space-y-6">
              <AppointmentsList appointments={todayAppointments} />
            </div>

            {/* Right Column - Quick Info */}
            <div className="space-y-6">
              {/* Doctor Profile Card */}
              <div className="bg-white rounded-xl border-2 border-blue-500 shadow-lg overflow-hidden">
                <div className="bg-blue-600 p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold border-4 border-white/30">
                      {doctorInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{doctorInfo.name}</h3>
                      <p className="text-blue-100">
                        {doctorInfo.specialization}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-[#1e3a5f]">
                    <Award className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-semibold">{doctorInfo.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[#1e3a5f]">
                    <Star className="text-yellow-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <p className="font-semibold">
                        {doctorInfo.rating} / 5.0 ({doctorInfo.totalReviews}{" "}
                        reviews)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[#1e3a5f]">
                    <Briefcase className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">License</p>
                      <p className="font-semibold">{doctorInfo.license}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[#1e3a5f]">
                    <MapPin className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold">{doctorInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  <Activity className="text-blue-600" size={22} />
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed Today</span>
                    <span className="font-bold text-green-600">3 / 8</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "37.5%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Approvals</span>
                    <span className="font-bold text-orange-600">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Urgent Cases</span>
                    <span className="font-bold text-red-600">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Messages</span>
                    <span className="font-bold text-blue-600">12</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  <Clock className="text-blue-600" size={22} />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      action: "Completed consultation",
                      patient: "John Doe",
                      time: "20 mins ago",
                      icon: CheckCircle,
                      bgColor: "bg-green-100",
                      iconColor: "text-green-600",
                    },
                    {
                      action: "New appointment request",
                      patient: "Emma Wilson",
                      time: "1 hour ago",
                      icon: Calendar,
                      bgColor: "bg-blue-100",
                      iconColor: "text-blue-600",
                    },
                    {
                      action: "Prescription sent",
                      patient: "Michael Brown",
                      time: "2 hours ago",
                      icon: FileText,
                      bgColor: "bg-purple-100",
                      iconColor: "text-purple-600",
                    },
                    {
                      action: "Lab results received",
                      patient: "Sarah Davis",
                      time: "3 hours ago",
                      icon: Activity,
                      bgColor: "bg-orange-100",
                      iconColor: "text-orange-600",
                    },
                  ].map((activity, index) => {
                    const ActivityIcon = activity.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div
                          className={`w-8 h-8 rounded-full ${activity.bgColor} flex items-center justify-center shrink-0`}
                        >
                          <ActivityIcon
                            size={16}
                            className={activity.iconColor}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.patient}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {activity.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="mt-8">
            <PatientsList patients={recentPatients} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
