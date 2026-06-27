import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import PatientStatusBadge from './PatientStatusBadge';
import PatientActions from './PatientActions';

export const PatientRow = ({
  patient,
  isSelected,
  onSelect,
  onView,
  onStatusChange,
  onDelete
}) => {
  const avatarUrl = patient.gender === 'Female'
    ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  // Format age string (e.g. 3Y, 2M)
  const ageStr = `${patient.ageYears}Y, ${patient.ageMonths}M`;

  // Format last visit string
  let lastVisitFormatted = 'N/A';
  if (patient.lastVisit) {
    try {
      const date = new Date(patient.lastVisit);
      lastVisitFormatted = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {}
  }

  // Format next appointment string
  let nextApptDateFormatted = null;
  if (patient.nextAppointmentDate) {
    try {
      const date = new Date(patient.nextAppointmentDate);
      nextApptDateFormatted = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {}
  }

  return (
    <tr
      className={`border-b border-slate-100 hover:bg-sky-50/40 transition-colors group cursor-pointer ${
        isSelected ? 'bg-purple-50/15' : ''
      }`}
    >
      {/* 1. Checkbox Column */}
      <td className="p-4 align-middle pl-5" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(patient.id)}
          className="w-4.5 h-4.5 border border-slate-300 rounded focus:ring-[#7C3AED] text-[#7C3AED] focus:outline-none cursor-pointer"
        />
      </td>

      {/* 2. Patient ID */}
      <td className="p-4 align-middle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex-shrink-0">
            <img
              src={avatarUrl}
              alt={patient.childFirstName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[11px] font-black text-purple-600 tracking-wider font-display">
            {patient.id}
          </span>
        </div>
      </td>

      {/* 3. Child Name */}
      <td className="p-4 align-middle">
        <span className="text-sm font-extrabold text-slate-800 tracking-tight font-display group-hover:text-purple-700 transition-colors">
          {patient.childFirstName} {patient.childLastName}
        </span>
      </td>

      {/* 4. Age / Gender */}
      <td className="p-4 align-middle">
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-slate-700">{ageStr}</span>
          <span className="text-[10px] font-bold text-slate-400 mt-0.5">{patient.gender}</span>
        </div>
      </td>

      {/* 5. Parent / Guardian */}
      <td className="p-4 align-middle">
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-slate-700">
            {patient.parentFirstName} {patient.parentLastName}
          </span>
          <span className="text-[10px] font-bold text-slate-400 mt-0.5">{patient.relationship}</span>
        </div>
      </td>

      {/* 6. Phone Number */}
      <td className="p-4 align-middle">
        <span className="text-xs font-extrabold text-slate-600 flex items-center gap-1.5 font-display">
          <Phone className="w-3.5 h-3.5 text-slate-350" />
          <span>{patient.phone}</span>
        </span>
      </td>

      {/* 7. Status */}
      <td className="p-4 align-middle">
        <PatientStatusBadge status={patient.status} />
      </td>

      {/* 8. Last Visit */}
      <td className="p-4 align-middle">
        <span className="text-xs font-bold text-slate-600 font-display">
          {lastVisitFormatted}
        </span>
      </td>

      {/* 9. Next Appointment */}
      <td className="p-4 align-middle">
        {nextApptDateFormatted ? (
          <div className="flex flex-col text-left font-display">
            <span className="text-xs font-extrabold text-slate-700">{nextApptDateFormatted}</span>
            <span className="text-[10px] font-bold text-[#7C3AED] mt-0.5">{patient.nextAppointmentTime}</span>
          </div>
        ) : (
          <span className="text-xs font-bold text-slate-300 font-display">-</span>
        )}
      </td>

      {/* 10. Actions Menu */}
      <td className="p-4 align-middle pr-5" onClick={(e) => e.stopPropagation()}>
        <PatientActions
          patient={patient}
          onView={onView}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
};

export default PatientRow;
