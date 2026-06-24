import React from 'react';
import PropTypes from 'prop-types';

export const FormWrapper = ({
  children,
  onSubmit,
  title,
  description,
  submitLabel = 'Submit',
  isLoading = false,
  className = '',
}) => {
  return (
    <div className={`bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="bg-primary/5 px-6 py-6 border-b border-gray-100">
          {title && <h3 className="text-xl font-bold text-gray-900 font-display">{title}</h3>}
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
      )}
      <form onSubmit={onSubmit} className="p-6 space-y-6">
        {children}
      </form>
    </div>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  submitLabel: PropTypes.string,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default FormWrapper;
