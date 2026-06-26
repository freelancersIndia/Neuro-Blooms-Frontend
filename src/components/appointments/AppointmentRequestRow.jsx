import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import RequestQuickActions from './RequestQuickActions';
import { CONCERN_STYLES } from '../../constants/primaryConcerns';

export const AppointmentRequestRow = ({ request, onView, onApprove, onReject }) => {
  const concernStyle = CONCERN_STYLES[request.primaryConcern] || CONCERN_STYLES.Other;

  return (
    <tr
      onClick={onView}
      className="group border-b border-slate-100 hover:bg-[#F8FAFC]/50 transition-colors duration-150 cursor-pointer select-none"
    >
      {/* Request ID */}
      <td className="px-5 py-4.5 text-xs font-black text-slate-800 tracking-tight font-display">
        {request.id}
      </td>

      {/* Parent Info */}
      <td className="px-5 py-4.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 overflow-hidden border border-slate-100 flex-shrink-0 shadow-sm">
            <img
              src={request.parentAvatar}
              alt={request.parentName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="text-xs font-black text-slate-800 leading-snug truncate">
              {request.parentName}
            </span>
            <span className="text-[10px] font-bold text-slate-400 leading-none mt-0.5">
              {request.relationship}
            </span>
          </div>
        </div>
      </td>

      {/* Child Info */}
      <td className="px-5 py-4.5">
        <div className="flex flex-col text-left">
          <span className="text-xs font-black text-slate-800 leading-snug">
            {request.childName}
          </span>
          <span className="text-[10px] font-bold text-slate-400 leading-none mt-0.5">
            Age: {request.childAge} • {request.childGender}
          </span>
        </div>
      </td>

      {/* Primary Concern */}
      <td className="px-5 py-4.5 text-left">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-black border tracking-wide font-display ${concernStyle.bg} ${concernStyle.text}`}
        >
          {request.primaryConcern}
        </span>
      </td>

      {/* Preferred Appointment */}
      <td className="px-5 py-4.5">
        <div className="flex flex-col text-left gap-1">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 font-display">
            <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{request.preferredDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 leading-none">
            <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{request.preferredTime}</span>
          </div>
        </div>
      </td>

      {/* Submitted On */}
      <td className="px-5 py-4.5 text-left">
        <span className="text-[10px] font-bold text-slate-400 tracking-tight">
          {request.submittedAt}
        </span>
      </td>

      {/* Status */}
      <td className="px-5 py-4.5 text-left">
        <AppointmentStatusBadge status={request.status} />
      </td>

      {/* Actions */}
      <td className="px-5 py-4.5">
        <RequestQuickActions
          onView={onView}
          onApprove={onApprove}
          onReject={onReject}
        />
      </td>
    </tr>
  );
};

export default AppointmentRequestRow;
