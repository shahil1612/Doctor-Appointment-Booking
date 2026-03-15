import Card from "./ui/Card";
import Button from "./ui/Button";

const DocumentItem = ({ document }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50 transition-all">
      <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-base">
        {document.icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-[#1e293b]">
          {document.name}
        </h4>
        <p className="text-xs text-gray-500">{document.meta}</p>
      </div>
      <div className="text-xs text-gray-500 font-mono">{document.size}</div>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm">
          👁 View
        </Button>
        <Button variant="ghost" size="sm">
          ⬇
        </Button>
      </div>
    </div>
  );
};

const DocumentsList = ({ documents, title, subtitle, showUpload }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title subtitle={subtitle}>{title}</Card.Title>
        <Card.Link>Upload</Card.Link>
      </Card.Header>
      {showUpload && (
        <div className="mx-4 mt-4">
          <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-[#60a5fa] hover:bg-white/5 transition-all">
            <div className="text-3xl mb-2">📤</div>
            <p className="text-sm text-white font-medium">
              Drop files here or click to upload
            </p>
            <p className="text-xs text-white/60 mt-1">
              PDF, JPG, PNG · Max 20MB
            </p>
          </div>
        </div>
      )}
      <Card.Content className="space-y-2">
        {documents.map((doc) => (
          <DocumentItem key={doc.id} document={doc} />
        ))}
      </Card.Content>
    </Card>
  );
};

export default DocumentsList;
