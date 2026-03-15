import { useState, useEffect } from "react";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

const EarningsPage = () => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch earnings data from backend
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Content className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">-</div>
            <div className="text-xs font-semibold text-gray-700">
              Total Earnings
            </div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">-</div>
            <div className="text-xs font-semibold text-gray-700">
              This Month
            </div>
            <p className="text-xs text-gray-500 mt-1">Current month</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">-</div>
            <div className="text-xs font-semibold text-gray-700">
              Pending Payouts
            </div>
            <p className="text-xs text-gray-500 mt-1">Awaiting transfer</p>
          </Card.Content>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <Card.Header>
          <Card.Title>Transaction History</Card.Title>
        </Card.Header>
        <Card.Content className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">No transactions yet</p>
          <p className="text-sm">
            Your earnings will appear here once you complete appointments
          </p>
        </Card.Content>
      </Card>

      {/* Payment Methods */}
      <Card>
        <Card.Header>
          <Card.Title>Payment Methods</Card.Title>
        </Card.Header>
        <Card.Content className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">No payment methods configured</p>
          <p className="text-sm">
            Add a payment method in settings to receive earnings
          </p>
        </Card.Content>
      </Card>
    </div>
  );
};

export default EarningsPage;
