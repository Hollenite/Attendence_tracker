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
    <div className="filter-bar">
      <div className="filter-group">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter-btn${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="divider" />

      <div className="toggle-group">
        <button
          className={`toggle-btn${showLowAttendance ? ' active' : ''}`}
          onClick={() => setShowLowAttendance((v) => !v)}
        >
          <span className="toggle-icon">⚠</span>
          {'<'} 75% Only
        </button>

        <button
          className={`toggle-btn${sortByAttendance ? ' sort-active' : ''}`}
          onClick={() => setSortByAttendance((v) => !v)}
        >
          <span className="toggle-icon">↕</span>
          Sort by %
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
