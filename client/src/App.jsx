import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import EmployeeDashboard from './pages/employee/Dashboard';
import Profile from './pages/employee/Profile';
import Attendance from './pages/employee/Attendance';
import EmployeeLeave from './pages/employee/Leave';
import HRLeaveRequests from './pages/hr/LeaveRequests';
import EmployeePayroll from './pages/employee/Payroll';
import HRPayroll from './pages/hr/Payroll';
import { LeaveProvider } from './context/LeaveContext';
import { PayrollProvider } from './context/PayrollContext';

function App() {
  return (
    <PayrollProvider>
      <LeaveProvider>
      <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/profile" element={<Profile />} />
        <Route path="/employee/attendance" element={<Attendance />} />
        <Route path="/employee/leave" element={<EmployeeLeave />} />
        <Route path="/employee/payroll" element={<EmployeePayroll />} />
        <Route path="/hr/leave" element={<HRLeaveRequests />} />
        <Route path="/hr/payroll" element={<HRPayroll />} />
        {/* Redirect root to login for now */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    </LeaveProvider>
    </PayrollProvider>
  );
}

export default App;
