'use client';
import React from 'react';
import {
  FaBriefcase,
  FaCalendarAlt,
  FaChartPie,
  FaEnvelope,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhone,
  FaSearch,
  FaUser
} from 'react-icons/fa';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export default function RegistrantsPage() {
  // Mock data for charts
  const statusData = [
    { name: 'Completed', value: 65 },
    { name: 'Pending', value: 35 }
  ];

  const programData = [
    { name: 'National Youth', value: 45 },
    { name: 'African Youth', value: 30 },
    { name: 'Bakeprenuer', value: 25 }
  ];

  // Colors for charts
  const STATUS_COLORS = ['#00C49F', '#FFBB28'];
  const PROGRAM_COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Mock data for demonstration
  const registrants = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '08012345678', 
      status: 'Completed',
      dob: '1990-05-15',
      address: '123 Main St, Lagos',
      education: 'Bachelor of Science',
      occupation: 'Software Engineer',
      program: 'National Youth Program',
      registrationDate: '2023-10-05'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      phone: '08023456789', 
      status: 'Pending',
      dob: '1992-08-22',
      address: '456 Oak Ave, Abuja',
      education: 'Master of Arts',
      occupation: 'Teacher',
      program: 'African Youth Program',
      registrationDate: '2023-10-10'
    },
    { 
      id: 3, 
      name: 'Robert Johnson', 
      email: 'robert@example.com', 
      phone: '08034567890', 
      status: 'Completed',
      dob: '1988-12-03',
      address: '789 Pine Rd, Port Harcourt',
      education: 'PhD in Economics',
      occupation: 'Researcher',
      program: 'Bakeprenuer Program',
      registrationDate: '2023-09-28'
    },
  ];

  // State for selected registrant (in a real app, this would use React.useState)
  const selectedRegistrant = registrants[0]; // Default to first registrant for demo

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Registrants</h1>
        <p className="text-gray-600">Search and view detailed information about registrants</p>
      </div>

      {/* Charts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaChartPie className="text-green-600 mr-2" />
            <h2 className="text-lg sm:text-xl font-semibold">Registration Status</h2>
          </div>
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex items-center mb-3 sm:mb-4">
            <FaChartPie className="text-green-600 mr-2" />
            <h2 className="text-lg sm:text-xl font-semibold">Program Distribution</h2>
          </div>
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={programData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Legend wrapperStyle={{fontSize: '12px'}} />
                <Bar dataKey="value" name="Registrants" fill="#8884d8">
                  {programData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PROGRAM_COLORS[index % PROGRAM_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Search and Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Panel */}
        <div className="col-span-1 bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Search Registrants</h2>

          {/* Search Input */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Filters */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Filter by Status</h3>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" checked />
                <span className="ml-2 text-sm sm:text-base">All</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
                <span className="ml-2 text-sm sm:text-base">Completed</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
                <span className="ml-2 text-sm sm:text-base">Pending</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Filter by Program</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" checked />
                <span className="ml-2 text-sm sm:text-base">All Programs</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
                <span className="ml-2 text-sm sm:text-base">National Youth Program</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
                <span className="ml-2 text-sm sm:text-base">African Youth Program</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
                <span className="ml-2 text-sm sm:text-base">Bakeprenuer Program</span>
              </label>
            </div>
          </div>

          {/* Registrants List */}
          <div>
            <h3 className="font-medium mb-2">Results</h3>
            <div className="space-y-2">
              {registrants.map(registrant => (
                <div 
                  key={registrant.id}
                  className={`p-3 rounded-md cursor-pointer ${
                    selectedRegistrant.id === registrant.id 
                      ? 'bg-green-100 border border-green-300' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">{registrant.name}</div>
                  <div className="text-sm text-gray-600">{registrant.email}</div>
                  <div className="text-sm text-gray-600">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      registrant.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {registrant.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Registrant Details */}
        <div className="col-span-1 lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Registrant Profile</h2>

          {selectedRegistrant ? (
            <div>
              {/* Basic Info */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 pb-2 border-b">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <FaUser className="mt-1 mr-2 text-green-600" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Full Name</div>
                      <div className="text-sm sm:text-base font-medium">{selectedRegistrant.name}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaEnvelope className="mt-1 mr-2 text-green-600" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Email Address</div>
                      <div className="text-sm sm:text-base font-medium">{selectedRegistrant.email}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaPhone className="mt-1 mr-2 text-green-600" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Phone Number</div>
                      <div className="text-sm sm:text-base font-medium">{selectedRegistrant.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCalendarAlt className="mt-1 mr-2 text-green-600" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Date of Birth</div>
                      <div className="text-sm sm:text-base font-medium">{selectedRegistrant.dob}</div>
                    </div>
                  </div>
                  <div className="flex items-start col-span-1 sm:col-span-2">
                    <FaMapMarkerAlt className="mt-1 mr-2 text-green-600" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Address</div>
                      <div className="text-sm sm:text-base font-medium">{selectedRegistrant.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education & Occupation */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 pb-2 border-b">Education & Occupation</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <FaGraduationCap className="mt-1 mr-2 text-green-600" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Education</div>
                      <div className="text-sm sm:text-base font-medium">{selectedRegistrant.education}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaBriefcase className="mt-1 mr-2 text-green-600" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Occupation</div>
                      <div className="text-sm sm:text-base font-medium">{selectedRegistrant.occupation}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Program Information */}
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 pb-2 border-b">Program Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-2 text-green-600">📋</div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Program</div>
                      <div className="text-sm sm:text-base font-medium">{selectedRegistrant.program}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCalendarAlt className="mt-1 mr-2 text-green-600" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Registration Date</div>
                      <div className="text-sm sm:text-base font-medium">{selectedRegistrant.registrationDate}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-2 text-green-600">🔄</div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Status</div>
                      <div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedRegistrant.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedRegistrant.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm sm:text-base">Select a registrant to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
