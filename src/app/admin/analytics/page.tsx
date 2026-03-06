'use client';
import React from 'react';
import {FaCalendarAlt, FaFilter} from 'react-icons/fa';
import {
  Area,
  AreaChart,
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

export default function AnalyticsPage() {
  // Mock data for charts
  const registrationTrendData = [
    { name: 'Jan 1', registrations: 40 },
    { name: 'Jan 5', registrations: 30 },
    { name: 'Jan 10', registrations: 45 },
    { name: 'Jan 15', registrations: 55 },
    { name: 'Jan 20', registrations: 65 },
    { name: 'Jan 25', registrations: 75 },
    { name: 'Jan 30', registrations: 85 },
    { name: 'Feb 5', registrations: 95 },
    { name: 'Feb 10', registrations: 105 },
    { name: 'Feb 15', registrations: 90 },
    { name: 'Feb 20', registrations: 120 },
    { name: 'Feb 25', registrations: 110 },
    { name: 'Mar 1', registrations: 125 },
    { name: 'Mar 5', registrations: 130 },
  ];

  const completionRateData = [
    { name: 'Completed', value: 780 },
    { name: 'Pending', value: 220 },
  ];

  const ageGroupData = [
    { name: '18-24', value: 350 },
    { name: '25-34', value: 450 },
    { name: '35-44', value: 280 },
    { name: '45+', value: 170 },
  ];

  const stateDistributionData = [
    { name: 'Lagos', value: 250 },
    { name: 'Abuja', value: 180 },
    { name: 'Kano', value: 150 },
    { name: 'Rivers', value: 120 },
    { name: 'Oyo', value: 100 },
    { name: 'Others', value: 450 },
  ];

  const programPopularityData = [
    { name: 'National Youth', value: 450 },
    { name: 'African Youth', value: 380 },
    { name: 'Bakeprenuer', value: 420 },
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  const COMPLETION_COLORS = ['#00C49F', '#FFBB28'];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-600">Detailed analytics and insights about registrations and participants</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            {/* Date Range Picker */}
            <div className="relative w-full sm:w-auto">
              <div className="flex items-center border rounded-md px-3 py-2 w-full">
                <FaCalendarAlt className="text-gray-400 mr-2" />
                <span>Last 30 days</span>
              </div>
            </div>

            {/* Program Filter */}
            <div className="relative w-full sm:w-auto">
              <select className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none">
                <option value="">All Programs</option>
                <option value="national">National Youth Program</option>
                <option value="african">African Youth Program</option>
                <option value="bakeprenuer">Bakeprenuer Program</option>
              </select>
              <FaFilter className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Registration Trends */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Registration Trends</h2>
          <div className="h-60 sm:h-70 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={registrationTrendData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Legend wrapperStyle={{fontSize: '12px'}} />
                <Area type="monotone" dataKey="registrations" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Completion Rate</h2>
          <div className="h-60 sm:h-70 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionRateData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {completionRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COMPLETION_COLORS[index % COMPLETION_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}`, 'Registrations']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Participant Demographics */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Participant Demographics</h2>
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageGroupData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ageGroupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}`, 'Participants']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographical Distribution */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Geographical Distribution</h2>
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stateDistributionData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{fontSize: 12}} />
                <YAxis dataKey="name" type="category" width={50} tick={{fontSize: 12}} />
                <Tooltip />
                <Legend wrapperStyle={{fontSize: '12px'}} />
                <Bar dataKey="value" name="Registrations" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Program Popularity */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Program Popularity</h2>
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={programPopularityData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Legend wrapperStyle={{fontSize: '12px'}} />
                <Bar dataKey="value" name="Registrations" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Detailed Statistics</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Registrations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">National Youth Program</td>
                <td className="px-6 py-4 whitespace-nowrap">450</td>
                <td className="px-6 py-4 whitespace-nowrap">350</td>
                <td className="px-6 py-4 whitespace-nowrap">100</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">78%</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">African Youth Program</td>
                <td className="px-6 py-4 whitespace-nowrap">380</td>
                <td className="px-6 py-4 whitespace-nowrap">320</td>
                <td className="px-6 py-4 whitespace-nowrap">60</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">84%</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Bakeprenuer Program</td>
                <td className="px-6 py-4 whitespace-nowrap">420</td>
                <td className="px-6 py-4 whitespace-nowrap">310</td>
                <td className="px-6 py-4 whitespace-nowrap">110</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '74%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">74%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
