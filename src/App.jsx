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
    fetch('https://randomuser.me/api/?results=100&nat=IN&seed=attendance2024')
      .then((res) => res.json())
      .then((data) => {
        const rng = seededRandom(42);
        const enriched = data.results.map((user, index) => {
          const attendance = Math.floor(rng() * 51) + 50;
          return {
            id: index + 1,
            name: `${user.name.first} ${user.name.last}`,
            username: user.login.username,
            email: user.email,
            phone: user.phone,
            city: user.location.city,
            state: user.location.state,
            picture: user.picture.medium,
            attendance,
            status: attendance >= 75 ? 'Present' : 'Absent',
          };
        });
        setAllStudents(enriched);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Student Attendance Viewer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
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

        <div className={`mt-6 ${selectedObj ? 'grid grid-cols-[1fr_300px] gap-6 items-start' : ''}`}>
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
