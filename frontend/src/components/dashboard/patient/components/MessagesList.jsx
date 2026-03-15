import Card from "./ui/Card";
import Avatar from "./ui/Avatar";

const MessageItem = ({ message }) => {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
        message.unread
          ? "bg-blue-50 border-blue-200 shadow-sm"
          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
      }`}
    >
      <Avatar
        initials={message.initials}
        color={`bg-gradient-to-br ${message.color}`}
        size="md"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between mb-1">
          <h4 className="text-sm font-semibold text-[#1e293b]">
            {message.sender}
          </h4>
          <span className="text-xs text-gray-500 font-mono ml-2">
            {message.time}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{message.preview}</p>
      </div>
      {message.unread && (
        <div className="w-2 h-2 bg-blue-600 rounded-full shrink-0 mt-2"></div>
      )}
    </div>
  );
};

const MessagesList = ({ messages, title, subtitle, onCompose }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title subtitle={subtitle}>{title}</Card.Title>
        {onCompose && <Card.Link onClick={onCompose}>✏️ Compose</Card.Link>}
      </Card.Header>
      <Card.Content className="space-y-2">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
        {onCompose && (
          <button
            onClick={onCompose}
            className="w-full flex items-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-sm font-medium text-blue-600 transition-all"
          >
            <span>✏️</span>
            New Message to Care Team
          </button>
        )}
      </Card.Content>
    </Card>
  );
};

export default MessagesList;
