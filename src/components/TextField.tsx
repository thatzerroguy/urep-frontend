'use client';

import React, { ChangeEvent, useState } from 'react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';

interface TextFieldProps {
  type: 'text' | 'email' | 'password' | 'dropdown' | 'date' | 'number';
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
  hint?: string;
}

const baseInput =
  'w-full px-3 py-2.5 text-sm border rounded-lg bg-white transition-colors ' +
  'focus:outline-none focus:ring-1 focus:ring-[#277B12] focus:border-[#277B12] ' +
  'placeholder:text-gray-400';

const errorBorder = 'border-red-400';
const normalBorder = 'border-gray-300';
const disabledCls = 'bg-gray-50 text-gray-500 cursor-not-allowed';

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
  hint,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const borderCls = error ? errorBorder : normalBorder;
  const stateCls = disabled || readOnly ? disabledCls : '';

  const renderInput = () => {
    switch (type) {
      case 'dropdown':
        return (
          <div className="relative">
            <select
              id={id}
              name={name}
              value={value}
              onChange={handleChange}
              className={`${baseInput} ${borderCls} ${stateCls} appearance-none pr-9 truncate ${className}`}
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
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        );

      case 'password':
        return (
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id={id}
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className={`${baseInput} ${borderCls} ${stateCls} pr-10 ${className}`}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        );

      case 'date':
        return (
          <input
            type="date"
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            className={`${baseInput} ${borderCls} ${stateCls} ${className}`}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`${baseInput} ${borderCls} ${stateCls} ${className}`}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
          />
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
            className={`${baseInput} ${borderCls} ${stateCls} ${className}`}
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
            className={`${baseInput} ${borderCls} ${stateCls} ${className}`}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-1 mb-2.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span className="inline-block w-1 h-3 bg-red-500 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
};

export default TextField;
