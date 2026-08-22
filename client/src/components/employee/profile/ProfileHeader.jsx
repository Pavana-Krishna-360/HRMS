import React from 'react';
import { User, Briefcase, Building2, ShieldCheck, Edit3 } from 'lucide-react';
import Button from '../../common/Button';

const ProfileHeader = ({ data, onEdit, isEditing }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
      {/* Avatar */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-sm flex-shrink-0">
        {data.avatar}
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{data.name}</h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-slate-600">
              <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                ID: {data.employeeId}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-slate-400" />
                {data.designation}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                {data.department}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium text-xs border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {data.status}
              </span>
            </div>
          </div>
          
          {!isEditing && (
            <Button 
              variant="outline" 
              className="w-full sm:w-auto py-2 flex-shrink-0" 
              onClick={onEdit}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
