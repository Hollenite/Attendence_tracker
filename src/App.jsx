import { useState, useEffect, useMemo } from 'react';
import FilterBar from './components/FilterBar';
import StudentTable from './components/StudentTable';
import StudentDetail from './components/StudentDetail';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showLowAttendance, setShowLowAttendance] = useState(false);
  const [sortByAttendance, setSortByAttendance] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch students and attach random attendance
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => {
        const enriched = users.map((user) => {
          const attendance = Math.floor(Math.random() * 51) + 50; // 50 – 100
          return {
            ...user,
            attendance,
            status: attendance >= 75 ? 'Present' : 'Absent',
          };
        });
        setStudents(enriched);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Derived filtered + sorted list
  const filteredStudents = useMemo(() => {
    let list = [...students];

    // Filter by status
    if (filter === 'present') {
      list = list.filter((s) => s.status === 'Present');
    } else if (filter === 'absent') {
      list = list.filter((s) => s.status === 'Absent');
    }

    // Toggle: only < 75%
    if (showLowAttendance) {
      list = list.filter((s) => s.attendance < 75);
    }

    // Sort by attendance ascending
    if (sortByAttendance) {
      list.sort((a, b) => a.attendance - b.attendance);
    }

    return list;
  }, [students, filter, showLowAttendance, sortByAttendance]);

  // Stats
  const totalCount = students.length;
  const presentCount = students.filter((s) => s.status === 'Present').length;
  const absentCount = students.filter((s) => s.status === 'Absent').length;

  // Find selected student object
  const selectedObj = students.find((s) => s.id === selectedStudent) || null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Student Attendance Viewer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track attendance and identify students who need support
          </p>
        </header>

        {/* Controls */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          showLowAttendance={showLowAttendance}
          setShowLowAttendance={setShowLowAttendance}
          sortByAttendance={sortByAttendance}
          setSortByAttendance={setSortByAttendance}
        />

        {/* Stats */}
        {!loading && (
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white border border-gray-200 rounded-md px-5 py-4 text-center">
              <div className="text-2xl font-semibold text-gray-800">{totalCount}</div>
              <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide font-medium">Total Students</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-md px-5 py-4 text-center">
              <div className="text-2xl font-semibold text-green-600">{presentCount}</div>
              <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide font-medium">Present</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-md px-5 py-4 text-center">
              <div className="text-2xl font-semibold text-red-600">{absentCount}</div>
              <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide font-medium">Absent</div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className={`mt-6 ${selectedObj ? 'grid grid-cols-[1fr_300px] gap-6 items-start' : ''}`}>
          <StudentTable
            students={filteredStudents}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            loading={loading}
          />

          {selectedObj && (
            <StudentDetail
              student={selectedObj}
              onClose={() => setSelectedStudent(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
