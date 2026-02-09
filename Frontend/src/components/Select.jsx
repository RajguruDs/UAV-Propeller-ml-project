export default function Select({
  label,
  options,
  value,
  onChange,
  placeholder,
  helperText,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-[#1f2937]">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all bg-white cursor-pointer"
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options &&
          options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
      </select>

      {helperText && (
        <span className="text-xs text-gray-500">
          {helperText}
        </span>
      )}
    </div>
  );
}



