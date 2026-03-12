// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatsGrid = ({ stats }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      icon: "bg-blue-600",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    green: {
      bg: "bg-green-50",
      icon: "bg-green-600",
      text: "text-green-600",
      border: "border-green-200",
    },
    yellow: {
      bg: "bg-yellow-50",
      icon: "bg-yellow-600",
      text: "text-yellow-600",
      border: "border-yellow-200",
    },
    purple: {
      bg: "bg-purple-50",
      icon: "bg-purple-600",
      text: "text-purple-600",
      border: "border-purple-200",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const colors = colorClasses[stat.color];
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.id * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl border-2 border-blue-500 p-6 hover:shadow-2xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center`}
              >
                <Icon size={24} className="text-white" />
              </div>
              {stat.trend && (
                <div
                  className={`flex items-center gap-1 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                </div>
              )}
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-[#1e3a5f] mb-2">
                {stat.value}
              </p>
              <p className={`text-sm ${colors.text} font-medium`}>
                {stat.change}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
