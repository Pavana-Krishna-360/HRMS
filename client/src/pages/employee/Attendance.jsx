import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MonthSelector from '../../components/employee/attendance/MonthSelector';
import AttendanceSummary from '../../components/employee/attendance/AttendanceSummary';
import TodayAttendance from '../../components/employee/attendance/TodayAttendance';
import AttendanceChart from '../../components/employee/attendance/AttendanceChart';
import AttendanceHistory from '../../components/employee/attendance/AttendanceHistory';

// MOCK DATA: Isolated to easily replace with API responses later
const MOCK_MONTH = "August 2026";

const MOCK_SUMMARY = {
  present: 18,
  absent: 2,
  leave: 2,
  halfDay: 1,
  rate: 90
};

const MOCK_HISTORY = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  const dateStr = `Aug ${day.toString().padStart(2, '0')}`;
  
  if (day === 5 || day === 6) {
    return { id: day, date: dateStr, dayOfMonth: day, status: "Absent", checkIn: "--", checkOut: "--", hours: 0, hoursText: "--" };
  } else if (day === 12 || day === 13) {
    return { id: day, date: dateStr, dayOfMonth: day, status: "Leave", checkIn: "--", checkOut: "--", hours: 0, hoursText: "--" };
  } else if (day === 19) {
    return { id: day, date: dateStr, dayOfMonth: day, status: "Half Day", checkIn: "09:00 AM", checkOut: "01:00 PM", hours: 4, hoursText: "4h 00m" };
  } else if (day > 22) { 
    return null;
  } else if ([2, 9, 16, 23, 30].includes(day)) { 
    return null; // Mock weekends
  } else {
    // Generate some random hours for realism
    const hours = 7.5 + Math.random() * 1.5;
    const hrs = Math.floor(hours);
    const mins = Math.floor((hours - hrs) * 60);
    return { 
      id: day, 
      date: dateStr, 
      dayOfMonth: day,
      status: "Present", 
      checkIn: "08:52 AM", 
      checkOut: "05:34 PM", 
      hours: hours, 
      hoursText: `${hrs}h ${mins.toString().padStart(2, '0')}m` 
    };
  }
}).filter(Boolean);

const Attendance = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* Page Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Attendance
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Track your attendance and working hours.
          </p>
        </div>

        {/* Top Controls */}
        <MonthSelector currentMonth={MOCK_MONTH} />

        {/* Summaries & Today Action */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <AttendanceSummary summary={MOCK_SUMMARY} />
          </div>
          <div>
            <TodayAttendance />
          </div>
        </div>

        {/* Visual Chart */}
        <div>
          <AttendanceChart data={MOCK_HISTORY} />
        </div>

        {/* History Table */}
        <div>
          <AttendanceHistory data={MOCK_HISTORY} />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Attendance;
