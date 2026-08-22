import React from 'react';
import { CheckCircle2, XCircle, CalendarOff, Activity } from 'lucide-react';

const SummaryCard = ({ title, value, icon: Icon, colorClass, bgColorClass }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <p className="text-xl sm:text-2xl font-bold text-slate-900">{value}</p>
    </div>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgColorClass} ${colorClass}`}>
      <Icon className="w-5 h-5" />
    </div>
  </div>
);

const AttendanceSummary = ({ summary }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SummaryCard 
          title="Present" 
          value={`${summary.present} Days`} 
          icon={CheckCircle2} 
          colorClass="text-emerald-600" 
          bgColorClass="bg-emerald-50" 
        />
        <SummaryCard 
          title="Absent" 
          value={`${summary.absent} Days`} 
          icon={XCircle} 
          colorClass="text-rose-600" 
          bgColorClass="bg-rose-50" 
        />
        <SummaryCard 
          title="Leave" 
          value={`${summary.leave} Days`} 
          icon={CalendarOff} 
          colorClass="text-amber-600" 
          bgColorClass="bg-amber-50" 
        />
        <SummaryCard 
          title="Attendance Rate" 
          value={`${summary.rate}%`} 
          icon={Activity} 
          colorClass="text-primary-600" 
          bgColorClass="bg-primary-50" 
        />
      </div>

      {/* Progress Bar Rate */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Overall Attendance Rate</h3>
            <p className="text-xs text-slate-500 mt-1">Present: {summary.present} | Absent: {summary.absent} | Leave: {summary.leave}</p>
          </div>
          <span className="text-2xl font-bold text-primary-700">{summary.rate}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
          <div 
            className="bg-primary-500 h-3 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${summary.rate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;
