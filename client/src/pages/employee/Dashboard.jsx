import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/employee/StatCard';
import QuickAction from '../../components/employee/QuickAction';
import RecentActivity from '../../components/employee/RecentActivity';
import { 
  CheckCircle, 
  CalendarDays, 
  Clock, 
  IndianRupee, 
  FileText, 
  User, 
  CalendarPlus 
} from 'lucide-react';

// MOCK DATA: Isolated to easily replace with API responses later
const MOCK_USER = {
  name: "Sarah Jenkins",
};

const MOCK_STATS = {
  attendance: {
    status: "Present",
    time: "Checked in at 08:52 AM"
  },
  leave: {
    balance: "12 Days",
    label: "Remaining casual/sick leave"
  },
  pendingRequests: {
    count: "2",
    label: "Awaiting HR approval"
  },
  salary: {
    amount: "₹45,000",
    label: "Estimated for this month"
  }
};

const MOCK_ACTIVITIES = [
  {
    id: 1,
    title: "Leave request approved",
    description: "Your casual leave for next Friday was approved by HR.",
    time: "Today, 11:30 AM",
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    id: 2,
    title: "Attendance marked",
    description: "Clocked in for the day.",
    time: "Today, 08:52 AM",
    icon: Clock,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    id: 3,
    title: "Leave request submitted",
    description: "Applied for 2 days sick leave.",
    time: "Yesterday, 04:15 PM",
    icon: FileText,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600"
  },
  {
    id: 4,
    title: "Profile updated",
    description: "Changed emergency contact details.",
    time: "Mon, 10:00 AM",
    icon: User,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600"
  }
];

const EmployeeDashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back, {MOCK_USER.name}
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Here's what's happening with your workday.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard 
            title="Today's Attendance"
            value={MOCK_STATS.attendance.status}
            subtitle={MOCK_STATS.attendance.time}
            icon={CheckCircle}
            colorClass="bg-emerald-100 text-emerald-600"
          />
          <StatCard 
            title="Leave Balance"
            value={MOCK_STATS.leave.balance}
            subtitle={MOCK_STATS.leave.label}
            icon={CalendarDays}
            colorClass="bg-blue-100 text-blue-600"
          />
          <StatCard 
            title="Pending Requests"
            value={MOCK_STATS.pendingRequests.count}
            subtitle={MOCK_STATS.pendingRequests.label}
            icon={Clock}
            colorClass="bg-amber-100 text-amber-600"
          />
          <StatCard 
            title="Monthly Salary"
            value={MOCK_STATS.salary.amount}
            subtitle={MOCK_STATS.salary.label}
            icon={IndianRupee}
            colorClass="bg-indigo-100 text-indigo-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity activities={MOCK_ACTIVITIES} />
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <QuickAction 
                title="Check In/Out" 
                icon={Clock} 
                to="/employee/attendance" 
              />
              <QuickAction 
                title="Apply Leave" 
                icon={CalendarPlus} 
                to="/employee/leave" 
              />
              <QuickAction 
                title="View Profile" 
                icon={User} 
                to="/employee/profile" 
              />
              <QuickAction 
                title="Payslips" 
                icon={FileText} 
                to="/employee/payroll" 
              />
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
