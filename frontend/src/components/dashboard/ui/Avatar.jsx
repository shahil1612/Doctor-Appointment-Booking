const Avatar = ({ initials, color, size = "md", online = false }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  return (
    <div className="relative inline-flex">
      <div
        className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold text-white ${color || "bg-gradient-to-br from-blue-400 to-blue-600"}`}
      >
        {initials}
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;
