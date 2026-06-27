import React from 'react';
import PatientFiltersCard from './PatientFiltersCard';
import PatientSummaryCard from './PatientSummaryCard';
import QuickActionsCard from './QuickActionsCard';
import SupportCard from './SupportCard';

export const PatientsSidebar = ({
  filters,
  stats,
  onApplyFilters,
  onResetFilters,
  onAddPatient,
  onImport,
  onExport,
  onBulkComm,
  onContactSupport
}) => {
  return (
    <div className="flex flex-col gap-6 sticky top-6 select-none">
      
      {/* 1. Filters Card */}
      <PatientFiltersCard
        filters={filters}
        onApply={onApplyFilters}
        onReset={onResetFilters}
      />

      {/* 2. Patient Distribution Summary */}
      <PatientSummaryCard stats={stats} />

      {/* 3. Quick Actions Card */}
      <QuickActionsCard
        onAddPatient={onAddPatient}
        onImport={onImport}
        onExport={onExport}
        onBulkComm={onBulkComm}
      />

      {/* 4. Support Footer Card */}
      <SupportCard onContactSupport={onContactSupport} />

    </div>
  );
};

export default PatientsSidebar;
