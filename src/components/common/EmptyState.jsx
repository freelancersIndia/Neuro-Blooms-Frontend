import React from 'react';
import PropTypes from 'prop-types';
import { ClipboardList } from 'lucide-react';

export const EmptyState = ({
  title = 'No items found',
  description = 'We couldn\'t find any records matching your request.',
  icon: Icon = ClipboardList,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-12 text-center bg-gray-50 border border-dashed border-gray-200 rounded-xl my-6 ${className}`}
    >
      <Icon className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-semibold text-gray-800 mb-1 font-display">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.elementType,
  className: PropTypes.string,
};

export default EmptyState;
