// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Clock,
  Video,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Phone,
  MessageSquare,
  FileText,
} from "lucide-react";

const AppointmentsList = ({ appointments }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "confirmed":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
          icon: CheckCircle,
          label: "Confirmed",
        };
      case "pending":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          border: "border-yellow-200",
          icon: Clock,
          label: "Pending",
        };
      case "urgent":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          icon: AlertCircle,
          label: "Urgent",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          icon: Clock,
          label: "Unknown",
        };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-linear-to-r from-blue-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#1e3a5f] flex items-center gap-2">
              📅 Today's Appointments
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {appointments.length} appointments scheduled
            </p>
          </div>
          <button className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
            View Calendar
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="divide-y divide-gray-100">
        {appointments.map((appointment, index) => {
          const statusConfig = getStatusConfig(appointment.status);
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 hover:bg-gray-50 transition-all group"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {appointment.avatar}
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base font-bold text-[#1e3a5f]">
                        {appointment.patientName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {appointment.condition}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${statusConfig.bg} ${statusConfig.border} border`}
                    >
                      <StatusIcon size={14} className={statusConfig.text} />
                      <span
                        className={`text-xs font-semibold ${statusConfig.text}`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span className="text-sm font-medium">
                        {appointment.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText size={16} />
                      <span className="text-sm">{appointment.type}</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-3">
                      <p className="text-sm text-blue-900">
                        <span className="font-semibold">Note:</span>{" "}
                        {appointment.notes}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-[#1e3a5f] px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                      <Video size={16} />
                      Start Consultation
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-gray-300 bg-white/80 text-[#1e3a5f] px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                    >
                      <Phone size={16} />
                      Call
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-gray-300 bg-white/80 text-[#1e3a5f] px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                    >
                      <MessageSquare size={16} />
                      Message
                    </motion.button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto">
                      <MoreVertical size={18} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
        <button className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors">
          View All Appointments →
        </button>
      </div>
    </div>
  );
};

export default AppointmentsList;
