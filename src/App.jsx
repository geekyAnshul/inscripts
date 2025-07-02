

import React, { useState } from 'react';
import { 
  ChevronDown, 
  Eye, 
  ArrowUpDown, 
  Filter, 
  Grid3X3, 
  Download, 
  Upload, 
  Share2, 
  Plus,
  Search,
  Bell,
  User,
  X,
  Check,
  Edit,
  Trash2
} from 'lucide-react';

function App() {
  // State for the data
  const [data, setData] = useState([
    {
      id: 1,
      jobRequest: "Launch social media campaign for product launch",
      submitted: "15-11-2024",
      status: "In-process",
      submitter: "Aisha Patel",
      url: "www.aishapatel.com",
      assigned: "Sophie Choudhury",
      priority: "Medium",
      dueDate: "20-11-2024",
      estValue: "6,200,000"
    },
    {
      id: 2,
      jobRequest: "Update press kit for company redesign",
      submitted: "28-10-2024",
      status: "Need to start",
      submitter: "Irfan Khan",
      url: "www.irfankhan.com",
      assigned: "Tejas Pandey",
      priority: "High",
      dueDate: "30-10-2024",
      estValue: "3,500,000"
    },
    {
      id: 3,
      jobRequest: "Finalize user testing feedback for app",
      submitted: "05-12-2024",
      status: "In-process",
      submitter: "Mark Johnson",
      url: "www.markjohns.com",
      assigned: "Rachel Lee",
      priority: "Medium",
      dueDate: "10-12-2024",
      estValue: "4,750,000"
    },
    {
      id: 4,
      jobRequest: "Design new features for the website",
      submitted: "10-01-2025",
      status: "Complete",
      submitter: "Emily Green",
      url: "www.emilygreen.com",
      assigned: "Tom Wright",
      priority: "Low",
      dueDate: "15-01-2025",
      estValue: "5,300,000"
    },
    {
      id: 5,
      jobRequest: "Prepare financial report for Q4",
      submitted: "25-01-2025",
      status: "Blocked",
      submitter: "Jessica Brown",
      url: "www.jessicabr.com",
      assigned: "Kevin Smith",
      priority: "Medium",
      dueDate: "30-01-2025",
      estValue: "2,800,000"
    }
  ]);

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All Orders');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'In-process': return 'bg-yellow-100 text-yellow-800';
      case 'Need to start': return 'bg-blue-100 text-blue-800';
      case 'Complete': return 'bg-green-100 text-green-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 font-medium';
      case 'Medium': return 'text-orange-600 font-medium';
      case 'Low': return 'text-blue-600 font-medium';
      default: return 'text-gray-600';
    }
  };

  // Handlers
  const handleEdit = (row) => {
    setEditingId(row.id);
    setEditData({ ...row });
  };

  const handleSave = (id) => {
    setData(data.map(item => item.id === id ? editData : item));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (e, field) => {
    setEditData({
      ...editData,
      [field]: e.target.value
    });
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const handleAddNew = () => {
    const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
    const newRow = {
      id: newId,
      jobRequest: "",
      submitted: new Date().toLocaleDateString('en-GB'),
      status: "Need to start",
      submitter: "",
      url: "",
      assigned: "",
      priority: "Medium",
      dueDate: "",
      estValue: ""
    };
    setData([...data, newRow]);
    setEditingId(newId);
    setEditData(newRow);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + [Object.keys(data[0]), ...data.map(item => Object.values(item))]
        .map(e => e.join(","))
        .join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "spreadsheet_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      const lines = csvData.split("\n");
      const headers = lines[0].split(",");
      const newData = lines.slice(1).map(line => {
        const values = line.split(",");
        return headers.reduce((obj, header, i) => {
          obj[header] = values[i];
          return obj;
        }, {});
      });
      setData(newData);
    };
    reader.readAsText(file);
  };

  const handleShare = () => {
    // In a real app, you would send the shareEmail to your backend
    alert(`Spreadsheet shared with ${shareEmail}`);
    setShareEmail('');
    setShowShareModal(false);
  };

  // Filter data based on search term and active tab
  const filteredData = data.filter(row => {
    const matchesSearch = Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesTab = activeTab === 'All Orders' || 
      (activeTab === 'Pending' && row.status === 'Need to start') ||
      (activeTab === 'Reviewed' && row.status === 'In-process') ||
      (activeTab === 'Arrived' && row.status === 'Complete');
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>📊</span>
            <span>Workspace</span>
            <ChevronDown className="w-4 h-4" />
            <span>Folder 2</span>
            <ChevronDown className="w-4 h-4" />
            <span className="font-medium text-gray-900">Spreadsheet 3</span>
            <span>•••</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search within sheet" 
                className="pl-10 pr-4 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium">John Doe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <span>Tool bar</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <button className="flex items-center space-x-1 hover:text-gray-900">
                <Eye className="w-4 h-4" />
                <span>Hide fields</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-gray-900">
                <ArrowUpDown className="w-4 h-4" />
                <span>Sort</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-gray-900">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-gray-900">
                <Grid3X3 className="w-4 h-4" />
                <span>Cell view</span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              <Download className="w-4 h-4" />
              <span>Import</span>
              <input 
                type="file" 
                accept=".csv" 
                className="hidden" 
                onChange={handleImport}
              />
            </label>
            <button 
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
              onClick={handleExport}
            >
              <Upload className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button 
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setShowShareModal(true)}
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button 
              className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
              onClick={handleAddNew}
            >
              <Plus className="w-4 h-4" />
              <span>New Action</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
            📊 Q3 Financial Overview
          </button>
          <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">
            📄 ABC
          </button>
          <button className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm">
            Answer a question
          </button>
          <button className="px-3 py-1 bg-orange-100 text-orange-800 rounded text-sm">
            Extract
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Spreadsheet */}
      <div className="bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header */}
            <thead>
              <tr className="bg-gray-50">
                <th className="w-8 border border-gray-300 text-xs text-gray-600 text-center py-2">#</th>
                <th className="border border-gray-300 text-xs font-medium text-gray-700 px-3 py-2 text-left min-w-[200px]">
                  <div className="flex items-center space-x-1">
                    <span>📋</span>
                    <span>Job Request</span>
                  </div>
                </th>
                <th className="border border-gray-300 text-xs font-medium text-gray-700 px-3 py-2 text-left w-24">
                  <div className="flex items-center space-x-1">
                    <span>📅</span>
                    <span>Submitted</span>
                  </div>
                </th>
                <th className="border border-gray-300 text-xs font-medium text-gray-700 px-3 py-2 text-left w-24">
                  <div className="flex items-center space-x-1">
                    <span>⚪</span>
                    <span>Status</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="border border-gray-300 text-xs font-medium text-gray-700 px-3 py-2 text-left w-32">
                  <div className="flex items-center space-x-1">
                    <span>👤</span>
                    <span>Submitter</span>
                  </div>
                </th>
                <th className="border border-gray-300 text-xs font-medium text-gray-700 px-3 py-2 text-left w-32">
                  <div className="flex items-center space-x-1">
                    <span>🔗</span>
                    <span>URL</span>
                  </div>
                </th>
                <th className="border border-gray-300 text-xs font-medium text-gray-700 px-3 py-2 text-left w-32">
                  <div className="flex items-center space-x-1">
                    <span>👥</span>
                    <span>Assigned</span>
                  </div>
                </th>
                <th className="border border-gray-300 text-xs font-medium text-gray-700 px-3 py-2 text-left w-24">
                  <div className="flex items-center space-x-1 relative">
                    <span>🎯</span>
                    <span className="border-2 border-red-500 bg-red-50 px-1 rounded">Priority</span>
                  </div>
                </th>
                <th className="border border-gray-300 text-xs font-medium text-gray-700 px-3 py-2 text-left w-24">
                  <div className="flex items-center space-x-1">
                    <span>📅</span>
                    <span>Due Date</span>
                  </div>
                </th>
                <th className="border border-gray-300 text-xs font-medium text-gray-700 px-3 py-2 text-left w-24">
                  <div className="flex items-center space-x-1">
                    <span>💰</span>
                    <span>Est. Value</span>
                  </div>
                </th>
                <th className="border border-gray-300 w-8"></th>
              </tr>
            </thead>
            
            {/* Data Rows */}
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 text-xs text-gray-600 text-center py-2 bg-gray-50">
                    {row.id}
                  </td>
                  <td className="border border-gray-300 text-xs text-gray-900 px-3 py-2">
                    {editingId === row.id ? (
                      <input
                        type="text"
                        value={editData.jobRequest}
                        onChange={(e) => handleChange(e, 'jobRequest')}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      row.jobRequest
                    )}
                  </td>
                  <td className="border border-gray-300 text-xs text-gray-700 px-3 py-2">
                    {editingId === row.id ? (
                      <input
                        type="text"
                        value={editData.submitted}
                        onChange={(e) => handleChange(e, 'submitted')}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      row.submitted
                    )}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {editingId === row.id ? (
                      <select
                        value={editData.status}
                        onChange={(e) => handleChange(e, 'status')}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      >
                        <option value="Need to start">Need to start</option>
                        <option value="In-process">In-process</option>
                        <option value="Complete">Complete</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    ) : (
                      <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusColor(row.status)}`}>
                        {row.status}
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-300 text-xs text-gray-700 px-3 py-2">
                    {editingId === row.id ? (
                      <input
                        type="text"
                        value={editData.submitter}
                        onChange={(e) => handleChange(e, 'submitter')}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      row.submitter
                    )}
                  </td>
                  <td className="border border-gray-300 text-xs text-blue-600 px-3 py-2 underline">
                    {editingId === row.id ? (
                      <input
                        type="text"
                        value={editData.url}
                        onChange={(e) => handleChange(e, 'url')}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      row.url
                    )}
                  </td>
                  <td className="border border-gray-300 text-xs text-gray-700 px-3 py-2">
                    {editingId === row.id ? (
                      <input
                        type="text"
                        value={editData.assigned}
                        onChange={(e) => handleChange(e, 'assigned')}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      row.assigned
                    )}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {editingId === row.id ? (
                      <select
                        value={editData.priority}
                        onChange={(e) => handleChange(e, 'priority')}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    ) : (
                      <span className={`text-xs ${getPriorityColor(row.priority)}`}>
                        {row.priority}
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-300 text-xs text-gray-700 px-3 py-2">
                    {editingId === row.id ? (
                      <input
                        type="text"
                        value={editData.dueDate}
                        onChange={(e) => handleChange(e, 'dueDate')}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      row.dueDate
                    )}
                  </td>
                  <td className="border border-gray-300 text-xs text-gray-700 px-3 py-2">
                    {editingId === row.id ? (
                      <input
                        type="text"
                        value={editData.estValue}
                        onChange={(e) => handleChange(e, 'estValue')}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      row.estValue
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <div className="flex items-center space-x-1">
                      {editingId === row.id ? (
                        <>
                          <button 
                            onClick={() => handleSave(row.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleEdit(row)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(row.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {/* Empty Rows */}
              {Array.from({ length: 5 }, (_, i) => (
                <tr key={`empty-${i}`}>
                  <td className="border border-gray-300 text-xs text-gray-600 text-center py-2 bg-gray-50">
                    {filteredData.length + i + 1}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 h-8"></td>
                  <td className="border border-gray-300 px-3 py-2"></td>
                  <td className="border border-gray-300 px-3 py-2"></td>
                  <td className="border border-gray-300 px-3 py-2"></td>
                  <td className="border border-gray-300 px-3 py-2"></td>
                  <td className="border border-gray-300 px-3 py-2"></td>
                  <td className="border border-gray-300 px-3 py-2"></td>
                  <td className="border border-gray-300 px-3 py-2"></td>
                  <td className="border border-gray-300 px-3 py-2"></td>
                  <td className="border border-gray-300 w-8"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="bg-white border-t border-gray-200">
        <div className="flex items-center space-x-0">
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'All Orders' ? 'text-gray-900 border-b-2 border-blue-500 bg-white' : 'text-gray-600 hover:text-gray-900 bg-gray-50'}`}
            onClick={() => setActiveTab('All Orders')}
          >
            All Orders
          </button>
          <button 
            className={`px-4 py-2 text-sm ${activeTab === 'Pending' ? 'text-gray-900 border-b-2 border-blue-500 bg-white' : 'text-gray-600 hover:text-gray-900 bg-gray-50'}`}
            onClick={() => setActiveTab('Pending')}
          >
            Pending
          </button>
          <button 
            className={`px-4 py-2 text-sm ${activeTab === 'Reviewed' ? 'text-gray-900 border-b-2 border-blue-500 bg-white' : 'text-gray-600 hover:text-gray-900 bg-gray-50'}`}
            onClick={() => setActiveTab('Reviewed')}
          >
            Reviewed
          </button>
          <button 
            className={`px-4 py-2 text-sm ${activeTab === 'Arrived' ? 'text-gray-900 border-b-2 border-blue-500 bg-white' : 'text-gray-600 hover:text-gray-900 bg-gray-50'}`}
            onClick={() => setActiveTab('Arrived')}
          >
            Arrived
          </button>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Share Spreadsheet</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder="Enter email to share with"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;