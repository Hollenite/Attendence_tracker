import './StudentList.css';

function StudentList({ students, selectedStudent, setSelectedStudent, loading }) {
    if (loading) {
        return (
            <div className="student-table-wrapper">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Attendance</th>
                            <th className="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <tr key={i} className="skeleton-row">
                                <td colSpan={4}>
                                    <div className="skeleton-cell-content">
                                        <div className="skeleton-bar skeleton-bar--xs" />
                                        <div className="skeleton-bar skeleton-bar--md" />
                                        <div className="skeleton-bar skeleton-bar--sm" />
                                        <div className="skeleton-bar skeleton-bar--end" />
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
            <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <p className="empty-state-text">No students match the current filters.</p>
            </div>
        );
    }

    return (
        <div className="student-table-wrapper">
            <table className="student-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Attendance</th>
                        <th className="text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, idx) => {
                        const isGreen = student.attendance >= 75;
                        const isSelected = selectedStudent === student.id;

                        return (
                            <tr
                                key={student.id}
                                className={`student-row ${isSelected ? 'student-row--selected' : ''}`}
                                onClick={() =>
                                    setSelectedStudent(isSelected ? null : student.id)
                                }
                            >
                                <td className="cell-index">
                                    {idx + 1}
                                </td>
                                <td className="cell-name">
                                    {student.name}
                                </td>
                                <td className="cell-attendance">
                                    <div className="attendance-cell-content">
                                        <span className={`attendance-value ${isGreen ? 'attendance-value--green' : 'attendance-value--red'}`}>
                                            {student.attendance}%
                                        </span>
                                        <div className="attendance-bar-track">
                                            <div
                                                className={`attendance-bar-fill ${isGreen ? 'attendance-bar-fill--green' : 'attendance-bar-fill--red'}`}
                                                style={{ width: `${student.attendance}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="cell-status">
                                    <span
                                        className={`status-badge ${isGreen ? 'status-badge--green' : 'status-badge--red'}`}
                                    >
                                        <span
                                            className={`status-dot ${isGreen ? 'status-dot--green' : 'status-dot--red'}`}
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
