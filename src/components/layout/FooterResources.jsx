import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '../../utils/routes';
import { useAppointmentModal } from '../../context/AppointmentModalContext';

const RESOURCES = [
  { name: 'Blog', path: ROUTES.BLOG },
  { name: 'Success Stories', path: '/success-stories' },
  { name: 'FAQs', path: '/#faq' },
  { name: 'Book Appointment', path: 'modal' },
  { name: 'Doctor Profile', path: ROUTES.DOCTOR },
];

export const FooterResources = () => {
  const { openModal } = useAppointmentModal();

  return (
    <div className="flex flex-col text-left select-none">
      <h4 className="text-sm font-black text-slate-800 font-display uppercase tracking-wider mb-5 pb-1 border-b-2 border-[#3B8A4C]/25 max-w-[100px]">
        Resources
      </h4>
      <ul className="space-y-3">
        {RESOURCES.map((res, idx) => (
          <li key={idx}>
            {res.path === 'modal' ? (
              <button
                onClick={() => openModal()}
                className="group flex items-center gap-1.5 text-xs sm:text-[13px] text-slate-500 hover:text-[#3B8A4C] font-semibold transition-colors duration-200 border-none bg-transparent p-0 cursor-pointer text-left focus:outline-none"
              >
                <ChevronRight className="w-3.5 h-3.5 text-[#3B8A4C]/60 group-hover:text-[#3B8A4C] transition-transform duration-200 transform group-hover:translate-x-0.5" />
                <span>{res.name}</span>
              </button>
            ) : (
              <Link
                to={res.path}
                className="group flex items-center gap-1.5 text-xs sm:text-[13px] text-slate-500 hover:text-[#3B8A4C] font-semibold transition-colors duration-200"
              >
                <ChevronRight className="w-3.5 h-3.5 text-[#3B8A4C]/60 group-hover:text-[#3B8A4C] transition-transform duration-200 transform group-hover:translate-x-0.5" />
                <span>{res.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterResources;
