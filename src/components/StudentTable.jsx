function StudentTable({ students, selectedStudent, setSelectedStudent, loading }) {
    if (loading) {
        return (
            <div className="table-wrapper">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Attendance</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <tr key={i}>
                                <td colSpan={4}>
                                    <div className="skeleton-row">
                                        <div className="skeleton-block" style={{ width: 24 }} />
                                        <div className="skeleton-block" style={{ width: '40%' }} />
                                        <div className="skeleton-block" style={{ width: '25%' }} />
                                        <div className="skeleton-block" style={{ width: 60 }} />
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
            <div className="table-wrapper">
                <div className="table-empty">
                    <div className="empty-icon">📋</div>
                    <p>No students match the current filters.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="table-wrapper">
            <table className="student-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Attendance</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, idx) => {
                        const level = student.attendance >= 75 ? 'green' : 'red';
                        const isSelected = selectedStudent === student.id;

                        return (
                            <tr
                                key={student.id}
                                className={isSelected ? 'selected' : ''}
                                onClick={() =>
                                    setSelectedStudent(isSelected ? null : student.id)
                                }
                                style={{ animationDelay: `${idx * 0.04}s` }}
                            >
                                <td>{idx + 1}</td>
                                <td>
                                    <span className="student-name">{student.name}</span>
                                </td>
                                <td>
                                    <div className="attendance-cell">
                                        <span className={`attendance-pct ${level}`}>
                                            {student.attendance}%
                                        </span>
                                        <div className="attendance-bar-bg">
                                            <div
                                                className={`attendance-bar-fill ${level}`}
                                                style={{ width: `${student.attendance}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <span className={`status-badge ${student.status.toLowerCase()}`}>
                                        <span className={`status-dot ${student.status.toLowerCase()}`} />
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

export default StudentTable;
