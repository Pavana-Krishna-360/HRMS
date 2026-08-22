import React from 'react';
import { Link } from 'react-router-dom';

const QuickAction = ({ title, icon: Icon, to, onClick }) => {
  const content = (
    <>
      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-600 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-sm font-medium text-slate-700 group-hover:text-primary-700 transition-colors">
        {title}
      </span>
    </>
  );

  const className = "flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 group hover:border-primary-200 hover:shadow-md transition-all cursor-pointer text-center h-full justify-center";

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${className} w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}>
      {content}
    </button>
  );
};

export default QuickAction;
