import React from 'react';
import { Search } from 'lucide-react';

const LeaveFilters = ({ activeFilter, setActiveFilter, searchQuery, setSearchQuery }) => {
  const filters = ['All', 'Pending', 'Approved', 'Declined'];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === f 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      
      <div className="relative w-full sm:w-64 shrink-0">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Search employee..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white"
        />
      </div>
    </div>
  );
};

export default LeaveFilters;
