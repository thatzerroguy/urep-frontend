'use client';

import React from 'react';
import { 
  Users, 
  MapPin, 
  AppWindow, 
  BadgeCheck, 
  GraduationCap
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

import { mockRegistrations } from '@/data/mockRegistrations';

const dashboardStats = {
  totalRegistrations: mockRegistrations.length,
  activePrograms: 6,
  statesReached: new Set(mockRegistrations.map(r => r.state)).size,
  lgasCovered: 120, // Mocked value
  youthOrganizations: 45, // Mocked value
  geopoliticalZonesCovered: 6,
  completionRate: "95%",
  femaleParticipation: "48%"
};

export default function AdminDashboard() {
  // Aggregate data for Geographic Distribution
  const geoMap = new Map();
  const zoneAbbreviations: Record<string, string> = {
    'North Central': 'NC', 'North East': 'NE', 'North West': 'NW', 
    'South East': 'SE', 'South South': 'SS', 'South West': 'SW'
  };
  mockRegistrations.forEach(r => {
    const abbr = zoneAbbreviations[r.geopoliticalZone] || r.geopoliticalZone;
    geoMap.set(abbr, (geoMap.get(abbr) || 0) + 1);
  });
  const geoData = Array.from(geoMap.entries()).map(([name, count]) => ({ name, count }));

  // Aggregate data for Program Enrollment
  const colors = ['#2E6E65', '#F59E0B', '#3B82F6', '#8B5CF6', '#EF4444', '#10B981'];
  const progMap = new Map();
  mockRegistrations.forEach(r => {
    progMap.set(r.program, (progMap.get(r.program) || 0) + 1);
  });
  const programData = Array.from(progMap.entries()).map(([name, value], i) => ({ 
    name, value, color: colors[i % colors.length] 
  }));

  // Aggregate data for Registration Trend (Monthly)
  const monthMap = new Map();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  mockRegistrations.forEach(r => {
    const date = new Date(r.dateRegistered);
    const label = `${monthNames[date.getMonth()]} ${date.getFullYear().toString().substring(2)}`;
    monthMap.set(label, (monthMap.get(label) || 0) + 1);
  });
  // Sort months chronologically by rebuilding dates
  const trendData = Array.from(monthMap.entries()).map(([name, value]) => {
     const [mName, yyyy] = name.split(' ');
     const d = new Date(Number(`20${yyyy}`), monthNames.indexOf(mName), 1);
     return { name, value, sortVal: d.getTime() };
  }).sort((a, b) => a.sortVal - b.sortVal).map(({name, value}) => ({name, value}));

  // Aggregate data for Demographics (Gender)
  const genderMap = new Map();
  mockRegistrations.forEach(r => {
    genderMap.set(r.gender, (genderMap.get(r.gender) || 0) + 1);
  });
  const demoData = Array.from(genderMap.entries()).map(([name, value]) => ({ 
    name, value, color: name === 'Female' ? '#E11D48' : '#3B82F6' 
  }));

  return (
    <div className="p-8 pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111111] tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Youth program analytics across all registered programs</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-[#e6f4f1] flex items-center justify-center mb-4 text-[#2E6E65]">
            <Users size={16} />
          </div>
          <div className="text-3xl font-bold text-[#111111] mb-1 tracking-tight">{dashboardStats.totalRegistrations}</div>
          <div className="text-xs font-medium text-gray-500">Total Registrations</div>
          <div className="absolute top-5 right-5 text-[10px] font-bold text-[#2E6E65] bg-[#e6f4f1] px-2 py-0.5 rounded-full">Active</div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-500">
            <AppWindow size={16} />
          </div>
          <div className="text-3xl font-bold text-[#111111] mb-1 tracking-tight">{dashboardStats.activePrograms}</div>
          <div className="text-xs font-medium text-gray-500">Active Programs</div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mb-4 text-purple-500">
            <MapPin size={16} />
          </div>
          <div className="text-3xl font-bold text-[#111111] mb-1 tracking-tight">{dashboardStats.geopoliticalZonesCovered}/6</div>
          <div className="text-xs font-medium text-gray-500">Geopolitical Zones</div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-orange-500">
            <BadgeCheck size={16} />
          </div>
          <div className="text-3xl font-bold text-[#111111] mb-1 tracking-tight">{dashboardStats.completionRate}%</div>
          <div className="text-xs font-medium text-gray-500">Completion Rate</div>
          <div className="text-[10px] text-gray-400 mt-1">Est. Avg</div>
        </div>

        {/* Card 5 */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="w-8 h-8 rounded-full bg-[#f4f4f4] flex items-center justify-center mb-4 text-gray-600">
            <GraduationCap size={16} />
          </div>
          <div className="text-3xl font-bold text-[#111111] mb-1 tracking-tight">{dashboardStats.femaleParticipation}%</div>
          <div className="text-xs font-medium text-gray-500">Female Participation</div>
          <div className="text-[10px] text-gray-400 mt-1">Across all zones</div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Geographic Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="mb-6">
            <h3 className="text-[15px] font-semibold text-[#111111]">Geographic Distribution</h3>
            <p className="text-xs text-gray-500 mt-1">Registrations by geopolitical zone</p>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geoData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#888' }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#888' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f9f9f9' }} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '12px' }} 
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {geoData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={[ '#F59E0B', '#2E6E65', '#2E6E65', '#3B82F6', '#2E6E65', '#8B5CF6' ][index % 6]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
            <div className="flex items-center text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-[#F59E0B] mr-1.5"/> SE = South East</div>
            <div className="flex items-center text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-[#2E6E65] mr-1.5"/> NC = North Central</div>
            <div className="flex items-center text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-[#2E6E65] mr-1.5"/> NW = North West</div>
            <div className="flex items-center text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-[#3B82F6] mr-1.5"/> SW = South West</div>
            <div className="flex items-center text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-[#2E6E65] mr-1.5"/> NE = North East</div>
            <div className="flex items-center text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-[#8B5CF6] mr-1.5"/> SS = South South</div>
          </div>
        </div>

        {/* Program Enrollment */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="mb-6">
            <h3 className="text-[15px] font-semibold text-[#111111]">Program Enrollment</h3>
            <p className="text-xs text-gray-500 mt-1">Distribution across active programs</p>
          </div>
          <div className="flex h-[280px] items-center">
            <div className="w-1/2 h-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={programData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {programData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '12px' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Inner Circle Label (Optional, left blank to match design) */}
            </div>
            {/* Custom Legend for Pie */}
            <div className="w-1/2 pl-4 flex flex-col justify-center space-y-4">
              {programData.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-[#111111]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Trend */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="mb-6">
            <h3 className="text-[15px] font-semibold text-[#111111]">Registration Trend</h3>
            <p className="text-xs text-gray-500 mt-1">Monthly new registrations over time</p>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E6E65" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2E6E65" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#888' }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#888' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '12px' }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2E6E65" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorTrend)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[15px] font-semibold text-[#111111]">Demographics</h3>
              <p className="text-xs text-gray-500 mt-1">Breakdown by demographic field</p>
            </div>
            <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-100">
              <button className="px-3 py-1 text-[11px] font-medium bg-white shadow-sm rounded-md text-[#111111]">Gender</button>
              <button className="px-3 py-1 text-[11px] font-medium text-gray-500 hover:text-gray-900">Status</button>
              <button className="px-3 py-1 text-[11px] font-medium text-gray-500 hover:text-gray-900">Age Bracket</button>
            </div>
          </div>
          <div className="h-[250px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demoData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#333' }} width={60} />
                <Tooltip 
                  cursor={{ fill: '#f9f9f9' }} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '12px' }} 
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {demoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
