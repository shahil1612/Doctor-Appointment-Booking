// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const ScheduleCalendar = () => {
  // Mock calendar data
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const appointmentDays = [5, 8, 12, 15, 18, 22, 25, 28];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="text-blue-600" size={22} />
          Schedule Overview
        </h3>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-semibold px-4">March 2026</span>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        {daysInMonth.map((day) => (
          <motion.div
            key={day}
            whileHover={{ scale: 1.1 }}
            className={`aspect-square flex items-center justify-center rounded-lg text-sm cursor-pointer transition-all ${
              appointmentDays.includes(day)
                ? "bg-blue-600 text-white font-bold shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            } ${day === 7 ? "bg-blue-100 text-blue-700 font-semibold ring-2 ring-blue-600" : ""}`}
          >
            {day}
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span className="text-gray-600">Has Appointments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-100 border-2 border-blue-600 rounded"></div>
            <span className="text-gray-600">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;
