import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/auth/Login';
import EmployeeDashboard from './pages/employee/Dashboard';
import Profile from './pages/employee/Profile';
import Attendance from './pages/employee/Attendance';
import EmployeeLeave from './pages/employee/Leave';
import EmployeePayroll from './pages/employee/Payroll';
import HRLeaveRequests from './pages/hr/LeaveRequests';
import HRPayroll from './pages/hr/Payroll';
import Unauthorized from './pages/auth/Unauthorized'; // Optional: Add an unauthorized page

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext'; // Required for tracking user session
import { LeaveProvider } from './context/LeaveContext';
import { PayrollProvider } from './context/PayrollContext';

// Protected Route Wrapper Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth(); // Assume user object has a 'role' property (e.g., 'employee' or 'hr')

  if (loading) return <div>Loading...</div>; // Prevent flash of redirect during auth check

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <PayrollProvider>
        <LeaveProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Shared Employee / Base Routes */}
              <Route 
                path="/employee/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['employee', 'hr']}>
                    <EmployeeDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employee/profile" 
                element={
                  <ProtectedRoute allowedRoles={['employee', 'hr']}>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employee/attendance" 
                element={
                  <ProtectedRoute allowedRoles={['employee', 'hr']}>
                    <Attendance />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employee/leave" 
                element={
                  <ProtectedRoute allowedRoles={['employee', 'hr']}>
                    <EmployeeLeave />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employee/payroll" 
                element={
                  <ProtectedRoute allowedRoles={['employee', 'hr']}>
                    <EmployeePayroll />
                  </ProtectedRoute>
                } 
              />

              {/* HR Specific Routes */}
              <Route 
                path="/hr/leave" 
                element={
                  <ProtectedRoute allowedRoles={['hr']}>
                    <HRLeaveRequests />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/hr/payroll" 
                element={
                  <ProtectedRoute allowedRoles={['hr']}>
                    <HRPayroll />
                  </ProtectedRoute>
                } 
              />

              {/* Catch-all Redirect */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </LeaveProvider>
      </PayrollProvider>
    </AuthProvider>
  );
}

export default App;
