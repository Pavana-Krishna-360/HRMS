import React from 'react';

const InfoCard = ({ label, value }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
    <span className="block text-sm font-medium text-slate-500 mb-1">{label}</span>
    <span className="block text-base font-semibold text-slate-900">{value}</span>
  </div>
);

const JobInformation = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 animate-in fade-in duration-300">
      <InfoCard label="Employee ID" value={data.employeeId} />
      <InfoCard label="Designation" value={data.designation} />
      <InfoCard label="Department" value={data.department} />
      <InfoCard label="Joining Date" value={data.joiningDate} />
      <InfoCard label="Employment Type" value={data.employmentType} />
      <InfoCard label="Reporting Manager" value={data.reportingManager} />
      <InfoCard label="Work Location" value={data.workLocation} />
      <InfoCard label="Employment Status" value={data.employmentStatus} />
    </div>
  );
};

export default JobInformation;
