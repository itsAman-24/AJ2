import { FaCalendar, FaFileAlt, FaBell } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentRecords, setRecentRecords] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user && Object.keys(user).length > 0) {
      setCurrentUser(user);
    }

    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setUpcomingAppointments(savedAppointments);

    const storedRecords = JSON.parse(localStorage.getItem('medicalRecords') || '[]');
    setRecentRecords(storedRecords);
  }, []);

  return (
    <div className="space-y-8 px-4 md:px-8 py-6">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold break-words text-gray-800 dark:text-white">
        Welcome Back, {currentUser?.name || 'Guest'}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Appointments Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white">Upcoming Appointments</h2>
            <FaCalendar className="text-blue-600 dark:text-blue-400 text-xl" />
          </div>
          {upcomingAppointments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base text-center py-6">No upcoming appointments</p>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.slice(0, 3).map((apt) => (
                <div key={apt.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p className="font-semibold text-sm md:text-base text-gray-800 dark:text-white">{apt.doctor}</p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{apt.date} at {apt.time}</p>
                  <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400">{apt.reason}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Records Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white">Recent Records</h2>
            <FaFileAlt className="text-blue-600 dark:text-blue-400 text-xl" />
          </div>
          {recentRecords.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base text-center py-6">No medical records found</p>
          ) : (
            <div className="space-y-4">
              {recentRecords.map((record) => (
                <div key={record.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p className="font-semibold text-sm md:text-base text-gray-800 dark:text-white">{record.type}</p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{record.date}</p>
                  <span className="text-xs md:text-sm text-green-600 dark:text-green-400">{record.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white">Notifications</h2>
            <FaBell className="text-blue-600 dark:text-blue-400 text-xl" />
          </div>
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <p className="font-semibold text-sm md:text-base text-gray-800 dark:text-white">Vaccination Due</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Annual flu shot reminder</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <p className="font-semibold text-sm md:text-base text-gray-800 dark:text-white">New Report Available</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Blood test results are ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
