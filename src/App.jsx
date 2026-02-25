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
    <div className="app">
      <header className="app-header">
        <h1>📋 Student Attendance Viewer</h1>
        <p>Track attendance and identify students who need support</p>
      </header>

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        showLowAttendance={showLowAttendance}
        setShowLowAttendance={setShowLowAttendance}
        sortByAttendance={sortByAttendance}
        setSortByAttendance={setSortByAttendance}
      />

      {/* Stats overview */}
      {!loading && (
        <div className="stats-bar">
          <div className="stat-card total">
            <div className="stat-value">{totalCount}</div>
            <div className="stat-label">Total Students</div>
          </div>
          <div className="stat-card present">
            <div className="stat-value">{presentCount}</div>
            <div className="stat-label">Present</div>
          </div>
          <div className="stat-card absent">
            <div className="stat-value">{absentCount}</div>
            <div className="stat-label">Absent</div>
          </div>
        </div>
      )}

      <div className={`app-content${selectedObj ? ' has-detail' : ''}`}>
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
  );
}

export default App;
