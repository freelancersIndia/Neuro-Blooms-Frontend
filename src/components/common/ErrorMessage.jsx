import React from 'react';
import PropTypes from 'prop-types';
import { AlertCircle } from 'lucide-react';
import Button from './Button';

export const ErrorMessage = ({
  message = 'Failed to load details. Please check your network connection.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center bg-red-50 border border-red-100 rounded-xl max-w-xl mx-auto my-6 ${className}`}
      role="alert"
    >
      <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
      <h3 className="text-lg font-semibold text-red-900 mb-1 font-display">Something went wrong</h3>
      <p className="text-sm text-red-700 mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="border-red-200 text-red-700 hover:bg-red-100">
          Try Again
        </Button>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
  className: PropTypes.string,
};

export default ErrorMessage;
