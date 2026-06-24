import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '../../utils/routes';

const PROGRAMS = [
  { name: 'Autism Support', path: '/services/asd-diagnostics' },
  { name: 'ADHD Support', path: ROUTES.PROGRAMS },
  { name: 'Speech & Language Development', path: '/services/speech-language-therapy' },
  { name: 'Developmental Assessments', path: ROUTES.PROGRAMS },
  { name: 'Early Intervention Programs', path: ROUTES.PROGRAMS },
  { name: 'Parent Coaching Program', path: ROUTES.PROGRAMS },
  { name: 'Behavioral Support', path: ROUTES.PROGRAMS },
  { name: 'Learning Difficulties Support', path: ROUTES.PROGRAMS },
];

export const FooterPrograms = () => {
  return (
    <div className="flex flex-col text-left select-none">
      <h4 className="text-sm font-black text-slate-800 font-display uppercase tracking-wider mb-5 pb-1 border-b-2 border-[#3B8A4C]/25 max-w-[130px]">
        Programs & Services
      </h4>
      <ul className="space-y-3">
        {PROGRAMS.map((prog, idx) => (
          <li key={idx}>
            <Link
              to={prog.path}
              className="group flex items-center gap-1.5 text-xs sm:text-[13px] text-slate-500 hover:text-[#3B8A4C] font-semibold transition-colors duration-200"
            >
              <ChevronRight className="w-3.5 h-3.5 text-[#3B8A4C]/60 group-hover:text-[#3B8A4C] transition-transform duration-200 transform group-hover:translate-x-0.5" />
              <span>{prog.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default FooterPrograms;
