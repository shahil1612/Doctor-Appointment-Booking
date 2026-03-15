import Card from "../../ui/Card";

const MessagesPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title subtitle="Secure messages from your care team">
            Messages
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="text-center py-8">
            <div className="text-4xl mb-3">💬</div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              No messages
            </h4>
            <p className="text-xs text-gray-600">
              Messages from your care team will appear here
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default MessagesPage;
