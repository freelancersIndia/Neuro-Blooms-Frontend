import { Calendar, Clock, ArrowRight } from 'lucide-react';
import AppointmentRequestRow from './AppointmentRequestRow';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import RequestQuickActions from './RequestQuickActions';
import { CONCERN_STYLES } from '../../constants/primaryConcerns';

export const AppointmentRequestsTable = ({ requests, onViewRequest, onApproveRequest, onRejectRequest }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-[20px] shadow-[0_12px_30px_rgba(79,94,84,0.015)] overflow-hidden select-none">
      
      {/* 1. DESKTOP VIEW: Data Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest font-display select-none">
              <th className="px-5 py-4">Request Number</th>
              <th className="px-5 py-4">Parent</th>
              <th className="px-5 py-4">Child</th>
              <th className="px-5 py-4">Primary Concern</th>
              <th className="px-5 py-4">Preferred Appointment</th>
              <th className="px-5 py-4">Submitted On</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50/80">
            {requests.map((request) => (
              <AppointmentRequestRow
                key={request.id}
                request={request}
                onView={() => onViewRequest(request)}
                onApprove={() => onApproveRequest(request)}
                onReject={() => onRejectRequest(request)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. MOBILE & TABLET VIEW: Stacked Cards */}
      <div className="flex flex-col md:hidden divide-y divide-slate-100 p-2">
        {requests.map((request) => {
          const concernStyle = CONCERN_STYLES[request.primaryConcern] || CONCERN_STYLES.Other;

          return (
            <div
              key={request.id}
              onClick={() => onViewRequest(request)}
              className="p-4 flex flex-col gap-4.5 hover:bg-slate-50/50 transition-colors active:bg-slate-50 cursor-pointer"
            >
              {/* Card Header: ID & Status */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 tracking-tight font-display">
                  {request.requestNumber || request.id}
                </span>
                <AppointmentStatusBadge status={request.status} />
              </div>

              {/* Parents & Child */}
              <div className="grid grid-cols-2 gap-3 text-left">
                {/* Parent */}
                <div className="flex items-center gap-2.5">
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-black text-slate-800 leading-snug truncate">
                      {request.parentName}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 leading-none">
                      {request.relationship}
                    </span>
                  </div>
                </div>

                {/* Child */}
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-black text-slate-800 leading-snug truncate">
                    {request.childName}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 leading-none mt-0.5">
                    Age: {request.childAge} • {request.childGender}
                  </span>
                </div>
              </div>

              {/* Concern & Date-time info */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[9px] font-black border tracking-wide font-display ${concernStyle.bg} ${concernStyle.text}`}
                >
                  {request.primaryConcern}
                </span>

                <div className="flex items-center gap-3 text-[10px] font-extrabold text-slate-500 font-display">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{request.preferredDate}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{request.preferredTime}</span>
                  </span>
                </div>
              </div>

              {/* Card Footer: Quick Actions */}
              <div className="flex items-center justify-between border-t border-slate-100/60 pt-3">
                <span className="text-[9px] font-bold text-slate-400">
                  Sub: {request.submittedAt.split(' ')[0]}
                </span>
                
                <div className="flex items-center gap-2">
                  <RequestQuickActions
                    onView={() => onViewRequest(request)}
                    onApprove={() => onApproveRequest(request)}
                    onReject={() => onRejectRequest(request)}
                  />
                  <div className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default AppointmentRequestsTable;
