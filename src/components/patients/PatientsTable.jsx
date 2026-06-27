import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import PatientRow from './PatientRow';

export const PatientsTable = ({
  patients,
  selectedRows,
  onSelectRow,
  onSelectAll,
  sorting,
  onSort,
  onView,
  onStatusChange,
  onDelete
}) => {
  const allIds = patients.map((p) => p.id);
  const isAllSelected = allIds.length > 0 && selectedRows.length === allIds.length;

  const renderSortIcon = (field) => {
    if (sorting.sortBy !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-350" />;
    }
    return sorting.sortOrder === 'asc' 
      ? <ArrowUp className="w-3 h-3 text-purple-600" />
      : <ArrowDown className="w-3 h-3 text-purple-600" />;
  };

  const headers = [
    { label: 'Patient ID', field: 'id', sortable: true },
    { label: 'Child Name', field: 'childName', sortable: true },
    { label: 'Age / Gender', field: 'ageYears', sortable: true },
    { label: 'Parent / Guardian', field: 'parentFirstName', sortable: true },
    { label: 'Phone Number', field: 'phone', sortable: false },
    { label: 'Status', field: 'status', sortable: true },
    { label: 'Last Visit', field: 'lastVisit', sortable: true },
    { label: 'Next Appointment', field: 'nextAppointmentDate', sortable: true },
    { label: 'Actions', field: null, sortable: false }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-t-[20px] shadow-sm select-none overflow-x-auto w-full text-left">
      <table className="w-full border-collapse border-spacing-0">
        
        {/* Table Header Section */}
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            {/* Checkbox Header cell */}
            <th className="p-4 pl-5 w-12 align-middle text-left">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={() => onSelectAll(allIds)}
                className="w-4.5 h-4.5 border border-slate-300 rounded focus:ring-[#7C3AED] text-[#7C3AED] focus:outline-none cursor-pointer"
              />
            </th>

            {/* Custom Sorted Headers */}
            {headers.map((h, i) => {
              if (h.sortable) {
                return (
                  <th
                    key={h.label}
                    className="p-4 align-middle text-xs font-black text-slate-400 uppercase tracking-wider font-display cursor-pointer hover:bg-slate-100/50 transition-colors"
                    onClick={() => onSort(h.field)}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{h.label}</span>
                      {renderSortIcon(h.field)}
                    </div>
                  </th>
                );
              }
              return (
                <th
                  key={h.label || `header-col-${i}`}
                  className="p-4 align-middle text-xs font-black text-slate-400 uppercase tracking-wider font-display text-left"
                >
                  {h.label}
                </th>
              );
            })}
          </tr>
        </thead>

        {/* Table Body Content */}
        <tbody className="divide-y divide-slate-100">
          {patients.map((patient) => (
            <PatientRow
              key={patient.id}
              patient={patient}
              isSelected={selectedRows.includes(patient.id)}
              onSelect={onSelectRow}
              onView={onView}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default PatientsTable;
