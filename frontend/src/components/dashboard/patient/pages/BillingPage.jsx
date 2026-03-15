import Card from "../components/ui/Card";

const BillingPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title subtitle="Invoices, payments, and insurance details">
            Billing & Insurance
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="text-center py-8">
            <div className="text-4xl mb-3">💳</div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              No billing information
            </h4>
            <p className="text-xs text-gray-600">
              Your billing and insurance information will appear here
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default BillingPage;
