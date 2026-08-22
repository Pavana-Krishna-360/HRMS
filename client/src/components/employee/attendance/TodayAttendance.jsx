import React, { useState } from 'react';
import Button from '../../common/Button';
import { Clock, LogIn, LogOut, CheckCircle2 } from 'lucide-react';

const TodayAttendance = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setCheckInTime("08:52 AM");
  };

  const handleCheckOut = () => {
    setIsCheckedOut(true);
    setCheckOutTime("05:34 PM");
  };

  const getStatus = () => {
    if (isCheckedOut) return { label: 'Present', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (isCheckedIn) return { label: 'In Progress', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    return { label: 'Not Started', color: 'text-slate-700 bg-slate-50 border-slate-200' };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full min-h-[300px]">
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
        <h3 className="text-lg font-semibold text-slate-800">Today's Attendance</h3>
        <span className={`px-2.5 py-1 text-xs font-medium border rounded-md ${status.color}`}>
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 flex-1">
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 text-center flex flex-col justify-center items-center">
          <LogIn className="w-5 h-5 text-slate-400 mb-2" />
          <p className="text-xs text-slate-500 font-medium mb-1">Check In</p>
          <p className="text-base sm:text-lg font-bold text-slate-900">{checkInTime || "--:-- --"}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 text-center flex flex-col justify-center items-center">
          <LogOut className="w-5 h-5 text-slate-400 mb-2" />
          <p className="text-xs text-slate-500 font-medium mb-1">Check Out</p>
          <p className="text-base sm:text-lg font-bold text-slate-900">{checkOutTime || "--:-- --"}</p>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center text-sm">
        <span className="text-slate-500">Working Hours:</span>
        <span className="font-semibold text-slate-900">
          {isCheckedOut ? "8h 42m" : isCheckedIn ? "In progress" : "--"}
        </span>
      </div>

      <div className="mt-auto">
        {!isCheckedIn ? (
          <Button onClick={handleCheckIn} className="w-full h-12 text-base">
            <Clock className="w-5 h-5 mr-2" />
            Check In Now
          </Button>
        ) : !isCheckedOut ? (
          <Button onClick={handleCheckOut} variant="outline" className="w-full h-12 text-base border-primary-200 hover:bg-primary-50 text-primary-700 font-semibold">
            <LogOut className="w-5 h-5 mr-2" />
            Check Out
          </Button>
        ) : (
          <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-sm font-medium text-center border border-emerald-100 flex items-center justify-center gap-2 h-12">
            <CheckCircle2 className="w-5 h-5" />
            Attendance marked
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayAttendance;
