const DottedBackground = ({
  children,
  className = "",
  dotColor = "rgba(30, 58, 95, 0.1)",
  dotSize = "20px",
}) => {
  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
        backgroundSize: `${dotSize} ${dotSize}`,
      }}
    >
      {children}
    </div>
  );
};

export default DottedBackground;
