function FilterBar({
  filter,
  setFilter,
  showLowAttendance,
  setShowLowAttendance,
  sortByAttendance,
  setSortByAttendance,
}) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'present', label: 'Present' },
    { key: 'absent', label: 'Absent' },
  ];

  return (
    <div className="flex items-center flex-wrap gap-3">
      {/* Filter buttons */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`px-4 py-2 text-sm font-medium rounded-md transition duration-150 cursor-pointer ${filter === f.key
                ? 'bg-gray-800 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Toggles */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition duration-150 cursor-pointer ${showLowAttendance
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-100'
            }`}
          onClick={() => setShowLowAttendance((v) => !v)}
        >
          <span>⚠</span>
          {'<'} 75% Only
        </button>

        <button
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition duration-150 cursor-pointer ${sortByAttendance
              ? 'bg-gray-800 text-white'
              : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-100'
            }`}
          onClick={() => setSortByAttendance((v) => !v)}
        >
          <span>↕</span>
          Sort by %
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
