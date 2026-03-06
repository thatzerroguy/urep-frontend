import React, {ChangeEvent, useState} from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface TextFieldProps {
  type: 'text' | 'email' | 'password' | 'dropdown';
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
  required?: boolean;
  className?: string;
  error?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  options = [],
  required = false,
  className = '',
  error,
  id,
  name,
  disabled = false,
  readOnly = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderInput = () => {
    switch (type) {
      case 'dropdown':
        return (
          <select
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#277B12] ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${disabled || readOnly ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
            required={required}
            disabled={disabled || readOnly}
          >
            <option value="" disabled>
              {placeholder || 'Select an option'}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'password':
        return (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id={id}
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full px-4 py-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#277B12] ${
                error ? 'border-red-500' : 'border-gray-300'
              } ${disabled || readOnly ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        );
      case 'email':
        return (
          <input
            type="email"
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#277B12] ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${disabled || readOnly ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
          />
        );
      case 'text':
      default:
        return (
          <input
            type="text"
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#277B12] ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${disabled || readOnly ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm mt-3 font-medium text-black">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextField;