function StudentList({ students, selectedStudent, setSelectedStudent, loading }) {
    if (loading) {
        return (
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">#</th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Attendance</th>
                            <th className="px-5 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <tr key={i} className="border-b border-gray-50">
                                <td colSpan={4} className="px-5 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-3 w-6 bg-gray-100 rounded animate-pulse" />
                                        <div className="h-3 w-40 bg-gray-100 rounded animate-pulse" />
                                        <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                                        <div className="h-3 w-14 bg-gray-100 rounded animate-pulse ml-auto" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (students.length === 0) {
        return (
            <div className="bg-white border border-gray-200 rounded-md py-16 text-center">
                <div className="text-3xl mb-3 opacity-40">📋</div>
                <p className="text-sm text-gray-400">No students match the current filters.</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">#</th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Attendance</th>
                        <th className="px-5 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, idx) => {
                        const isGreen = student.attendance >= 75;
                        const isSelected = selectedStudent === student.id;

                        return (
                            <tr
                                key={student.id}
                                className={`border-b border-gray-100 last:border-b-0 cursor-pointer transition duration-150 ${isSelected
                                    ? 'bg-gray-50 border-l-2 border-l-gray-800'
                                    : 'hover:bg-gray-50'
                                    }`}
                                onClick={() =>
                                    setSelectedStudent(isSelected ? null : student.id)
                                }
                            >
                                <td className="px-5 py-3.5 text-xs text-gray-400 font-medium">
                                    {idx + 1}
                                </td>
                                <td className="px-5 py-3.5 text-sm text-gray-800 font-medium">
                                    {student.name}
                                </td>
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-semibold ${isGreen ? 'text-green-600' : 'text-red-600'}`}>
                                            {student.attendance}%
                                        </span>
                                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${isGreen ? 'bg-green-400' : 'bg-red-400'
                                                    }`}
                                                style={{ width: `${student.attendance}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-3.5 text-center">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${isGreen
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-red-50 text-red-600'
                                            }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${isGreen ? 'bg-green-500' : 'bg-red-500'
                                                }`}
                                        />
                                        {student.status}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;
