import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Briefcase, 
  LayoutDashboard, 
  User, 
  Clock, 
  Calendar, 
  DollarSign, 
  LogOut,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/employee/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/employee/profile', icon: User },
    { name: 'Attendance', path: '/employee/attendance', icon: Clock },
    { name: 'Leave', path: '/employee/leave', icon: Calendar },
    { name: 'Payroll', path: '/employee/payroll', icon: DollarSign },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-800/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 
        transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-auto lg:min-h-screen flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Dayflow</span>
          </div>
          <button 
            className="lg:hidden text-slate-500 hover:text-slate-700 focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-200">
          <NavLink
            to="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
