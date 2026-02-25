import { useState, useEffect } from 'react';
import Filters from './components/Filters';
import StudentList from './components/StudentList';
import StudentCard from './components/StudentCard';
import './App.css';

function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function App() {
  const [allStudents, setAllStudents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showLowAttendance, setShowLowAttendance] = useState(false);
  const [sortOption, setSortOption] = useState('none');
  const [studentCount, setStudentCount] = useState(25);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStudents() {
      const url = 'https://randomuser.me/api/?results=100&nat=IN&seed=attendance2024';
      const data = await fetch(url);
      const json = await data.json();

      const rng = seededRandom(42);
      const enriched = json.results.map(({ name, login, email, phone, location, picture }, index) => {
        const attendance = Math.floor(rng() * 51) + 50;
        return {
          id: index + 1,
          name: `${name.first} ${name.last}`,
          username: login.username,
          email,
          phone,
          city: location.city,
          state: location.state,
          picture: picture.medium,
          attendance,
          status: attendance >= 75 ? 'Present' : 'Absent',
        };
      });

      setAllStudents(enriched);
      setLoading(false);
    }
    getStudents();
  }, []);

  const students = allStudents.slice(0, studentCount);

  let filteredStudents = [...students];

  if (filter === 'present') {
    filteredStudents = filteredStudents.filter((s) => s.status === 'Present');
  } else if (filter === 'absent') {
    filteredStudents = filteredStudents.filter((s) => s.status === 'Absent');
  }

  if (showLowAttendance) {
    filteredStudents = filteredStudents.filter((s) => s.attendance < 75);
  }

  switch (sortOption) {
    case 'name-asc':
      filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      filteredStudents.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'attendance-asc':
      filteredStudents.sort((a, b) => a.attendance - b.attendance);
      break;
    case 'attendance-desc':
      filteredStudents.sort((a, b) => b.attendance - a.attendance);
      break;
  }

  const totalCount = students.length;
  const presentCount = students.filter((s) => s.status === 'Present').length;
  const absentCount = students.filter((s) => s.status === 'Absent').length;

  const selectedObj = students.find((s) => s.id === selectedStudent) || null;

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            Student Attendance Viewer
          </h1>
          <p className="app-subtitle">
            Track attendance and identify students who need support
          </p>
        </header>

        <Filters
          filter={filter}
          setFilter={setFilter}
          showLowAttendance={showLowAttendance}
          setShowLowAttendance={setShowLowAttendance}
          sortOption={sortOption}
          setSortOption={setSortOption}
          studentCount={studentCount}
          setStudentCount={setStudentCount}
        />

        {!loading && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{totalCount}</div>
              <div className="stat-label">Total Students</div>
            </div>
            <div className="stat-card">
              <div className="stat-value--green">{presentCount}</div>
              <div className="stat-label">Present</div>
            </div>
            <div className="stat-card">
              <div className="stat-value--red">{absentCount}</div>
              <div className="stat-label">Absent</div>
            </div>
          </div>
        )}

        <div className={selectedObj ? 'main-content--with-sidebar' : 'main-content'}>
          <StudentList
            students={filteredStudents}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            loading={loading}
          />

          {selectedObj && (
            <StudentCard
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
