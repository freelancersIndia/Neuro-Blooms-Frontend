import React from 'react';
import { BreakFormModal } from './BreakFormModal';

export const EditBreakModal = ({ isOpen, onClose, onSubmit, breakData, isSaving, isReadOnly, backendErrors }) => {
  return (
    <BreakFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      breakData={breakData}
      isSaving={isSaving}
      isReadOnly={isReadOnly}
      backendErrors={backendErrors}
      title={isReadOnly ? "View Clinic Break" : "Edit Clinic Break"}
    />
  );
};

export default EditBreakModal;
