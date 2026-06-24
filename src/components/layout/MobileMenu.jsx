import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { X, Calendar, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from '../../utils/routes';
import { CLINIC_INFO } from '../../utils/constants';
import Button from '../common/Button';

export const MobileMenu = ({ isOpen, onClose, links = [] }) => {
  const sidebarVariants = {
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 0.5 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
            className="absolute inset-0 bg-black"
          />

          {/* Drawer Panel */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-6 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <span className="text-lg font-bold text-gray-900 font-display">Menu</span>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-primary transition-all"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2">
                {links.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                        isActive
                          ? 'text-primary bg-primary/5'
                          : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Bottom Call-to-actions */}
            <div className="border-t border-gray-100 pt-6 flex flex-col gap-3">
              <a
                href={CLINIC_INFO.WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-base font-semibold transition-all shadow-sm"
              >
                <MessageSquare className="h-5 w-5 fill-current" />
                WhatsApp
              </a>
              <Link to={ROUTES.APPOINTMENT} onClick={onClose} className="w-full">
                <Button className="w-full py-3 shadow-md">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Appointment
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

export default MobileMenu;
