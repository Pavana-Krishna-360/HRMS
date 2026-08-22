import React, { createContext, useState, useContext } from 'react';

const LeaveContext = createContext();

export const useLeave = () => useContext(LeaveContext);

const INITIAL_LEAVE_REQUESTS = [
  {
    id: "LR001",
    employeeId: "EMP001",
    employeeName: "Sarah Jenkins",
    leaveType: "Casual Leave",
    startDate: "2026-08-25",
    endDate: "2026-08-26",
    days: 2,
    reason: "Personal work",
    appliedOn: "2026-08-22",
    status: "Pending",
    hrComment: ""
  },
  {
    id: "LR002",
    employeeId: "EMP001",
    employeeName: "Sarah Jenkins",
    leaveType: "Sick Leave",
    startDate: "2026-08-12",
    endDate: "2026-08-12",
    days: 1,
    reason: "Medical appointment",
    appliedOn: "2026-08-10",
    status: "Approved",
    hrComment: "Approved. Take care."
  },
  {
    id: "LR003",
    employeeId: "EMP001",
    employeeName: "Sarah Jenkins",
    leaveType: "Casual Leave",
    startDate: "2026-07-20",
    endDate: "2026-07-22",
    days: 3,
    reason: "Family event",
    appliedOn: "2026-07-15",
    status: "Declined",
    hrComment: "Declined due to critical release schedule."
  }
];

export const LeaveProvider = ({ children }) => {
  const [leaveRequests, setLeaveRequests] = useState(INITIAL_LEAVE_REQUESTS);

  const applyLeave = (newRequest) => {
    const id = `LR00${leaveRequests.length + 1}`;
    setLeaveRequests(prev => [{ ...newRequest, id, status: 'Pending', hrComment: '' }, ...prev]);
  };

  const approveLeave = (id) => {
    setLeaveRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: 'Approved', hrComment: 'Approved.' } : req)
    );
  };

  const declineLeave = (id, reason) => {
    setLeaveRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: 'Declined', hrComment: reason } : req)
    );
  };

  return (
    <LeaveContext.Provider value={{ leaveRequests, applyLeave, approveLeave, declineLeave }}>
      {children}
    </LeaveContext.Provider>
  );
};
