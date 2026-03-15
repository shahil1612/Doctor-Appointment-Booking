import { Bell, Settings, LogOut, Search } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../store/authSlice";

const DashboardHeader = ({ doctorInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      message: "New appointment request from Emma Wilson",
      time: "5 mins ago",
      unread: true,
    },
    {
      id: 2,
      message: "Lab results available for John Doe",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      message: "Prescription refill request from Sarah Davis",
      time: "2 hours ago",
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-[#000000] text-white sticky top-0 z-50 border-b border-white/6">
      <div className="container mx-auto px-6 py-3 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/sehat-logo.png"
              alt="Sehat Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold">Sehat</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search patients, appointments, reports..."
                className="w-full pl-12 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Bell size={22} className="text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                >
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    <p className="text-sm text-gray-500">
                      You have {unreadCount} unread messages
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                          notification.unread ? "bg-blue-50" : ""
                        }`}
                      >
                        <p className="text-sm text-gray-900 font-medium">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-gray-50 text-center">
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Settings size={22} className="text-white" />
            </motion.button>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {doctorInfo.name}
                </p>
                <p className="text-xs text-gray-500">
                  {doctorInfo.specialization}
                </p>
              </div>
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                {doctorInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>

            {/* Logout */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 rounded-xl transition-colors group"
              title="Logout"
            >
              <LogOut
                size={22}
                className="text-gray-700 group-hover:text-red-600"
              />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
