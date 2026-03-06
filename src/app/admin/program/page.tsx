'use client';
import React, {useState} from 'react';
import {FaDownload, FaSearch} from 'react-icons/fa';
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

export default function ProgramStatistics() {
  // State for selected program
  const [selectedProgram, setSelectedProgram] = useState('youth_migration');

  // List of available programs
  const programs = [
    { id: 'youth_migration', name: 'Youth Migration Awareness and Management Programme (YMAMP)' },
    { id: 'youth_mental', name: 'National Youth Mental Health Conference' },
    { id: 'national_youth', name: 'National Youth Conference' },
    { id: 'african_youth', name: 'African Youth Conference' },
    { id: 'bakeprenuer', name: 'Bakeprenuer Program' },
  ];

  // Program-specific mock data
  const programData = {
    youth_migration: {
      stats: {
        totalRegistrations: 850,
        completedRegistrations: 620,
        incompleteRegistrations: 230
      },
      demographics: [
        { name: '18-24', value: 320 },
        { name: '25-30', value: 280 },
        { name: '31-35', value: 150 },
        { name: '36+', value: 100 }
      ],
      geographical: [
        { name: 'North Central', value: 180 },
        { name: 'North East', value: 120 },
        { name: 'North West', value: 150 },
        { name: 'South East', value: 140 },
        { name: 'South South', value: 130 },
        { name: 'South West', value: 130 }
      ],
      registrationStatus: [
        { name: 'Completed', value: 620 },
        { name: 'Incomplete', value: 230 }
      ],
      professionalStatus: [
        { name: 'Youth Professional', value: 350 },
        { name: 'Non-Professional', value: 500 }
      ]
    },
    youth_mental: {
      stats: {
        totalRegistrations: 720,
        completedRegistrations: 480,
        incompleteRegistrations: 240
      },
      demographics: [
        { name: '18-24', value: 250 },
        { name: '25-30', value: 220 },
        { name: '31-35', value: 180 },
        { name: '36+', value: 70 }
      ],
      geographical: [
        { name: 'North Central', value: 150 },
        { name: 'North East', value: 100 },
        { name: 'North West', value: 120 },
        { name: 'South East', value: 130 },
        { name: 'South South', value: 110 },
        { name: 'South West', value: 110 }
      ],
      registrationStatus: [
        { name: 'Completed', value: 480 },
        { name: 'Incomplete', value: 240 }
      ],
      professionalStatus: [
        { name: 'Mental Health Professional', value: 320 },
        { name: 'Non-Professional', value: 400 }
      ]
    },
    national_youth: {
      stats: {
        totalRegistrations: 1200,
        completedRegistrations: 950,
        incompleteRegistrations: 250
      },
      demographics: [
        { name: '18-24', value: 450 },
        { name: '25-30', value: 380 },
        { name: '31-35', value: 220 },
        { name: '36+', value: 150 }
      ],
      geographical: [
        { name: 'North Central', value: 220 },
        { name: 'North East', value: 180 },
        { name: 'North West', value: 210 },
        { name: 'South East', value: 190 },
        { name: 'South South', value: 200 },
        { name: 'South West', value: 200 }
      ],
      registrationStatus: [
        { name: 'Completed', value: 950 },
        { name: 'Incomplete', value: 250 }
      ],
      professionalStatus: [
        { name: 'Youth Leader', value: 480 },
        { name: 'Student', value: 720 }
      ]
    },
    african_youth: {
      stats: {
        totalRegistrations: 950,
        completedRegistrations: 680,
        incompleteRegistrations: 270
      },
      demographics: [
        { name: '18-24', value: 350 },
        { name: '25-30', value: 300 },
        { name: '31-35', value: 200 },
        { name: '36+', value: 100 }
      ],
      geographical: [
        { name: 'North Central', value: 160 },
        { name: 'North East', value: 140 },
        { name: 'North West', value: 170 },
        { name: 'South East', value: 150 },
        { name: 'South South', value: 160 },
        { name: 'South West', value: 170 }
      ],
      registrationStatus: [
        { name: 'Completed', value: 680 },
        { name: 'Incomplete', value: 270 }
      ],
      professionalStatus: [
        { name: 'African Delegate', value: 420 },
        { name: 'Local Participant', value: 530 }
      ]
    },
    bakeprenuer: {
      stats: {
        totalRegistrations: 580,
        completedRegistrations: 420,
        incompleteRegistrations: 160
      },
      demographics: [
        { name: '18-24', value: 180 },
        { name: '25-30', value: 220 },
        { name: '31-35', value: 120 },
        { name: '36+', value: 60 }
      ],
      geographical: [
        { name: 'North Central', value: 110 },
        { name: 'North East', value: 80 },
        { name: 'North West', value: 90 },
        { name: 'South East', value: 100 },
        { name: 'South South', value: 90 },
        { name: 'South West', value: 110 }
      ],
      registrationStatus: [
        { name: 'Completed', value: 420 },
        { name: 'Incomplete', value: 160 }
      ],
      professionalStatus: [
        { name: 'Baker', value: 280 },
        { name: 'Entrepreneur', value: 300 }
      ]
    }
  };

  // Get current program data
  // @ts-expect-error: just expect error
  const currentData = programData[selectedProgram];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Handle program change
  const handleProgramChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedProgram(e.target.value);
  };

  // Function to handle data download
  const handleDownload = () => {
    // Create a JSON object with all the program data
    const dataToDownload = {
      program: programs.find(p => p.id === selectedProgram)?.name,
      statistics: currentData.stats,
      demographics: currentData.demographics,
      geographical: currentData.geographical,
      registrationStatus: currentData.registrationStatus,
      professionalStatus: currentData.professionalStatus
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(dataToDownload, null, 2);

    // Create a blob and download link
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedProgram}_statistics.json`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Program Statistics</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Program Selector */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <label htmlFor="program-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Program
        </label>
        <select
          id="program-select"
          value={selectedProgram}
          onChange={handleProgramChange}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        >
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      {/* Registration Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 mb-2">Total Registrations</h3>
          <p className="text-3xl font-bold">{currentData.stats.totalRegistrations}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 mb-2">Completed Registrations</h3>
          <p className="text-3xl font-bold">{currentData.stats.completedRegistrations}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 mb-2">Incomplete Registrations</h3>
          <p className="text-3xl font-bold">{currentData.stats.incompleteRegistrations}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Demographics Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Participant Demographics (Age)</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData.demographics}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {currentData.demographics.map((entry: string, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographical Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Geographical Distribution</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentData.geographical}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#277B12" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Registration Status Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Registration Status</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData.registrationStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#00C49F" />
                  <Cell fill="#FF8042" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Professional Status Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Professional Status</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData.professionalStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#8884D8" />
                  <Cell fill="#82CA9D" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-8 mb-4">
        <button
          onClick={handleDownload}
          className="flex items-center bg-[#277B12] text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
        >
          <FaDownload className="mr-2" />
          Download Program Statistics
        </button>
      </div>
    </div>
  );
}
