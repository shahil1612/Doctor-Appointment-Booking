import Card from "../components/ui/Card";

const PrescriptionsPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title subtitle="Issued by your care team">
            Active Prescriptions
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="text-center py-8">
            <div className="text-4xl mb-3">💊</div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              No prescriptions
            </h4>
            <p className="text-xs text-gray-600">
              Your prescriptions will appear here when issued by your doctor
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default PrescriptionsPage;
