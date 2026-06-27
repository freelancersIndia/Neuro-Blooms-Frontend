import React from 'react';
import { Download, Plus, Upload } from 'lucide-react';

export const PatientsHeader = ({ onImport, onExport, onAddPatient, isExporting = false }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 select-none text-left">
      {/* Title & Breadcrumbs */}
      <div className="flex flex-col">
        <nav className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-display mb-1.5">
          Patients
        </nav>
        <h1 className="text-[34px] font-black text-slate-800 tracking-tight leading-none font-display">
          Patients
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-2">
          View, search and manage all patients in the system.
        </p>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onImport}
          className="h-12 border border-slate-200 hover:bg-slate-50 text-slate-600 px-5 rounded-[14px] text-xs font-black shadow-sm transition-all cursor-pointer font-display flex items-center gap-2 hover:border-slate-350"
        >
          <Upload className="w-4 h-4 text-slate-450" />
          <span>Import</span>
        </button>

        <button
          type="button"
          onClick={onExport}
          disabled={isExporting}
          className="h-12 border border-slate-200 hover:bg-slate-50 text-slate-600 px-5 rounded-[14px] text-xs font-black shadow-sm transition-all cursor-pointer font-display flex items-center gap-2 hover:border-slate-350 disabled:opacity-50"
        >
          <Download className="w-4 h-4 text-slate-450" />
          <span>{isExporting ? 'Exporting...' : 'Export'}</span>
        </button>

        <button
          type="button"
          onClick={onAddPatient}
          className="h-12 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 rounded-[14px] text-xs font-black shadow-md shadow-[#7C3AED]/15 hover:shadow-lg transition-all cursor-pointer font-display flex items-center gap-2"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add New Patient</span>
        </button>
      </div>
    </div>
  );
};

export default PatientsHeader;
