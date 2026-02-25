function StudentCard({ student, onClose }) {
    if (!student) return null;

    const isGreen = student.attendance >= 75;
    const initials = student.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2);

    return (
        <div className="bg-white border border-gray-200 rounded-md p-6 sticky top-6">
            <button
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition duration-150 cursor-pointer text-sm"
                onClick={onClose}
            >
                ✕
            </button>

            <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold mb-4 ${isGreen ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}
            >
                {initials}
            </div>

            <h3 className="text-lg font-medium text-gray-800">{student.name}</h3>
            <p className="text-xs text-gray-400 mb-5">@{student.username}</p>

            <div
                className={`rounded-md px-4 py-3 text-center mb-5 ${isGreen ? 'bg-green-50' : 'bg-red-50'
                    }`}
            >
                <div className={`text-2xl font-semibold ${isGreen ? 'text-green-600' : 'text-red-600'}`}>
                    {student.attendance}%
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-0.5">Attendance Rate</div>
            </div>

            <div className="space-y-3.5">
                <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">Email</div>
                    <div className="text-sm text-gray-600 mt-0.5">{student.email}</div>
                </div>
                <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">Phone</div>
                    <div className="text-sm text-gray-600 mt-0.5">{student.phone}</div>
                </div>
                <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">City</div>
                    <div className="text-sm text-gray-600 mt-0.5">{student.city || '—'}</div>
                </div>
                <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">State</div>
                    <div className="text-sm text-gray-600 mt-0.5">{student.state || '—'}</div>
                </div>
            </div>
        </div>
    );
}

export default StudentCard;
