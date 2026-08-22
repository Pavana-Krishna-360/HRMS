import React from 'react';
import { User, Briefcase, IndianRupee, FileText } from 'lucide-react';

const tabs = [
  { id: 'personal', label: 'Personal Information', icon: User },
  { id: 'job', label: 'Job & Department', icon: Briefcase },
  { id: 'salary', label: 'Salary Structure', icon: IndianRupee },
  { id: 'documents', label: 'Documents Vault', icon: FileText }
];

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-slate-200 mt-2">
      <nav className="flex space-x-6 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors focus:outline-none ${
                isActive
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <tab.icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProfileTabs;
