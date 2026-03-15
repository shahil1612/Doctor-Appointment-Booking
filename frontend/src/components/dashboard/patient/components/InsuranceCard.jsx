import Card from "../../ui/Card";

const InsuranceCard = ({ insuranceData, providers }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Insurance on File</Card.Title>
        <Card.Link>Update</Card.Link>
      </Card.Header>
      <Card.Content className="space-y-4">
        {/* Primary Insurance */}
        <div className="bg-[#60a5fa]/20 border border-[#60a5fa]/50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-[#60a5fa] mb-3 flex items-center gap-2">
            🛡️ Primary Insurance
          </h4>
          <div className="space-y-2">
            {insuranceData.map(([label, value]) => (
              <div key={label} className="flex justify-between text-xs">
                <span className="text-white/60">{label}</span>
                <span className="font-semibold text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preferred Providers */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            🏥 Preferred Providers
          </h4>
          <div className="space-y-2">
            {providers.map((provider) => (
              <div
                key={provider}
                className="text-xs text-white/70 py-2 border-b border-white/10 last:border-0"
              >
                ✓ {provider}
              </div>
            ))}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default InsuranceCard;
