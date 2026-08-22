import React from 'react';

const AttendanceChart = ({ data }) => {
  // Normalize days 1 to 31
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-emerald-500';
      case 'Absent': return 'bg-rose-500';
      case 'Leave': return 'bg-amber-400';
      case 'Half Day': return 'bg-blue-500';
      default: return 'bg-slate-200';
    }
  };

  const getBarHeight = (dayData) => {
    if (!dayData) return '0%';
    if (dayData.status === 'Absent' || dayData.status === 'Leave') return '100%';
    
    const maxHours = 9;
    const height = Math.min((dayData.hours / maxHours) * 100, 100);
    return `${height}%`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Monthly Attendance</h3>
          <p className="text-xs text-slate-500 mt-1">Working hours visualization</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500"></div>Present</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-rose-500"></div>Absent</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-400"></div>Leave</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500"></div>Half Day</div>
        </div>
      </div>

      <div className="relative flex-1 min-h-[250px] w-full flex items-end justify-between pb-8 pt-4 overflow-x-auto no-scrollbar">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pb-8 pointer-events-none min-w-[500px]">
          <div className="border-t border-slate-100 w-full"></div>
          <div className="border-t border-slate-100 w-full"></div>
          <div className="border-t border-slate-100 w-full"></div>
          <div className="border-t border-slate-100 w-full"></div>
          <div className="border-t border-slate-300 w-full"></div>
        </div>

        {/* Bars */}
        <div className="relative w-full h-full flex items-end justify-between gap-1 sm:gap-2 z-10 min-w-[500px]">
          {daysInMonth.map(dayNum => {
            const dayData = data.find(d => d.dayOfMonth === dayNum);
            const isWeekend = [2, 9, 16, 23, 30].includes(dayNum);
            
            if (isWeekend) {
              return (
                <div key={dayNum} className="flex flex-col items-center flex-1 group relative">
                  <div className="w-full h-[150px] sm:h-[200px] flex items-end">
                    <div className="w-full bg-slate-100 h-full opacity-50 rounded-t-sm"></div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 font-medium absolute -bottom-6">W</span>
                </div>
              );
            }

            if (!dayData) {
              return (
                <div key={dayNum} className="flex flex-col items-center flex-1 group relative">
                  <div className="w-full h-[150px] sm:h-[200px] flex items-end">
                    <div className="w-full bg-slate-50 h-full rounded-t-sm"></div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 absolute -bottom-6">{dayNum}</span>
                </div>
              );
            }

            return (
              <div key={dayNum} className="flex flex-col items-center flex-1 group relative cursor-pointer">
                <div className="w-full h-[150px] sm:h-[200px] flex items-end">
                  <div 
                    className={`w-full rounded-t-sm transition-all duration-500 group-hover:opacity-80 ${getStatusColor(dayData.status)}`}
                    style={{ height: getBarHeight(dayData) }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-600 mt-2 absolute -bottom-6 font-medium">{dayNum}</span>
                
                {/* Custom Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-50 w-48 bg-slate-800 text-white text-xs rounded-lg p-3 shadow-xl border border-slate-700 pointer-events-none">
                  <p className="font-bold border-b border-slate-600 pb-1 mb-2">{dayData.date}</p>
                  <p className="mb-1"><span className="text-slate-400">Status:</span> <span className={`font-medium ${dayData.status === 'Absent' ? 'text-rose-400' : dayData.status === 'Leave' ? 'text-amber-400' : 'text-emerald-400'}`}>{dayData.status}</span></p>
                  <p className="mb-1"><span className="text-slate-400">In:</span> {dayData.checkIn}</p>
                  <p className="mb-1"><span className="text-slate-400">Out:</span> {dayData.checkOut}</p>
                  <p><span className="text-slate-400">Hours:</span> {dayData.hoursText}</p>
                  
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
