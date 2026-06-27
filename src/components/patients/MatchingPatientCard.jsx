import { Calendar, Phone, Eye, User } from 'lucide-react';
import { motion } from 'framer-motion';
import PatientMatchScore from './PatientMatchScore';

export const MatchingPatientCard = ({ patient, isBestMatch, onLink, onView }) => {
  const hasScore = patient.score !== null && patient.score !== undefined;

  // Confidence label color tier
  let labelBg = 'bg-orange-50 text-orange-700 border-orange-100';
  let labelText = 'Medium Match';
  let subText = 'Possible Match';
  let linkButtonClass = 'bg-purple-600 hover:bg-purple-700 text-white';

  if (!hasScore) {
    labelBg = 'bg-blue-50 text-blue-700 border-blue-100';
    labelText = 'Registry Record';
    subText = 'Manual Search';
    linkButtonClass = 'bg-purple-600 hover:bg-purple-700 text-white';
  } else if (patient.score >= 90) {
    labelBg = 'bg-emerald-50 text-emerald-700 border-emerald-100';
    labelText = 'Very High Match';
    subText = 'Best Match';
    linkButtonClass = 'bg-emerald-500 hover:bg-emerald-600 text-white';
  } else if (patient.score >= 70) {
    labelBg = 'bg-amber-50 text-amber-700 border-amber-100';
    labelText = 'High Match';
    subText = 'Possible Match';
    linkButtonClass = 'bg-purple-600 hover:bg-purple-700 text-white';
  }

  return (
    <motion.div
      whileHover={{ y: -2, shadow: '0 10px 25px -5px rgba(0,0,0,0.04)' }}
      className={`bg-white border rounded-[20px] p-5 flex flex-col lg:grid lg:grid-cols-12 items-stretch lg:items-center gap-5 transition-all duration-200 text-left select-none ${
        isBestMatch ? 'border-emerald-200 shadow-sm' : 'border-slate-100'
      }`}
    >
      {/* 1. Profile Avatar & Basic Child details */}
      <div className="flex items-center gap-4.5 min-w-0 lg:col-span-3">
        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
          <img
            src={patient.avatar}
            alt={patient.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
            }}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-black text-purple-600 tracking-wider font-display">
            {patient.id}
          </span>
          <h4 className="text-sm font-extrabold text-slate-800 tracking-tight mt-0.5 truncate font-display">
            {patient.name}
          </h4>
          <span className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1.5">
            <span className="capitalize">{patient.gender.toLowerCase()}</span>
            <span className="text-slate-200">•</span>
            <span>{patient.age}</span>
          </span>
        </div>
      </div>

      {/* 2. Parent Info */}
      <div className="flex flex-col justify-center min-w-0 lg:col-span-3">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-display">
          Parent
        </span>
        <span className="text-xs font-bold text-slate-700 mt-1 truncate">
          {patient.parentName} <span className="text-[10.5px] font-semibold text-slate-400">({patient.relationship})</span>
        </span>
        <span className="text-[10px] font-extrabold text-slate-400 mt-1.5 flex items-center gap-1">
          <Phone className="w-3 h-3 text-slate-300 flex-shrink-0" />
          <span className="truncate">{patient.parentPhone}</span>
        </span>
      </div>

      {/* 3. Date of Birth & Last Visit */}
      <div className="flex flex-row lg:flex-col gap-6 lg:gap-2.5 min-w-0 lg:col-span-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-display">
            DOB
          </span>
          <span className="text-xs font-bold text-slate-600 mt-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
            <span className="truncate">{patient.dob}</span>
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-display">
            Last Visit
          </span>
          <span className="text-xs font-bold text-slate-600 mt-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
            <span className="truncate">{patient.lastVisit}</span>
          </span>
        </div>
      </div>

      {/* 4. Match Score & Confidence Text */}
      <div className="flex items-center gap-3 min-w-0 lg:col-span-2 lg:justify-center">
        {hasScore ? (
          <PatientMatchScore score={patient.score} size={48} strokeWidth={4.5} />
        ) : (
          <div className="w-12 h-12 rounded-full border border-blue-100 bg-blue-50/60 flex items-center justify-center text-blue-600 flex-shrink-0">
            <User className="w-5.5 h-5.5 stroke-[2.25px]" />
          </div>
        )}
        <div className="flex flex-col text-left">
          <span className={`inline-flex items-center border px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wide font-display ${labelBg}`}>
            {labelText}
          </span>
          <span className="text-[9.5px] font-bold text-slate-400 mt-1 font-display">
            {subText}
          </span>
        </div>
      </div>

      {/* 5. Link & View Actions */}
      <div className="flex flex-row lg:flex-col items-center gap-2 w-full lg:w-full lg:col-span-2 lg:ml-auto select-none">
        <button
          type="button"
          onClick={() => onLink(patient)}
          className={`flex-1 lg:flex-none lg:w-full px-4 py-2 rounded-xl text-xs font-black shadow-sm cursor-pointer transition-colors font-display ${linkButtonClass}`}
        >
          Link Patient
        </button>
        <button
          type="button"
          onClick={() => onView(patient)}
          className="flex-1 lg:flex-none lg:w-full flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer font-display"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View</span>
        </button>
      </div>
    </motion.div>
  );
};

export default MatchingPatientCard;
