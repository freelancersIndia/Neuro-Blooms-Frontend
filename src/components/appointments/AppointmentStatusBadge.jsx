import React from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { APPOINTMENT_STATUS, STATUS_STYLES } from '../../constants/appointmentStatus';

export const AppointmentStatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || STATUS_STYLES[APPOINTMENT_STATUS.PENDING];
  
  // Icon selector based on status
  const getIcon = () => {
    switch (status) {
      case APPOINTMENT_STATUS.APPROVED:
        return <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.25px]" />;
      case APPOINTMENT_STATUS.REJECTED:
        return <XCircle className="w-3.5 h-3.5 stroke-[2.25px]" />;
      case APPOINTMENT_STATUS.PENDING:
      default:
        return <Clock className="w-3.5 h-3.5 stroke-[2.25px]" />;
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border ${style.bg} ${style.text} select-none font-display`}
    >
      {getIcon()}
      <span>{style.label}</span>
    </span>
  );
};

export default AppointmentStatusBadge;
