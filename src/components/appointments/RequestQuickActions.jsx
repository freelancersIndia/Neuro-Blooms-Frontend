import { Eye } from 'lucide-react';

export const RequestQuickActions = ({ onView }) => {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* View Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onView();
        }}
        className="group relative w-10 h-10 rounded-xl bg-blue-50/40 hover:bg-blue-500/10 text-blue-500 border border-blue-100/40 hover:border-blue-200/50 flex items-center justify-center cursor-pointer transition-all duration-200"
        title="View Details"
        aria-label="View request details"
      >
        <Eye className="w-4 h-4 transition-transform group-hover:scale-108" />
        
        {/* Tooltip */}
        <span className="absolute bottom-11 scale-0 group-hover:scale-100 bg-slate-800 text-white text-[9px] font-black px-2 py-1.5 rounded-lg shadow-md transition-all duration-150 origin-bottom whitespace-nowrap z-30 font-display border border-slate-700/80">
          View Details
        </span>
      </button>
    </div>
  );
};

export default RequestQuickActions;
