export const SearchChips = ({ currentType, onSelect }) => {
  const chips = ['Mobile Number', 'Child Name', 'Parent Name', 'Patient ID'];

  return (
    <div className="flex flex-wrap items-center gap-2 select-none">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-display mr-1">
        Common searches:
      </span>
      {chips.map((type) => {
        const isActive = currentType === type;
        return (
          <button
            key={type}
            type="button"
            onClick={() => onSelect(type)}
            className={`px-3 py-1 rounded-xl text-[10px] font-black border transition-all duration-200 cursor-pointer font-display ${
              isActive
                ? 'bg-purple-500/10 text-purple-600 border-purple-200 shadow-sm'
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
            }`}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
};

export default SearchChips;
