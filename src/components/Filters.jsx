import { useState } from 'react';
import './Filters.css';

function Filters({
    filter,
    setFilter,
    showLowAttendance,
    setShowLowAttendance,
    sortOption,
    setSortOption,
    studentCount,
    setStudentCount,
}) {
    const [inputValue, setInputValue] = useState(String(studentCount));

    const filters = [
        { key: 'all', label: 'All' },
        { key: 'present', label: 'Present' },
        { key: 'absent', label: 'Absent' },
    ];

    const sortOptions = [
        { value: 'none', label: 'Default' },
        { value: 'name-asc', label: 'Name A→Z' },
        { value: 'name-desc', label: 'Name Z→A' },
        { value: 'attendance-asc', label: 'Attendance ↑' },
        { value: 'attendance-desc', label: 'Attendance ↓' },
    ];

    const commitCount = () => {
        const val = parseInt(inputValue, 10);
        if (!isNaN(val) && val >= 1 && val <= 100) {
            setStudentCount(val);
            setInputValue(String(val));
        } else {
            setInputValue(String(studentCount));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    return (
        <div className="filters">
            <div className="filters-row">
                <div className="filter-btn-group">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            className={`filter-btn ${filter === f.key ? 'filter-btn--active' : ''}`}
                            onClick={() => setFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="filters-right">
                    <button
                        className={`low-attendance-btn ${showLowAttendance ? 'low-attendance-btn--active' : ''}`}
                        onClick={() => setShowLowAttendance((v) => !v)}
                    >
                        <span>⚠</span>
                        {'<'} 75% Only
                    </button>
                </div>
            </div>

            <div className="filters-row">
                <div className="count-group">
                    <span className="count-label">Students</span>
                    <input
                        type="number"
                        min={1}
                        max={100}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={commitCount}
                        onKeyDown={handleKeyDown}
                        className="count-input"
                    />
                </div>

                <div className="filters-right">
                    <span className="sort-label">Sort by</span>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="sort-select"
                    >
                        {sortOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Filters;
