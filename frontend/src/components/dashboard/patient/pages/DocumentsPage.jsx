import Card from "../../ui/Card";

const DocumentsPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title subtitle="Reports, test results & records">
            Medical Documents
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📁</div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              No documents
            </h4>
            <p className="text-xs text-gray-600">
              Your medical documents will appear here
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default DocumentsPage;
