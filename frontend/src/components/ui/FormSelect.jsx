const FormSelect = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  required = false,
  options = [],
  placeholder = "Select",
}) => {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10"
            size={16}
          />
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full bg-white/5 border border-white/10 rounded-lg ${
            Icon ? "pl-8" : "pl-2.5"
          } pr-2.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer`}
        >
          <option value="" className="bg-gray-900">
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value} className="bg-gray-900">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormSelect;
