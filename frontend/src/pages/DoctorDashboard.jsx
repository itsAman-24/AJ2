import { useEffect, useState } from "react";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No appointments booked yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 dark:border-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 border">Patient Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Time</th>
                <th className="px-4 py-2 border">Booked By</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="px-4 py-2 border">{appt.name}</td>
                  <td className="px-4 py-2 border">{appt.email}</td>
                  <td className="px-4 py-2 border">{appt.date}</td>
                  <td className="px-4 py-2 border">{appt.time}</td>
                  <td className="px-4 py-2 border">{appt.createdBy || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
