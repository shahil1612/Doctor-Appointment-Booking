const SummaryCard = ({ icon, value, label, subtitle, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    green: "bg-green-100 text-green-700",
    rose: "bg-rose-100 text-rose-700",
    indigo: "bg-indigo-100 text-indigo-700",
  };

  const cardColorClasses = {
    blue: "hover:border-blue-300",
    amber: "hover:border-amber-300",
    green: "hover:border-green-300",
    rose: "hover:border-rose-300",
    indigo: "hover:border-indigo-300",
  };

  const colorClass = colorClasses[color] || colorClasses.blue;
  const cardClass = cardColorClasses[color] || cardColorClasses.blue;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:shadow-lg ${cardClass} transition-all hover:-translate-y-1`}
    >
      <div
        className={`${colorClass} w-10 h-10 rounded-lg flex items-center justify-center text-2xl mb-3`}
      >
        {icon}
      </div>
      <div
        className="text-3xl font-bold text-[#1e293b] mb-1"
        style={{ fontFamily: "Fraunces, serif" }}
      >
        {value}
      </div>
      <div className="text-xs font-semibold text-gray-700">{label}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
};

const SummaryCards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  );
};

export default SummaryCards;
