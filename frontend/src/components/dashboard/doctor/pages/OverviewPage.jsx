import { useState, useEffect } from "react";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

const OverviewPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch doctor statistics from backend
    // For now, just set loading to false
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <Card.Content className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">-</div>
            <div className="text-xs font-semibold text-gray-700">
              Today's Appointments
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">-</div>
            <div className="text-xs font-semibold text-gray-700">
              Total Patients
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-1">-</div>
            <div className="text-xs font-semibold text-gray-700">Rating</div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">-</div>
            <div className="text-xs font-semibold text-gray-700">
              Total Earnings
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Upcoming Appointments Section */}
      <Card>
        <Card.Header>
          <Card.Title>Upcoming Appointments</Card.Title>
        </Card.Header>
        <Card.Content className="text-center py-8 text-gray-500">
          No appointments to display
        </Card.Content>
      </Card>

      {/* Recent Reviews Section */}
      <Card>
        <Card.Header>
          <Card.Title>Recent Reviews</Card.Title>
        </Card.Header>
        <Card.Content className="text-center py-8 text-gray-500">
          No reviews to display
        </Card.Content>
      </Card>
    </div>
  );
};

export default OverviewPage;
