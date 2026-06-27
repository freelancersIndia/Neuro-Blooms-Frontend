import React from 'react';
import { UserPlus, Upload, Download, MessageSquare } from 'lucide-react';

export const QuickActionsCard = ({ onAddPatient, onImport, onExport, onBulkComm }) => {
  const actions = [
    {
      label: 'Add New Patient',
      icon: UserPlus,
      handler: onAddPatient,
      colorClass: 'text-purple-600 hover:bg-purple-50/40 hover:text-purple-700'
    },
    {
      label: 'Import Patients',
      icon: Upload,
      handler: onImport,
      colorClass: 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
    },
    {
      label: 'Export Patient List',
      icon: Download,
      handler: onExport,
      colorClass: 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
    },
    {
      label: 'Bulk Communication',
      icon: MessageSquare,
      handler: onBulkComm,
      colorClass: 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
    }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-sm select-none text-left space-y-4">
      <h4 className="text-xs font-black text-slate-800 tracking-wider font-display uppercase border-b border-slate-50 pb-3">
        Quick Actions
      </h4>

      <div className="flex flex-col gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.label}
              type="button"
              onClick={act.handler}
              className={`w-full h-11 border border-slate-200 rounded-xl px-4 text-xs font-black tracking-tight font-display flex items-center gap-3 transition-all cursor-pointer ${act.colorClass}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActionsCard;
