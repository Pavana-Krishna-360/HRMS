import React from 'react';

const AttendanceHistory = ({ data }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Absent': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Leave': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Half Day': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-800">Recent Attendance</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
          <thead>
            <tr className="text-slate-500 border-b border-slate-200 bg-white">
              <th className="py-4 px-6 font-medium">Date</th>
              <th className="py-4 px-6 font-medium">Check In</th>
              <th className="py-4 px-6 font-medium">Check Out</th>
              <th className="py-4 px-6 font-medium">Working Hours</th>
              <th className="py-4 px-6 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.slice().reverse().slice(0, 10).map((record) => (
              <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-6 font-medium text-slate-900">{record.date}</td>
                <td className="py-3 px-6 text-slate-600">{record.checkIn}</td>
                <td className="py-3 px-6 text-slate-600">{record.checkOut}</td>
                <td className="py-3 px-6 text-slate-900 font-medium">{record.hoursText}</td>
                <td className="py-3 px-6 text-right">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusBadge(record.status)}`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;
