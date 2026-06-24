import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '../../utils/routes';

const LINKS = [
  { name: 'Home', path: ROUTES.HOME },
  { name: 'About Us', path: ROUTES.ABOUT },
  { name: 'Programs', path: ROUTES.PROGRAMS },
  { name: 'Success Stories', path: ROUTES.SUCCESS_STORIES },
  { name: 'Doctor', path: ROUTES.DOCTOR },
  { name: 'Blog', path: ROUTES.BLOG },
];

export const FooterLinks = () => {
  return (
    <div className="flex flex-col text-left select-none">
      <h4 className="text-sm font-black text-slate-800 font-display uppercase tracking-wider mb-5 pb-1 border-b-2 border-[#3B8A4C]/25 max-w-[80px]">
        Quick Links
      </h4>
      <ul className="space-y-3">
        {LINKS.map((link, idx) => (
          <li key={idx}>
            <Link
              to={link.path}
              className="group flex items-center gap-1.5 text-xs sm:text-[13px] text-slate-500 hover:text-[#3B8A4C] font-semibold transition-colors duration-200"
            >
              <ChevronRight className="w-3.5 h-3.5 text-[#3B8A4C]/60 group-hover:text-[#3B8A4C] transition-transform duration-200 transform group-hover:translate-x-0.5" />
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
