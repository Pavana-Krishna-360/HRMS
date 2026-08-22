import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';

const InputField = ({ label, name, value, onChange, disabled, type = "text" }) => (
  <div className="mb-5">
    <label className="block text-sm font-medium text-slate-500 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm focus:outline-none transition-colors ${
        disabled 
          ? 'bg-transparent border-transparent text-slate-900 font-medium px-0 py-0 shadow-none'
          : 'bg-white border-slate-300 text-slate-900 focus:ring-primary-500 focus:border-primary-500 mt-1'
      }`}
    />
  </div>
);

const PersonalInformation = ({ data, isEditing, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    workEmail: data.contact.workEmail,
    phoneNumber: data.contact.phoneNumber,
    residentialAddress: data.contact.residentialAddress,
    contactName: data.emergency.contactName,
    relationship: data.emergency.relationship,
    emergencyPhone: data.emergency.emergencyPhone
  });

  useEffect(() => {
    setFormData({
      workEmail: data.contact.workEmail,
      phoneNumber: data.contact.phoneNumber,
      residentialAddress: data.contact.residentialAddress,
      contactName: data.emergency.contactName,
      relationship: data.emergency.relationship,
      emergencyPhone: data.emergency.emergencyPhone
    });
  }, [data, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      contact: {
        workEmail: formData.workEmail,
        phoneNumber: formData.phoneNumber,
        residentialAddress: formData.residentialAddress
      },
      emergency: {
        contactName: formData.contactName,
        relationship: formData.relationship,
        emergencyPhone: formData.emergencyPhone
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Contact Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-4">
            Contact Details
          </h3>
          <InputField label="Work Email" name="workEmail" value={formData.workEmail} disabled={true} type="email" />
          <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} disabled={!isEditing} />
          <InputField label="Residential Address" name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} disabled={!isEditing} />
        </div>

        {/* Emergency Contact Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-4">
            Emergency Contact
          </h3>
          <InputField label="Contact Name" name="contactName" value={formData.contactName} onChange={handleChange} disabled={!isEditing} />
          <InputField label="Relationship" name="relationship" value={formData.relationship} onChange={handleChange} disabled={!isEditing} />
          <InputField label="Emergency Phone" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} disabled={!isEditing} />
        </div>

      </div>

      {isEditing && (
        <div className="mt-6 flex items-center justify-end gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <Button variant="outline" className="w-auto" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="w-auto">
            Save Changes
          </Button>
        </div>
      )}
    </form>
  );
};

export default PersonalInformation;
