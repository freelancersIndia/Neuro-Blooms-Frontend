import React from 'react';
import PropTypes from 'prop-types';

export const AuthorInfo = ({ name, role, avatar }) => {
  return (
    <div className="flex items-center gap-3.5">
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
      />
      <div className="flex flex-col min-w-0">
        <span className="font-bold text-slate-800 text-sm sm:text-base leading-tight truncate font-display">
          {name}
        </span>
        <span className="text-slate-500 text-xs mt-0.5 font-medium leading-none">
          {role}
        </span>
      </div>
    </div>
  );
};

AuthorInfo.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default AuthorInfo;
