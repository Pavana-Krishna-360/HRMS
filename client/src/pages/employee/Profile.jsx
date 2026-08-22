import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProfileHeader from '../../components/employee/profile/ProfileHeader';
import ProfileTabs from '../../components/employee/profile/ProfileTabs';
import PersonalInformation from '../../components/employee/profile/PersonalInformation';
import JobInformation from '../../components/employee/profile/JobInformation';
import SalaryInformation from '../../components/employee/profile/SalaryInformation';
import DocumentsList from '../../components/employee/profile/DocumentsList';

// MOCK DATA: Isolated to easily replace with API responses later
const INITIAL_MOCK_PROFILE = {
  header: {
    name: "Sarah Jenkins",
    employeeId: "EMP-102",
    designation: "Software Engineer",
    department: "Engineering",
    status: "Active",
    avatar: "SJ"
  },
  personal: {
    contact: {
      workEmail: "employee@dayflow.demo",
      phoneNumber: "+1 555 345-6789",
      residentialAddress: "108 Market Street, San Francisco, CA"
    },
    emergency: {
      contactName: "Elena Rivera",
      relationship: "Sister",
      emergencyPhone: "+1 555 432-1098"
    }
  },
  job: {
    employeeId: "EMP-102",
    designation: "Software Engineer",
    department: "Engineering",
    joiningDate: "15 Jan 2024",
    employmentType: "Full Time",
    reportingManager: "John Smith",
    workLocation: "Bengaluru",
    employmentStatus: "Active"
  },
  salary: {
    basicSalary: "₹35,000",
    allowances: "₹15,000",
    deductions: "₹5,000",
    netSalary: "₹45,000"
  },
  documents: [
    { id: 1, name: "Resume", type: "PDF", date: "10 Jan 2024", status: "Verified" },
    { id: 2, name: "Government ID", type: "PDF", date: "10 Jan 2024", status: "Verified" },
    { id: 3, name: "Offer Letter", type: "PDF", date: "15 Jan 2024", status: "Verified" },
    { id: 4, name: "Employment Contract", type: "PDF", date: "15 Jan 2024", status: "Verified" }
  ]
};

const Profile = () => {
  const [profileData, setProfileData] = useState(INITIAL_MOCK_PROFILE);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEditProfile = () => {
    // Switch to personal tab when clicking edit
    setActiveTab('personal');
    setIsEditing(true);
    setSuccessMessage('');
  };

  const handleSavePersonal = (updatedPersonalData) => {
    // Update local state for demonstration
    setProfileData(prev => ({
      ...prev,
      personal: updatedPersonalData
    }));
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully.');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Prevent unsaved changes issues when switching tabs
  const handleTabChange = (tabId) => {
    if (isEditing) {
      setIsEditing(false);
    }
    setActiveTab(tabId);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Success Alert */}
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-md text-sm font-medium flex items-center transition-all animate-in fade-in slide-in-from-top-2">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {successMessage}
          </div>
        )}

        {/* Profile Header Card */}
        <ProfileHeader 
          data={profileData.header} 
          onEdit={handleEditProfile} 
          isEditing={isEditing} 
        />

        {/* Horizontal Tabs */}
        <ProfileTabs 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
        />

        {/* Selected Tab Content Only */}
        <div className="mt-6">
          {activeTab === 'personal' && (
            <PersonalInformation 
              data={profileData.personal} 
              isEditing={isEditing}
              onSave={handleSavePersonal}
              onCancel={handleCancelEdit}
            />
          )}

          {activeTab === 'job' && (
            <JobInformation data={profileData.job} />
          )}

          {activeTab === 'salary' && (
            <SalaryInformation data={profileData.salary} />
          )}

          {activeTab === 'documents' && (
            <div className="animate-in fade-in duration-300">
              <DocumentsList documents={profileData.documents} />
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Profile;
