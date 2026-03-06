'use client';

import React, { useState, useMemo } from 'react';
import {
  Plus, X, ArrowRight, FileSpreadsheet, ChevronDown, Filter,
  Search, BarChart3, PieChart as PieChartIcon, LineChart,
  Settings, Users, Globe, Briefcase, Sparkles,
  Layout, History, ChevronRight, Check, Calendar, TrendingUp, Download
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  Tooltip as RechartsTooltip, Legend, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, LineChart as ReLineChart, Line
} from 'recharts';
import * as XLSX from 'xlsx';
import { mockRegistrations, RegistrationData } from '@/data/mockRegistrations';

const CATEGORIES = [
  {
    id: 'demographics',
    name: 'Demographics',
    icon: <Users size={14} />,
    params: ['Gender', 'Geopolitical Zone', 'State', 'Youth Bracket (18-35)', 'Current Status']
  },
  {
    id: 'engagement',
    name: 'Engagement',
    icon: <Globe size={14} />,
    params: [
      'Youth Professional', 
      'Sponsoring Organization', 
      'Previous FMYD Program Participation', 
      'Stakeholder Category',
      'Belongs to Youth Organization',
      'Previous Participation in Similar Program',
      'Benefited from FMYD'
    ]
  },
  {
    id: 'programs',
    name: 'Programs & Details',
    icon: <Layout size={14} />,
    params: [
      'Program', 
      'Program Outcome', 
      'Urgent Priority', 
      'Time Duration',
      'Prior Knowledge in Baking/Confectionery',
      'Baking Interest Area',
      'Baking Business',
      'Baking Support',
      'Expertise Area',
      'Participation Reason',
      'Organization Name',
      'Expectations',
      'Youth Focused Organization'
    ]
  }
];

const paramToFieldMap: Record<string, keyof RegistrationData> = {
  'Program': 'program',
  'Gender': 'gender',
  'Geopolitical Zone': 'geopoliticalZone',
  'State': 'state',
  'Youth Professional': 'youthProfessional',
  'Sponsoring Organization': 'sponsoringOrganization',
  'Previous FMYD Program Participation': 'fmydParticipation',
  'Youth Bracket (18-35)': 'youthBracket',
  'Current Status': 'status',
  'Program Outcome': 'programOutcome',
  'Time Duration': 'timeDuration',
  'Stakeholder Category': 'stakeholder',
  'Urgent Priority': 'urgentPriority',
  'Belongs to Youth Organization': 'belongsToOrg',
  'Previous Participation in Similar Program': 'previousParticipation',
  'Benefited from FMYD': 'benefitedFromFMYD',
  'Prior Knowledge in Baking/Confectionery': 'priorKnowledge',
  'Baking Interest Area': 'bakingInterest',
  'Baking Business': 'bakingBusiness',
  'Baking Support': 'bakingSupport',
  'Expertise Area': 'expertiseArea',
  'Participation Reason': 'participationReason',
  'Organization Name': 'organizationName',
  'Expectations': 'expectations',
  'Youth Focused Organization': 'youthFocusedOrganization'
};

const CHART_COLORS = ['#2E6E65', '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6'];

type FilterState = {
  param: string;
  values: string[];
};

export default function ReportsPage() {
  const [selectedFilters, setSelectedFilters] = useState<FilterState[]>([
    { param: 'Youth Bracket (18-35)', values: ['Yes'] },
    { param: 'Current Status', values: ['Student', 'Graduate'] }
  ]);
  const [operators, setOperators] = useState<('AND' | 'OR')[]>(['AND']);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'bar' | 'pie' | 'line'>('bar');
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRegistrations);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Filtered_Registrations");
    XLSX.writeFile(wb, `FMYD_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const addFilter = (param: string) => {
    if (!selectedFilters.find(f => f.param === param)) {
      setSelectedFilters([...selectedFilters, { param, values: [] }]);
      if (selectedFilters.length > 0) {
        setOperators([...operators, 'AND']);
      }
    }
  };

  const removeFilter = (param: string) => {
    const index = selectedFilters.findIndex(f => f.param === param);
    if (index === -1) return;
    
    const newFilters = selectedFilters.filter(f => f.param !== param);
    setSelectedFilters(newFilters);
    
    const newOperators = [...operators];
    if (index === 0 && newOperators.length > 0) {
      newOperators.shift();
    } else if (index > 0) {
      newOperators.splice(index - 1, 1);
    }
    setOperators(newOperators);
  };

  const toggleOperator = (index: number) => {
    setOperators(operators.map((op, i) => i === index ? (op === 'AND' ? 'OR' : 'AND') : op));
  };

  const toggleFilterValue = (param: string, value: string) => {
    setSelectedFilters(selectedFilters.map(f => {
      if (f.param === param) {
        const hasValue = f.values.includes(value);
        return {
          ...f,
          values: hasValue ? f.values.filter(v => v !== value) : [...f.values, value]
        };
      }
      return f;
    }));
  };

  const getUniqueValues = (param: string) => {
    const fieldKey = paramToFieldMap[param];
    if (!fieldKey) return [];
    const values = new Set(mockRegistrations.map(r => String(r[fieldKey] || '')).filter(Boolean));
    return Array.from(values).sort();
  };

  const filteredRegistrations = useMemo(() => {
    if (selectedFilters.length === 0) return mockRegistrations;
    
    return mockRegistrations.filter(reg => {
      let result = true;
      
      // Evaluate first filter
      const firstFilter = selectedFilters[0];
      const firstFieldKey = paramToFieldMap[firstFilter.param];
      result = firstFilter.values.length === 0 || firstFilter.values.includes(String(reg[firstFieldKey]));
      
      // Evaluate subsequent filters with operators
      for (let i = 1; i < selectedFilters.length; i++) {
        const filter = selectedFilters[i];
        const fieldKey = paramToFieldMap[filter.param];
        const operator = operators[i - 1];
        const currentMatch = filter.values.length === 0 || filter.values.includes(String(reg[fieldKey]));
        
        if (operator === 'AND') {
          result = result && currentMatch;
        } else {
          result = result || currentMatch;
        }
      }
      
      return result;
    });
  }, [selectedFilters, operators]);

  const chartData = useMemo(() => {
    if (selectedFilters.length === 0) return [];
    const primaryParam = selectedFilters[0].param;
    const fieldKey = paramToFieldMap[primaryParam];
    const distMap = new Map();
    filteredRegistrations.forEach(r => {
      const val = String(r[fieldKey] || 'Unknown');
      distMap.set(val, (distMap.get(val) || 0) + 1);
    });
    return Array.from(distMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a,b) => b.value - a.value);
  }, [selectedFilters, filteredRegistrations]);

  const trendData = useMemo(() => {
    const monthCounts: Record<string, number> = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Sort registrations by date to get a chronological trend
    filteredRegistrations.forEach(reg => {
      const date = new Date(reg.dateRegistered);
      const monthLabel = months[date.getMonth()];
      monthCounts[monthLabel] = (monthCounts[monthLabel] || 0) + 1;
    });

    return months.map(m => ({
      name: m,
      value: monthCounts[m] || 0
    })).filter(d => d.value > 0 || months.indexOf(d.name) <= new Date().getMonth());
  }, [filteredRegistrations]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return CATEGORIES;
    return CATEGORIES.map(cat => ({
      ...cat,
      params: cat.params.filter(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
    })).filter(cat => cat.params.length > 0);
  }, [searchQuery]);

  const savedTemplates = [
    { name: 'Youth Employment Q1', lastViewed: '2 days ago', author: 'Admin' },
    { name: 'North West Participation', lastViewed: '5 days ago', author: 'System' },
    { name: 'Gender Distribution 2024', lastViewed: '1 week ago', author: 'Admin' },
    { name: 'Program Completion Trends', lastViewed: '2 weeks ago', author: 'Admin' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#F8FAFB] overflow-hidden select-none">
      {/* Top Header: Saved Templates */}
      <div className="px-8 py-3 bg-white border-b border-gray-100 flex items-center justify-between z-40 relative">
        <div className="relative">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setIsTemplatesOpen(!isTemplatesOpen)}
          >
            <div className="w-7 h-7 rounded bg-green-50 text-[#2E6E65] flex items-center justify-center">
              <History size={14} />
            </div>
            <span className="text-[13px] font-semibold text-[#111111]">Saved Templates</span>
            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded">{savedTemplates.length}</span>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isTemplatesOpen ? 'rotate-180' : ''}`} />
          </div>

          {isTemplatesOpen && (
            <div className="absolute top-[100%] left-0 mt-2 w-72 bg-white rounded-2xl border border-gray-100 shadow-2xl z-50 p-2 py-3 animate-in fade-in zoom-in-95">
              <div className="px-3 mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recent Reports</span>
                <button className="text-[10px] font-bold text-[#2E6E65] hover:underline">View All</button>
              </div>
              {savedTemplates.map((t, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl cursor-pointer group transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#e6f4f1] group-hover:text-[#2E6E65] transition-colors">
                    <FileSpreadsheet size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-[#111111] truncate">{t.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium">Last viewed {t.lastViewed}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={handleExport}
          className="flex items-center gap-2 bg-[#2E6E65] text-white px-4 py-2 rounded-xl text-[13px] font-bold hover:bg-[#245a52] transition-all shadow-md active:scale-95"
        >
          <Download size={16} />
          Export Dataset
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden p-6 gap-6">
        {/* Column 1: Parameter Library */}
        <div className="w-[280px] flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-5">
              <h2 className="text-[15px] font-bold text-[#111111] mb-5">Parameter Library</h2>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search parameters..."
                  className="w-full bg-[#F5F7F9] border-none rounded-lg py-2.5 pl-9 pr-4 text-[13px] focus:ring-1 focus:ring-[#2E6E65] transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-hide">
              {filteredCategories.map(cat => (
                <div key={cat.id} className="mb-2">
                  <div className="flex items-center justify-between px-3 py-2.5 bg-[#F9FBFC] rounded-xl mb-1 cursor-pointer hover:bg-gray-100 transition-all">
                    <div className="flex items-center gap-2.5 text-[#111111]">
                      <div className="text-[#2E6E65]">{cat.icon}</div>
                      <span className="text-[13px] font-semibold">{cat.name}</span>
                      <span className="text-[10px] text-gray-400 font-bold ml-1">{cat.params.length}</span>
                    </div>
                  </div>
                  <div className="space-y-0.5 px-1">
                    {cat.params.map(param => (
                      <div 
                        key={param}
                        onClick={() => addFilter(param)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all group ${
                          selectedFilters.find(f => f.param === param) 
                            ? 'bg-green-50 text-[#2E6E65]' 
                            : 'hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <span className="text-[12px] font-medium">{param}</span>
                        {selectedFilters.find(f => f.param === param) ? (
                          <Check size={12} strokeWidth={3} />
                        ) : (
                          <Plus size={12} className="opacity-0 group-hover:opacity-100 text-gray-300 group-hover:text-[#2E6E65] transition-all" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {filteredCategories.length === 0 && (
                <div className="px-4 py-8 text-center bg-gray-50 rounded-2xl mx-2 mt-4">
                  <Search size={24} className="text-gray-200 mx-auto mb-2" />
                  <p className="text-[12px] text-gray-400 font-medium">No parameters match your search</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-50">
              <button className="w-full py-2.5 bg-[#F9FAFB] hover:bg-gray-100 text-[12px] font-bold text-gray-500 rounded-lg transition-all flex items-center justify-center gap-2">
                <Sparkles size={14} className="text-[#F59E0B]" />
                Auto-Suggest Fields
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Report Builder */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#e6f4f1] text-[#2E6E65] flex items-center justify-center">
                  <Settings size={16} />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-[#111111]">Report Builder</h2>
                  <p className="text-[11px] text-gray-400 font-medium">Drag and drop parameters to logical buckets</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFilters([])}
                className="text-[11px] font-bold text-red-400 hover:text-red-500 transition-colors uppercase tracking-wider px-3 py-1.5 hover:bg-red-50 rounded-lg flex items-center gap-1.5"
              >
                <X size={12} /> Clear All
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="text-[13px] font-bold text-[#111111]">Report Parameters</h3>
                  <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full">{selectedFilters.length} parameters</span>
                </div>

                <div className="space-y-4 relative">
                  {selectedFilters.map((filter, idx) => (
                    <React.Fragment key={filter.param}>
                      <div className="group relative bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-gray-200 transition-all">
                        <button
                          onClick={() => removeFilter(filter.param)}
                          className="absolute right-4 top-4 text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <X size={14} />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1.5 h-6 bg-gray-100 rounded-full group-hover:bg-green-200 transition-colors" />
                          <span className="text-[13px] font-bold text-[#111111]">{filter.param}</span>
                          <span className="text-[10px] text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wide">demographics</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {getUniqueValues(filter.param).map(val => (
                            <button
                              key={val}
                              onClick={() => toggleFilterValue(filter.param, val)}
                              className={`px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all border ${
                                filter.values.includes(val)
                                  ? 'bg-[#2E6E65] border-[#2E6E65] text-white shadow-md shadow-green-900/10'
                                  : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-[#2E6E65] font-bold">
                          <Check size={12} strokeWidth={3} />
                          {filter.values.length} values selected
                        </div>
                      </div>

                      {idx < selectedFilters.length - 1 && (
                        <div className="flex justify-center -my-2 relative z-10">
                          <div className="bg-[#EDF2F7] rounded-full p-1 border-4 border-[#F8FAFB] flex gap-1">
                            <button 
                              onClick={() => operators[idx] !== 'AND' && toggleOperator(idx)}
                              className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all ${
                                operators[idx] === 'AND' 
                                  ? 'bg-[#2D3748] text-white border-[#2D3748] shadow-sm' 
                                  : 'bg-white text-gray-500 border-transparent hover:bg-gray-50'
                              }`}
                            >
                              AND
                            </button>
                            <button 
                              onClick={() => operators[idx] !== 'OR' && toggleOperator(idx)}
                              className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all ${
                                operators[idx] === 'OR' 
                                  ? 'bg-[#2D3748] text-white border-[#2D3748] shadow-sm' 
                                  : 'bg-white text-gray-500 border-transparent hover:bg-gray-50'
                              }`}
                            >
                              OR
                            </button>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                  {selectedFilters.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 bg-[#F9FBFC] border border-dashed border-gray-200 rounded-2xl">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-300 mb-4">
                        <Plus size={24} />
                      </div>
                      <p className="text-[13px] font-bold text-gray-400">Add parameters from the library to start building</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Live Preview & Stats */}
        <div className="w-[300px] flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6 h-full overflow-y-auto scrollbar-hide">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[14px] font-bold text-[#111111]">Live Preview</h3>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[10px] font-bold text-[#10B981] uppercase">Live</span>
                </div>
              </div>

              <div className="bg-[#F8FAFB] p-1.5 rounded-xl flex gap-1 mb-6">
                <button
                  onClick={() => setActiveTab('bar')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all ${activeTab === 'bar' ? 'bg-white text-[#2E6E65] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <BarChart3 size={14} /> Bar
                </button>
                <button
                  onClick={() => setActiveTab('pie')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all ${activeTab === 'pie' ? 'bg-white text-[#2E6E65] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <PieChartIcon size={14} /> Pie
                </button>
                <button
                  onClick={() => setActiveTab('line')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all ${activeTab === 'line' ? 'bg-white text-[#2E6E65] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <LineChart size={14} /> Line
                </button>
              </div>

              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {activeTab === 'bar' ? (
                    <BarChart data={chartData.slice(0, 5)}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                      <Bar dataKey="value" fill="#2E6E65" radius={[4, 4, 0, 0]} barSize={24} />
                    </BarChart>
                  ) : activeTab === 'pie' ? (
                    <PieChart>
                      <Pie
                        data={chartData}
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  ) : (
                    <ReLineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                      <Line type="monotone" dataKey="value" stroke="#2E6E65" strokeWidth={3} dot={{ fill: '#2E6E65', r: 4 }} activeDot={{ r: 6 }} />
                    </ReLineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-col gap-6">
              <div>
                <h4 className="text-[12px] font-bold text-[#111111] uppercase tracking-wider mb-4">Active Filters</h4>
                <div className="space-y-4">
                  {selectedFilters.map(f => (
                    <div key={f.param} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-[12px] font-bold text-[#111111]">{f.param}</div>
                        <div className="text-[11px] text-gray-400 font-medium leading-relaxed">
                          {f.values.join(', ') || 'Any value'}
                        </div>
                      </div>
                    </div>
                  ))}
                  {selectedFilters.length === 0 && (
                    <div className="text-[11px] text-gray-400 font-medium italic">No active filters</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F8FAFB] p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={12} className="text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Total</span>
                  </div>
                  <div className="text-[16px] font-black text-[#111111] tracking-tight">{mockRegistrations.length.toLocaleString()}</div>
                </div>
                <div className="bg-[#F8FAFB] p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Filter size={12} className="text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Filtered</span>
                  </div>
                  <div className="text-[16px] font-black text-[#111111] tracking-tight">{filteredRegistrations.length.toLocaleString()}</div>
                </div>
                <div className="bg-[#F8FAFB] p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Layout size={12} className="text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Programs</span>
                  </div>
                  <div className="text-[16px] font-black text-[#111111] tracking-tight">{new Set(filteredRegistrations.map(r => r.program)).size}</div>
                </div>
                <div className="bg-[#F8FAFB] p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe size={12} className="text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Zones</span>
                  </div>
                  <div className="text-[16px] font-black text-[#111111] tracking-tight">{new Set(filteredRegistrations.map(r => r.geopoliticalZone)).size}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Report Results */}
      <div className="bg-white border-t border-gray-100 px-8 py-6 max-h-[40%] overflow-y-auto scrollbar-hide z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 text-[#2E6E65] flex items-center justify-center">
              <BarChart3 size={16} />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-[#111111]">Report Results</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <Calendar size={12} className="text-gray-400" />
                <span className="text-[11px] font-semibold text-gray-400">Generated {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()} UTC</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-gray-400">
               <TrendingUp size={14} />
               <span className="text-[12px] font-bold tracking-tight">{selectedFilters.length} filters applied</span>
             </div>
             <button
               onClick={() => {
                 const ws = XLSX.utils.json_to_sheet(filteredRegistrations);
                 const wb = XLSX.utils.book_new();
                 XLSX.utils.book_append_sheet(wb, ws, "Report");
                 XLSX.writeFile(wb, "Report.xlsx");
               }}
               className="bg-[#2E6E65] hover:bg-[#23564e] text-white px-5 py-2 rounded-xl text-[12px] font-bold shadow-lg shadow-green-900/20 transition-all flex items-center gap-2"
             >
               <FileSpreadsheet size={14} /> Export Dataset
             </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Registrations', value: filteredRegistrations.length.toLocaleString(), trend: '+12.4%', trendUp: true },
            { label: 'Avg Completion Rate', value: '73.0%', trend: '+3.2%', trendUp: true },
            { label: 'Programs Covered', value: new Set(filteredRegistrations.map(r => r.program)).size.toString(), subText: 'All Active' },
            { label: 'Zones Represented', value: `${new Set(filteredRegistrations.map(r => r.geopoliticalZone)).size}/6`, subText: 'Coverage', trendUp: true }
          ].map((stat, i) => (
            <div key={i} className="bg-[#F8FAFB] border border-gray-100 p-6 rounded-2xl relative overflow-hidden group hover:border-[#2E6E65]/30 transition-all">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-3">{stat.label}</span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-[#111111] tracking-tight">{stat.value}</span>
                {stat.trend && (
                  <span className={`text-[11px] font-bold ${stat.trendUp ? 'text-[#10B981]' : 'text-red-400'}`}>
                    {stat.trend}
                  </span>
                )}
              </div>
              {stat.subText && (
                <span className={`text-[11px] font-bold mt-2 block ${stat.trendUp ? 'text-[#10B981]' : 'text-gray-400'}`}>
                  {stat.subText}
                </span>
              )}
              <div className="absolute right-[-10px] bottom-[-10px] opacity-5 group-hover:opacity-10 transition-opacity">
                <BarChart3 size={80} strokeWidth={1} />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FAFBFC] border-b border-gray-100">
                {['Program', 'Zone', 'Age Bracket', 'Employment', 'Registrations', 'Completion %', 'Sponsor', 'Trend'].map(h => (
                  <th key={h} className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {filteredRegistrations.slice(0, 5).map((row, i) => {
                // Determine a pseudo-random but deterministic completion % based on row data
                const completionVal = (row.name.length * 7 + row.email.length * 3) % 40 + 60;
                const regCount = (row.name.length * 150 + row.email.length * 50) % 4000 + 1000;
                
                return (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-[12px] font-bold text-[#2E6E65] bg-green-50 px-2 py-1 rounded-md">{row.program}</span>
                    </td>
                    <td className="px-6 py-4 text-[12px] font-semibold text-gray-600 truncate max-w-[120px]">{row.geopoliticalZone}</td>
                    <td className="px-6 py-4 text-[12px] font-semibold text-gray-600">{row.youthBracket === 'Yes' ? '20-24' : '30-35'}</td>
                    <td className="px-6 py-4 text-[12px] font-semibold text-gray-600">{row.status || 'Graduate'}</td>
                    <td className="px-6 py-4">
                      <span className="text-[12px] font-black text-[#111111]">{regCount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#10B981]" style={{ width: `${completionVal}%` }} />
                        </div>
                        <span className="text-[11px] font-bold text-gray-500">{completionVal}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-bold text-gray-500">{row.sponsoringOrganization || 'Federal'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-[#10B981] font-bold text-[11px]">
                         <TrendingUp size={12} /> Up
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
             <span className="text-[12px] font-medium text-gray-400">Showing 1-5 of {filteredRegistrations.length} results</span>
             <div className="flex gap-2">
               {[1, 2, 3].map(p => (
                 <button key={p} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold transition-all ${p === 1 ? 'bg-[#2E6E65] text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
                   {p}
                 </button>
               ))}
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50">
                  <ArrowRight size={14} />
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
