import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="input-group">

      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div className={`input-wrapper ${error ? "input-error" : ""}`}>

        {Icon && (
          <div className="input-icon">
            <Icon size={20} />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="glass-input"
        />

        {type === "password" && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}

      </div>

      {error && (
        <p className="input-error-text">
          {error}
        </p>
      )}

    </div>
  );
}

export default Input;