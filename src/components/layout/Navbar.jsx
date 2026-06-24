import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle, Menu, X } from 'lucide-react';
import { ROUTES } from '../../utils/routes';
import { CLINIC_INFO } from '../../utils/constants';
import { useAppointmentModal } from '../../context/AppointmentModalContext';

export const Navbar = ({ isHome }) => {
  const location = useLocation();
  const { openModal } = useAppointmentModal();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to apply glassmorphism style to sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'About Us', path: ROUTES.ABOUT },
    { name: 'Programs', path: ROUTES.PROGRAMS },
    { name: 'Success Stories', path: ROUTES.SUCCESS_STORIES },
    { name: 'Doctor', path: ROUTES.DOCTOR },
    { name: 'Blog', path: ROUTES.BLOG },
  ];

  const isActive = (linkPath) => {
    // Exact match for Home page
    if (linkPath === ROUTES.HOME) {
      return location.pathname === linkPath;
    }
    // Match base path for other routes
    return location.pathname.startsWith(linkPath.split('?')[0]);
  };

  // Determine navbar container styling based on page context (Home vs other pages) and scroll state
  const headerClass = isHome
    ? (isScrolled
        ? 'fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-150 py-3 transition-all duration-300'
        : 'absolute top-0 left-0 w-full z-50 bg-transparent py-5 transition-all duration-300')
    : 'sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-150 py-3 w-full transition-all duration-300';

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Left */}
          <Link to={ROUTES.HOME} className="flex items-center gap-3 group relative z-50">
            <div className="flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <svg width="46" height="46" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                {/* Trunk */}
                <path d="M48 78 C 48 62, 44 56, 42 46 C 46 49, 54 49, 58 46 C 56 56, 52 62, 52 78 Z" fill="#8D6E63" />
                <path d="M36 78 C 42 76, 58 76, 64 78 C 58 81, 42 81, 36 78 Z" fill="#70574E" />
                {/* Foliage Circles */}
                <circle cx="36" cy="42" r="15" fill="#3B8A4C" opacity="0.9" />
                <circle cx="64" cy="42" r="15" fill="#F57C00" opacity="0.9" />
                <circle cx="50" cy="30" r="17" fill="#1E88E5" opacity="0.9" />
                {/* Soft colorful blooms */}
                <circle cx="34" cy="32" r="6" fill="#EC407A" opacity="0.95" />
                <circle cx="66" cy="32" r="6" fill="#FFCA28" opacity="0.95" />
                <circle cx="50" cy="50" r="8" fill="#AB47BC" opacity="0.9" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold tracking-tight text-slate-800 font-display leading-tight group-hover:text-[#3B8A4C] transition-colors duration-200">
                {CLINIC_INFO.NAME}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider leading-none mt-0.5">
                Child Development Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg ${
                    active ? 'text-[#3B8A4C]' : 'text-slate-600 hover:text-[#3B8A4C] hover:bg-slate-100/50'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[#3B8A4C] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openModal()}
              className="bg-[#3B8A4C] hover:bg-[#327540] text-white font-semibold text-sm px-5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </motion.button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-slate-600 hover:text-[#3B8A4C] p-2 focus:outline-none relative z-50 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-b border-gray-150 absolute top-full left-0 right-0 shadow-lg z-40 overflow-hidden text-left"
          >
            <div className="px-4 pt-4 pb-6 space-y-2 max-w-7xl mx-auto">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                        active
                          ? 'text-[#3B8A4C] bg-[#3B8A4C]/5'
                          : 'text-slate-600 hover:text-[#3B8A4C] hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <a
                  href={CLINIC_INFO.WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-full text-base font-semibold transition-all shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Talk on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openModal();
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-[#3B8A4C] hover:bg-[#327540] text-white py-3.5 rounded-full text-base font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
