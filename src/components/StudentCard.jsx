import './StudentCard.css';

function StudentCard({ student, onClose }) {
    if (!student) return null;

    const isGreen = student.attendance >= 75;
    const initials = student.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2);

    return (
        <div className="student-card">
            <button
                className="card-close-btn"
                onClick={onClose}
            >
                ✕
            </button>

            <div
                className={`card-avatar ${isGreen ? 'card-avatar--green' : 'card-avatar--red'}`}
            >
                {initials}
            </div>

            <h3 className="card-name">{student.name}</h3>
            <p className="card-username">@{student.username}</p>

            <div
                className={`card-attendance-box ${isGreen ? 'card-attendance-box--green' : 'card-attendance-box--red'}`}
            >
                <div className={`card-attendance-value ${isGreen ? 'card-attendance-value--green' : 'card-attendance-value--red'}`}>
                    {student.attendance}%
                </div>
                <div className="card-attendance-label">Attendance Rate</div>
            </div>

            <div className="card-details">
                <div>
                    <div className="card-detail-label">Email</div>
                    <div className="card-detail-value">{student.email}</div>
                </div>
                <div>
                    <div className="card-detail-label">Phone</div>
                    <div className="card-detail-value">{student.phone}</div>
                </div>
                <div>
                    <div className="card-detail-label">City</div>
                    <div className="card-detail-value">{student.city || '—'}</div>
                </div>
                <div>
                    <div className="card-detail-label">State</div>
                    <div className="card-detail-value">{student.state || '—'}</div>
                </div>
            </div>
        </div>
    );
}

export default StudentCard;
