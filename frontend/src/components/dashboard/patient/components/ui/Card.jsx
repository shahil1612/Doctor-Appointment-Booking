const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return (
    <div
      className={`px-5 py-4 border-b border-gray-200 flex items-center justify-between ${className}`}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ children, subtitle, className = "" }) => {
  return (
    <div className={className}>
      <h3
        className="text-base font-semibold text-[#1e293b]"
        style={{ fontFamily: "Fraunces, serif" }}
      >
        {children}
      </h3>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

const CardLink = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-medium text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-50 transition-all ${className}`}
    >
      {children}
    </button>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Link = CardLink;

export default Card;
