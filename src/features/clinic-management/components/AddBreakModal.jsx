import React from 'react';
import { BreakFormModal } from './BreakFormModal';

export const AddBreakModal = ({ isOpen, onClose, onSubmit, isSaving, backendErrors }) => {
  return (
    <BreakFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isSaving={isSaving}
      backendErrors={backendErrors}
      title="Add Clinic Break"
    />
  );
};

export default AddBreakModal;
