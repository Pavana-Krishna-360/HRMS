import React, { useState } from 'react';
import { FileText, Download, Eye, CheckCircle2 } from 'lucide-react';

const DocumentsList = ({ documents }) => {
  const [notification, setNotification] = useState('');

  const handleAction = () => {
    setNotification('Document preview will be available soon.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 border-b border-slate-100 pb-4 gap-2">
        <h3 className="text-lg font-semibold text-slate-800">Documents</h3>
        {notification && (
          <span className="text-sm text-primary-600 font-medium animate-pulse text-left sm:text-right">
            {notification}
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap min-w-[500px]">
          <thead>
            <tr className="text-slate-500 border-b border-slate-200">
              <th className="pb-3 font-medium">Document Name</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Uploaded Date</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-slate-900">{doc.name}</span>
                  </div>
                </td>
                <td className="py-4 text-slate-600">{doc.type}</td>
                <td className="py-4 text-slate-600">{doc.date}</td>
                <td className="py-4">
                  <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-medium w-max">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {doc.status}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={handleAction}
                      className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors focus:outline-none"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleAction}
                      className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors focus:outline-none"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentsList;
