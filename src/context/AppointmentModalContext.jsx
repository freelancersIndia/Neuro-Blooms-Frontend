import React, { createContext, useContext, useState } from 'react';

const AppointmentModalContext = createContext();

export const AppointmentModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Track globally selected details to allow opening with pre-selected data if needed
  const [preselectedData, setPreselectedData] = useState(null);

  const openModal = (data = null) => {
    setPreselectedData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPreselectedData(null);
  };

  return (
    <AppointmentModalContext.Provider value={{ isOpen, openModal, closeModal, preselectedData }}>
      {children}
    </AppointmentModalContext.Provider>
  );
};

export const useAppointmentModal = () => {
  const context = useContext(AppointmentModalContext);
  if (!context) {
    throw new Error('useAppointmentModal must be used within an AppointmentModalProvider');
  }
  return context;
};
