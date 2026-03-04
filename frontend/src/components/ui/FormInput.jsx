const FormInput = ({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  pattern,
  minLength,
  maxLength,
  min,
  max,
}) => {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"
            size={16}
          />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          min={min}
          max={max}
          className={`w-full bg-white/5 border border-white/10 rounded-lg ${
            Icon ? "pl-8" : "pl-2.5"
          } pr-2.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all ${
            type === "date" ? "scheme-dark" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default FormInput;
