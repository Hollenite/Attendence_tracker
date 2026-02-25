function StudentDetail({ student, onClose }) {
    if (!student) return null;

    const level = student.attendance >= 75 ? 'green' : 'red';
    const initials = student.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2);

    return (
        <div className="detail-panel">
            <button className="detail-close" onClick={onClose}>
                ✕
            </button>

            <div className={`detail-avatar ${level}`}>{initials}</div>

            <div className="detail-name">{student.name}</div>
            <div className="detail-username">@{student.username}</div>

            <div className={`detail-attendance ${level}`}>
                <div className={`detail-attendance-value ${level}`}>
                    {student.attendance}%
                </div>
                <div className="detail-attendance-label">Attendance Rate</div>
            </div>

            <div className="detail-info">
                <div className="detail-row">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{student.email}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">{student.phone}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">City</span>
                    <span className="detail-value">{student.address?.city || '—'}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Company</span>
                    <span className="detail-value">{student.company?.name || '—'}</span>
                </div>
            </div>
        </div>
    );
}

export default StudentDetail;
