import './StudentList.css';

function StudentList({ students, selectedStudent, setSelectedStudent, loading }) {
    if (loading) {
        return (
            <div className="student-list">
                <div className="list-header">
                    <span className="col-index">#</span>
                    <span className="col-name">Name</span>
                    <span className="col-attendance">Attendance</span>
                    <span className="col-status">Status</span>
                </div>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="skeleton-row">
                        <div className="skeleton-cell-content">
                            <div className="skeleton-bar skeleton-bar--xs" />
                            <div className="skeleton-bar skeleton-bar--md" />
                            <div className="skeleton-bar skeleton-bar--sm" />
                            <div className="skeleton-bar skeleton-bar--end" />
                        </div>
                    </div>
                ))}
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
        <div className="student-list">
            <div className="list-header">
                <span className="col-index">#</span>
                <span className="col-name">Name</span>
                <span className="col-attendance">Attendance</span>
                <span className="col-status">Status</span>
            </div>
            {students.map((student, idx) => {
                const isGreen = student.attendance >= 75;
                const isSelected = selectedStudent === student.id;

                return (
                    <div
                        key={student.id}
                        className={`student-row ${isSelected ? 'student-row--selected' : ''}`}
                        onClick={() =>
                            setSelectedStudent(isSelected ? null : student.id)
                        }
                    >
                        <span className="cell-index">{idx + 1}</span>
                        <span className="cell-name">{student.name}</span>
                        <span className="cell-attendance">
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
                        </span>
                        <span className="cell-status">
                            <span className={`status-badge ${isGreen ? 'status-badge--green' : 'status-badge--red'}`}>
                                <span className={`status-dot ${isGreen ? 'status-dot--green' : 'status-dot--red'}`} />
                                {student.status}
                            </span>
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default StudentList;
