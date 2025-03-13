import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

function Appointments() {
  const [bookingData, setBookingData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [editId, setEditId] = useState(null);

  const doctors = [
    "Dr. Smith - General Medicine",
    "Dr. Johnson - Dentist",
    "Dr. Williams - Orthopedic",
    "Dr. Brown - Ophthalmologist"
  ];

  // Load appointments on mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments && savedAppointments !== '[]') {
      setUpcomingAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(upcomingAppointments));
  }, [upcomingAppointments]);

  // Auto-remove expired appointments
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const filteredAppointments = upcomingAppointments.filter((apt) => {
        const aptDateTime = new Date(`${apt.date}T${apt.time}`);
        return aptDateTime > now;
      });

      if (filteredAppointments.length !== upcomingAppointments.length) {
        setUpcomingAppointments(filteredAppointments);
        localStorage.setItem('appointments', JSON.stringify(filteredAppointments));
      }
    }, 60 * 1000); // check every 60 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [upcomingAppointments]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: editId || Date.now(),
      doctor: bookingData.doctor.split(' - ')[0],
      date: bookingData.date,
      time: bookingData.time,
      reason: bookingData.reason
    };

    let updatedAppointments;
    if (editId) {
      updatedAppointments = upcomingAppointments.map((apt) =>
        apt.id === editId ? newAppointment : apt
      );
      toast.success('Appointment rescheduled successfully!');
    } else {
      updatedAppointments = [...upcomingAppointments, newAppointment];
      toast.success('Appointment booked successfully!');
    }

    setUpcomingAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setBookingData({ doctor: '', date: '', time: '', reason: '' });
    setEditId(null);
  };

  const handleCancel = (appointmentId) => {
    const updated = upcomingAppointments.filter(apt => apt.id !== appointmentId);
    setUpcomingAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    toast.success('Appointment cancelled successfully!');
  };

  const handleReschedule = (apt) => {
    const fullDoctor = doctors.find(doc => doc.startsWith(apt.doctor)) || `${apt.doctor} - `;
    setBookingData({
      doctor: fullDoctor,
      date: apt.date,
      time: apt.time,
      reason: apt.reason
    });
    setEditId(apt.id);
  };

  return (
    <div className="p-4 space-y-8 lg:space-y-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
        Book Appointment
      </h1>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
        {/* Booking Form */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4 lg:p-5">
          <h2 className="text-lg lg:text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            {editId ? 'Reschedule Appointment' : 'New Appointment'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
            <div>
              <label className="block text-sm lg:text-base text-gray-700 dark:text-gray-300 mb-1.5">
                Select Doctor
              </label>
              <select
                value={bookingData.doctor}
                onChange={(e) => setBookingData({ ...bookingData, doctor: e.target.value })}
                className="w-full p-2.5 lg:p-3.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm lg:text-base dark:text-white"
                required
              >
                <option value="">Select a doctor</option>
                {doctors.map((doc, index) => (
                  <option key={index} value={doc}>{doc}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
              <div>
                <label className="block text-sm lg:text-base text-gray-700 dark:text-gray-300 mb-1.5">Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="w-full p-2.5 lg:p-3.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm lg:text-base dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm lg:text-base text-gray-700 dark:text-gray-300 mb-1.5">Time</label>
                <input
                  type="time"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  className="w-full p-2.5 lg:p-3.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm lg:text-base dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm lg:text-base text-gray-700 dark:text-gray-300 mb-1.5">Reason</label>
              <textarea
                value={bookingData.reason}
                onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })}
                rows="3"
                className="w-full p-2.5 lg:p-3.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm lg:text-base dark:text-white"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 lg:py-3 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm lg:text-base"
            >
              {editId ? 'Reschedule Appointment' : 'Book Appointment'}
            </button>
          </form>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4 lg:p-5">
          <h2 className="text-lg lg:text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Upcoming Appointments
          </h2>
          <div className="space-y-4 lg:space-y-5">
            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300 text-sm lg:text-base text-center">
                No upcoming appointments
              </p>
            ) : (
              upcomingAppointments.map((apt) => (
                <div key={apt.id} className="p-3 lg:p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <p className="font-semibold text-sm lg:text-base text-gray-800 dark:text-white">{apt.doctor}</p>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                    {format(new Date(apt.date), 'MMMM d, yyyy')} at {apt.time}
                  </p>
                  <p className="text-xs lg:text-sm mt-1.5 text-gray-700 dark:text-gray-200">{apt.reason}</p>
                  <div className="mt-2 space-x-3">
                    <button
                      onClick={() => handleCancel(apt.id)}
                      className="text-xs lg:text-sm text-red-600 hover:underline"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReschedule(apt)}
                      className="text-xs lg:text-sm text-blue-600 hover:underline"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
