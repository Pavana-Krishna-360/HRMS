import React from 'react';

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Recent Activity</h3>
      
      {activities.length > 0 ? (
        <div className="space-y-6">
          {activities.map((activity, index) => {
            const isLast = index === activities.length - 1;
            
            return (
              <div key={activity.id} className="relative flex gap-4">
                {/* Timeline line */}
                {!isLast && (
                  <div className="absolute top-8 left-4 bottom-[-1.5rem] w-px bg-slate-200 -translate-x-1/2"></div>
                )}
                
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.iconBg} ${activity.iconColor}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 pb-1">
                  <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                  {activity.description && (
                    <p className="text-sm text-slate-500 mt-0.5">{activity.description}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-slate-500 text-center py-4">No recent activity</p>
      )}
    </div>
  );
};

export default RecentActivity;
