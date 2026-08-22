import React, { createContext, useState, useContext } from 'react';

const PayrollContext = createContext();

export const usePayroll = () => useContext(PayrollContext);

export const calculateGross = (record) => {
  return (record.basicSalary || 0) + (record.hra || 0) + (record.specialAllowance || 0) + (record.otherAllowance || 0);
};

export const calculateDeductions = (record) => {
  return (record.pf || 0) + (record.professionalTax || 0) + (record.otherDeductions || 0);
};

export const calculateNet = (record) => {
  return calculateGross(record) - calculateDeductions(record);
};

const INITIAL_PAYROLL_RECORDS = [
  {
    id: "PAY001",
    employeeId: "EMP001",
    employeeName: "Sarah Jenkins",
    designation: "Software Engineer",
    department: "Engineering",
    month: "August 2026",
    basicSalary: 40000,
    hra: 10000,
    specialAllowance: 7000,
    otherAllowance: 3000,
    pf: 4800,
    professionalTax: 200,
    otherDeductions: 3000,
    status: "Processed",
    processedDate: "2026-08-31"
  },
  {
    id: "PAY002",
    employeeId: "EMP001",
    employeeName: "Sarah Jenkins",
    designation: "Software Engineer",
    department: "Engineering",
    month: "July 2026",
    basicSalary: 40000,
    hra: 10000,
    specialAllowance: 7000,
    otherAllowance: 3000,
    pf: 4800,
    professionalTax: 200,
    otherDeductions: 2500,
    status: "Processed",
    processedDate: "2026-07-31"
  },
  {
    id: "PAY003",
    employeeId: "EMP002",
    employeeName: "Rahul Kumar",
    designation: "UI/UX Designer",
    department: "Design",
    month: "August 2026",
    basicSalary: 35000,
    hra: 10000,
    specialAllowance: 5000,
    otherAllowance: 5000,
    pf: 4200,
    professionalTax: 200,
    otherDeductions: 2100,
    status: "Pending",
    processedDate: null
  }
];

export const PayrollProvider = ({ children }) => {
  const [payrollRecords, setPayrollRecords] = useState(INITIAL_PAYROLL_RECORDS);

  const updatePayroll = (id, updatedData) => {
    setPayrollRecords(prev => prev.map(record => {
      if (record.id === id) {
        return { ...record, ...updatedData };
      }
      return record;
    }));
  };

  const processPayroll = (id) => {
    setPayrollRecords(prev => prev.map(record => {
      if (record.id === id) {
        return { 
          ...record, 
          status: 'Processed', 
          processedDate: new Date().toISOString().split('T')[0] 
        };
      }
      return record;
    }));
  };

  return (
    <PayrollContext.Provider value={{ 
      payrollRecords, 
      updatePayroll, 
      processPayroll 
    }}>
      {children}
    </PayrollContext.Provider>
  );
};
