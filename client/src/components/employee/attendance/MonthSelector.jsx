import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import Button from '../../common/Button';

const MonthSelector = ({ currentMonth }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl shadow-sm border border-slate-200 p-4 gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
          <CalendarIcon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">{currentMonth}</h2>
          <p className="text-xs font-medium text-slate-500">Monthly View</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <Button variant="outline" className="w-auto text-sm py-2 px-4 h-[38px]">
          This Month
        </Button>
        <button className="p-2 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-600 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MonthSelector;
