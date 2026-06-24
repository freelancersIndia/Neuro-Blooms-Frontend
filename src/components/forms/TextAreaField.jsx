import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

export const TextAreaField = forwardRef(({
  label,
  name,
  error,
  placeholder = '',
  rows = 4,
  className = '',
  required = false,
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col w-full gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={name}
        name={name}
        placeholder={placeholder}
        rows={rows}
        className={`px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 transition-all resize-none ${
          error ? 'border-red-300 focus:ring-red-200 focus:border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-red-600 mt-0.5">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

TextAreaField.displayName = 'TextAreaField';

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
  required: PropTypes.bool,
};

export default TextAreaField;
