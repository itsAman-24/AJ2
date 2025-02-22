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

  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setUpcomingAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(upcomingAppointments));
  }, [upcomingAppointments]);

  const doctors = [
    "Dr. Smith - General Medicine",
    "Dr. Johnson - Dentist",
    "Dr. Williams - Orthopedic",
    "Dr. Brown - Ophthalmologist"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newAppointment = {
      id: Date.now(),
      doctor: bookingData.doctor.split(' - ')[0],
      date: bookingData.date,
      time: bookingData.time,
      reason: bookingData.reason
    };

    setUpcomingAppointments(prev => [...prev, newAppointment]);
    toast.success('Appointment booked successfully!');
    setBookingData({ doctor: '', date: '', time: '', reason: '' });
  };

  const handleCancel = (appointmentId) => {
    setUpcomingAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
    toast.success('Appointment cancelled successfully!');
  };

  return (
    <div className="space-y-6 px-4">
      <h1 className="text-2xl md:text-3xl font-bold">Book Appointment</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg md:text-xl font-semibold mb-4">New Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Select Doctor</label>
              <select 
                className="input text-sm md:text-base"
                value={bookingData.doctor}
                onChange={(e) => setBookingData({...bookingData, doctor: e.target.value})}
                required
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm">Date</label>
                <input
                  type="date"
                  className="input text-sm md:text-base"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Time</label>
                <input
                  type="time"
                  className="input text-sm md:text-base"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm">Reason for Visit</label>
              <textarea
                className="input text-sm md:text-base"
                value={bookingData.reason}
                onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
                rows="3"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-primary w-full text-sm md:text-base">
              Book Appointment
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-500 text-center py-4 text-sm">No upcoming appointments</p>
            ) : (
              upcomingAppointments.map(apt => (
                <div key={apt.id} className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-semibold text-sm md:text-base">{apt.doctor}</p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                    {format(new Date(apt.date), 'MMMM d, yyyy')} at {apt.time}
                  </p>
                  <p className="text-xs md:text-sm mt-2">{apt.reason}</p>
                  <div className="mt-3 space-x-2">
                    <button 
                      onClick={() => handleCancel(apt.id)}
                      className="text-xs md:text-sm text-red-600 hover:text-red-700"
                    >
                      Cancel
                    </button>
                    <button className="text-xs md:text-sm text-primary-600 hover:text-primary-700">
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