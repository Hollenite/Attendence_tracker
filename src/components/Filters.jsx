import { useState } from 'react';

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
        <div className="flex flex-col gap-3">
            <div className="flex items-center flex-wrap gap-3">
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
                </div>
            </div>

            <div className="flex items-center flex-wrap gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">Students</span>
                    <input
                        type="number"
                        min={1}
                        max={100}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={commitCount}
                        onKeyDown={handleKeyDown}
                        className="w-16 px-2 py-1.5 text-sm border border-gray-200 rounded-md bg-white text-gray-800 focus:outline-none focus:border-gray-400 transition duration-150"
                    />
                </div>

                <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs text-gray-500 font-medium">Sort by</span>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="px-2 py-1.5 text-sm border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none focus:border-gray-400 transition duration-150 cursor-pointer"
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
