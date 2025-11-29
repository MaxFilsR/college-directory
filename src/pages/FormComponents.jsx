// FormInput.jsx - Reusable Text Input Component
export const FormInput = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  error,
  touched,
  className = "",
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-text mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-colors bg-text ${
          error && touched
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-primary focus:border-primary"
        }`}
        placeholder={placeholder}
      />
      {error && touched && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// FormTextarea.jsx - Reusable Textarea Component
export const FormTextarea = ({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  error,
  touched,
  rows = 4,
  className = "",
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-text mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-colors bg-text ${
          error && touched
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-primary focus:border-primary"
        }`}
        placeholder={placeholder}
      />
      {error && touched && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// FormSelect.jsx - Reusable Select Component
export const FormSelect = ({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  required = false,
  error,
  touched,
  options = [],
  placeholder = "Select an option...",
  className = "",
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-text mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-colors bg-text  ${
          error && touched
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-primary focus:border-primary"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// FormImageInput.jsx - Reusable Image URL Input with Preview
export const FormImageInput = ({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  error,
  touched,
  previewStyle = "rectangular", // "rectangular" or "circular"
  className = "",
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-text mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-colors bg-text ${
          error && touched
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-primary focus:border-primary"
        }`}
        placeholder={placeholder}
      />
      {error && touched && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {value && !error && (
        <div className="mt-3">
          <p className="text-sm text-text mb-2">Preview:</p>
          <img
            src={value}
            alt="Preview"
            className={
              previewStyle === "circular"
                ? "w-32 h-32 object-cover rounded-full mx-auto"
                : "w-full h-48 object-cover rounded-lg"
            }
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}
    </div>
  );
};

// FormButton.jsx - Reusable Button Component
export const FormButton = ({
  type = "button",
  onClick,
  disabled = false,
  variant = "primary", // "primary", "secondary", "danger"
  children,
  className = "",
}) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-accent disabled:bg-gray-400",
    secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg transition-colors font-semibold disabled:cursor-not-allowed cursor-pointer ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// FormContainer.jsx - Reusable Form Container
export const FormContainer = ({ title, onBack, children, className = "" }) => {
  return (
    <div className={`min-h-screen bg-background py-12 w-full ${className}`}>
      <div className="max-w-[800px] mx-auto px-6">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 text-text hover:text-primary flex items-center gap-2 transition-colors"
          >
            <span className="text-xl">←</span> Back
          </button>
        )}

        <div className="bg-primary/15 rounded-xl shadow-xl p-8">
          {title && (
            <h1 className="text-3xl font-bold text-primary mb-6">{title}</h1>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
