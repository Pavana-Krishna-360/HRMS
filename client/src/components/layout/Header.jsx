import React from 'react';
import { Bell, Menu, UserCircle } from 'lucide-react';

const Header = ({ setIsOpen }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-slate-800 hidden sm:block">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button className="text-slate-400 hover:text-slate-600 relative focus:outline-none">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 sm:pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-900 leading-none">Sarah Jenkins</p>
            <p className="text-xs text-slate-500 mt-1">Employee</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
            <UserCircle className="w-8 h-8" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
