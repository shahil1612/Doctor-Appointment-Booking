import Card from "../../ui/Card";

const CareTeamPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title subtitle="Doctors and coordinators assigned to you">
            Your Care Team
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="text-center py-8">
            <div className="text-4xl mb-3">👥</div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              No care team
            </h4>
            <p className="text-xs text-gray-600">
              Your care team will appear here once appointments are booked
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default CareTeamPage;
