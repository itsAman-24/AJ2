import React, { useEffect, useState } from 'react';
import { FaDownload, FaSearch } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [newRecord, setNewRecord] = useState({
    date: '',
    type: '',
    doctor: '',
    diagnosis: '',
    report: ''
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('medicalRecords')) || [];
    setRecords(saved);
  }, []);

  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem('medicalRecords', JSON.stringify(records));
    }
  }, [records]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    const newEntry = {
      ...newRecord,
      id: Date.now()
    };
    setRecords((prev) => [newEntry, ...prev]);
    setNewRecord({ date: '', type: '', doctor: '', diagnosis: '', report: '' });
  };

  const downloadReport = (record) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Medical Report', 20, 20);
    doc.setFontSize(12);
    let y = 40;
    doc.text(`Date: ${record.date}`, 20, y); y += 10;
    doc.text(`Type: ${record.type}`, 20, y); y += 10;
    doc.text(`Doctor: ${record.doctor}`, 20, y); y += 10;
    doc.text(`Diagnosis: ${record.diagnosis}`, 20, y); y += 10;
    const lines = doc.splitTextToSize(record.report, 170);
    doc.text(lines, 20, y + 10);
    doc.save(`medical-report-${record.date}.pdf`);
  };

  const filteredRecords = records.filter(record =>
    (filterType === 'all' || record.type === filterType) &&
    (
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Medical Records</h2>
  
      {/* Add Record */}
      <form
        onSubmit={handleAddRecord}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8 transition-colors duration-300"
      >
        <input
          type="date"
          name="date"
          value={newRecord.date}
          onChange={handleInputChange}
          required
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white border-none px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="type"
          value={newRecord.type}
          onChange={handleInputChange}
          placeholder="Type"
          required
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white border-none px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="doctor"
          value={newRecord.doctor}
          onChange={handleInputChange}
          placeholder="Doctor Name"
          required
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white border-none px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="diagnosis"
          value={newRecord.diagnosis}
          onChange={handleInputChange}
          placeholder="Diagnosis"
          required
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white border-none px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="report"
          value={newRecord.report}
          onChange={handleInputChange}
          placeholder="Detailed Report"
          rows={3}
          required
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white border-none px-4 py-2 rounded-xl md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700 transition-all md:col-span-2 w-max"
        >
          Add Record
        </button>
      </form>
  
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-none pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-none px-2 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-48"
        >
          <option value="all">All Types</option>
          <option value="Blood Test">Blood Test</option>
          <option value="X-Ray">X-Ray</option>
          <option value="General Checkup">General Checkup</option>
        </select>
      </div>
  
      {/* Display Cards */}
      {filteredRecords.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center py-10">No records found.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow-md p-5 space-y-2 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              <div><strong>Date:</strong> {record.date}</div>
              <div><strong>Type:</strong> {record.type}</div>
              <div><strong>Doctor:</strong> {record.doctor}</div>
              <div><strong>Diagnosis:</strong> {record.diagnosis}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Report:</strong> {record.report.slice(0, 100)}...
              </div>
              <button
                onClick={() => downloadReport(record)}
                className="text-blue-600 dark:text-blue-400 flex items-center gap-2 hover:underline"
              >
                <FaDownload /> Download Report
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  
};

export default Records;
