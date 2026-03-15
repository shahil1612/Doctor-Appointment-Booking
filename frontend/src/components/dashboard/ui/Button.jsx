const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 border-blue-600 shadow-md hover:shadow-lg",
    outline:
      "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 border-transparent",
    danger: "bg-red-500 text-white hover:bg-red-600 border-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg font-semibold border transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
