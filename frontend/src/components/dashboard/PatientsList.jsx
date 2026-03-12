// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Activity,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

const PatientsList = ({ patients }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "stable":
        return { color: "green", label: "Stable", dot: "bg-green-500" };
      case "monitoring":
        return { color: "blue", label: "Monitoring", dot: "bg-blue-500" };
      case "improving":
        return { color: "yellow", label: "Improving", dot: "bg-yellow-500" };
      case "critical":
        return { color: "red", label: "Critical", dot: "bg-red-500" };
      default:
        return { color: "gray", label: "Unknown", dot: "bg-gray-500" };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-linear-to-r from-blue-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#1e3a5f] flex items-center gap-2">
              👥 Recent Patients
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Latest patient interactions and updates
            </p>
          </div>
          <button className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
            View All Patients
          </button>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {patients.map((patient, index) => {
          const statusConfig = getStatusConfig(patient.status);

          return (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-2xl hover:border-blue-300 transition-all group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0">
                  <User size={24} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base font-bold text-[#1e3a5f]">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Age: {patient.age}
                      </p>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical size={16} className="text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Activity size={14} />
                      <span className="text-sm">{patient.condition}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} />
                      <span className="text-sm">
                        Last visit: {patient.lastVisit}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${statusConfig.dot}`}
                      ></div>
                      <span
                        className={`text-xs font-semibold text-${statusConfig.color}-700`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>
                    <button className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:gap-2 transition-all">
                      View Profile
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientsList;
