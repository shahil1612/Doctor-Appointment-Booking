import Card from "../../ui/Card";

const PrescriptionItem = ({ prescription }) => {
  const isLow = prescription.status === "low";

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50 transition-all">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
          isLow ? "bg-yellow-100" : "bg-blue-100"
        }`}
      >
        {prescription.icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-[#1e293b]">
          {prescription.name}
        </h4>
        <p className="text-sm text-gray-600">{prescription.dose}</p>
        {prescription.prescribed && (
          <p className="text-xs text-gray-500 mt-1">
            Prescribed by {prescription.prescribed}
          </p>
        )}
      </div>
      <div className="text-right">
        <div
          className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
            isLow
              ? "bg-yellow-100 text-yellow-700 border border-yellow-200 cursor-pointer hover:bg-yellow-600 hover:text-white"
              : "bg-blue-100 text-blue-700 border border-blue-200"
          }`}
        >
          {isLow ? "⚡ Refill" : `${prescription.refills} refills`}
        </div>
        {prescription.status && (
          <p className="text-xs text-gray-500 mt-1">
            {isLow ? "Expiring soon" : "Active"}
          </p>
        )}
      </div>
    </div>
  );
};

const PrescriptionsList = ({
  prescriptions,
  title,
  subtitle,
  onRequestNew,
}) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title subtitle={subtitle}>{title}</Card.Title>
        {onRequestNew && (
          <Card.Link onClick={onRequestNew}>Request New</Card.Link>
        )}
      </Card.Header>
      <Card.Content className="space-y-3">
        {prescriptions.map((rx) => (
          <PrescriptionItem key={rx.id} prescription={rx} />
        ))}
      </Card.Content>
    </Card>
  );
};

export default PrescriptionsList;
