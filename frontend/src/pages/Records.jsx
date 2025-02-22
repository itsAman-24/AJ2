import { useState } from 'react';
import { FaDownload, FaSearch } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

function Records() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const records = [
    {
      id: 1,
      date: "2024-03-15",
      type: "Blood Test",
      doctor: "Dr. Smith",
      diagnosis: "Normal",
      report: "All parameters within normal range"
    },
    {
      id: 2,
      date: "2024-03-10",
      type: "X-Ray",
      doctor: "Dr. Johnson",
      diagnosis: "Fracture",
      report: "Minor fracture in right arm"
    },
    {
      id: 3,
      date: "2024-03-05",
      type: "General Checkup",
      doctor: "Dr. Williams",
      diagnosis: "Healthy",
      report: "Regular checkup, no issues found"
    }
  ];

  const downloadReport = (record) => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text('Medical Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Date: ${record.date}`, 20, 40);
    doc.text(`Type: ${record.type}`, 20, 50);
    doc.text(`Doctor: ${record.doctor}`, 20, 60);
    doc.text(`Diagnosis: ${record.diagnosis}`, 20, 70);
    doc.text(`Report Details: ${record.report}`, 20, 80);
    
    doc.save(`medical-report-${record.date}.pdf`);
  };

  const filteredRecords = records
    .filter(record => 
      (filterType === 'all' || record.type === filterType) &&
      (record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
       record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
       record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="space-y-6 px-4">
      <h1 className="text-2xl md:text-3xl font-bold">Medical Records</h1>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search records..."
              className="input pl-10 text-sm md:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="input md:w-48 text-sm md:text-base"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Blood Test">Blood Test</option>
            <option value="X-Ray">X-Ray</option>
            <option value="General Checkup">General Checkup</option>
          </select>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium">Date</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium">Type</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium">Doctor</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium">Diagnosis</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredRecords.map(record => (
                    <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm">{record.date}</td>
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm">{record.type}</td>
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm">{record.doctor}</td>
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm">{record.diagnosis}</td>
                      <td className="px-4 md:px-6 py-4">
                        <button
                          onClick={() => downloadReport(record)}
                          className="flex items-center text-primary-600 hover:text-primary-700 text-xs md:text-sm"
                        >
                          <FaDownload className="mr-2" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Records;