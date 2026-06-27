import { useState } from 'react';
import { Search } from 'lucide-react';
import SearchChips from './SearchChips';

export const ManualPatientSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('Mobile Number');

  // Change placeholder based on search type
  const getPlaceholder = () => {
    switch (searchType) {
      case 'Mobile Number':
        return 'Enter mobile number...';
      case 'Child Name':
        return "Enter child's first or last name...";
      case 'Parent Name':
        return "Enter parent's first or last name...";
      case 'Patient ID':
        return 'Enter patient ID (e.g. P000124)...';
      default:
        return 'Search by name, mobile number or patient ID...';
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    onSearch({ searchQuery: searchQuery.trim(), searchType });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  // Reset query on type switch to keep it clean, or keep it. Let's keep it but update focus
  const handleSelectType = (type) => {
    setSearchType(type);
    setSearchQuery('');
  };

  return (
    <div className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgba(79,94,84,0.015)] flex flex-col gap-5 select-none">
      <h3 className="text-sm font-extrabold text-slate-800 tracking-tight text-left font-display">
        Search Existing Patients Manually
      </h3>

      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
        {/* Main Search Input Container */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholder()}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 focus:border-purple-500/50 focus:bg-white rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-200"
          />
        </div>

        {/* Dropdown Choice */}
        <div className="relative">
          <select
            value={searchType}
            onChange={(e) => handleSelectType(e.target.value)}
            className="w-full sm:w-44 px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 focus:border-purple-500/50 focus:bg-white rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer appearance-none transition-all duration-200 font-display"
          >
            <option value="Mobile Number">Mobile Number</option>
            <option value="Child Name">Child Name</option>
            <option value="Parent Name">Parent Name</option>
            <option value="Patient ID">Patient ID</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
            {/* Custom down arrow */}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Search Action Button */}
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition-colors duration-150 font-display flex items-center justify-center gap-1.5"
        >
          <Search className="w-3.5 h-3.5 stroke-[2.5px]" />
          <span>Search</span>
        </button>
      </form>

      {/* Common search tags */}
      <SearchChips currentType={searchType} onSelect={handleSelectType} />
    </div>
  );
};

export default ManualPatientSearch;
