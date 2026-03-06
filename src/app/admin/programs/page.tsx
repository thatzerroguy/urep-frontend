'use client';

import React from 'react';
import { FolderKanban, BarChart3, Users } from 'lucide-react';
import { mockRegistrations } from '@/data/mockRegistrations';

export default function ProgramsPage() {
  
  // Compute enrollment counts
  const progNames = [
    'African Youth',
    'Bakeprenuer',
    'Entrepreneurship',
    'National Youth',
    'Youth Mental Health',
    'Youth Migration'
  ];
  
  const progDesc: Record<string, string> = {
    'African Youth': 'A program empowering African youths through cross-border collaboration and policy tracking.',
    'Bakeprenuer': 'Youth baking entrepreneurship program to empower young Nigerians with baking skills and business acumen.',
    'Entrepreneurship': 'Fostering entrepreneurial skills and providing access to funding for innovative youth startups.',
    'National Youth': 'National platform for youth stakeholders to discuss priorities and policy recommendations.',
    'Youth Mental Health': 'Awareness, capacity building, and dialogue on mental health challenges affecting Nigerian youths.',
    'Youth Migration': 'Youth Migration Awareness and Management Programme (YMAMP).'
  };

  const programsMap = new Map();
  mockRegistrations.forEach(r => {
    programsMap.set(r.program, (programsMap.get(r.program) || 0) + 1);
  });

  const programs = progNames.map((name, idx) => {
    const enrolled = programsMap.get(name) || 0;
    const completionRate = enrolled ? Math.min(Math.floor((enrolled / 20) * 100), 100) : 0;
    
    return {
      id: idx + 1,
      name,
      desc: progDesc[name] || 'Program description ...',
      enrolled,
      target: 20, 
      completionRate,
      status: enrolled > 15 ? 'active' : 'upcoming', 
      color: ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444', '#06B6D4'][idx % 6]
    };
  });

  return (
    <div className="p-8 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111111] tracking-tight">Programs</h1>
        <p className="text-gray-500 text-sm mt-1">Select a program to explore detailed analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map(p => (
          <div 
            key={p.id} 
            className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] cursor-pointer hover:border-[#2E6E65]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between min-h-[220px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#F8FAFB] -mr-12 -mt-12 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: `${p.color}15`, color: p.color }}
                >
                  <FolderKanban size={20} />
                </div>
                <div className={`px-2.5 py-1 flex items-center gap-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                  ${p.status === 'upcoming' ? 'bg-[#FFFbeb] text-[#F59E0B]' : 
                    p.status === 'active' ? 'bg-[#e6f4f1] text-[#2E6E65]' : 
                    'bg-[#eff6ff] text-[#3B82F6]'
                  } shadow-sm border border-white/50
                `}>
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    p.status === 'upcoming' ? 'bg-[#F59E0B]' : 
                    p.status === 'active' ? 'bg-[#2E6E65]' : 
                    'bg-[#3B82F6]'
                  }`} />
                  {p.status}
                </div>
              </div>
              <h3 className="text-[17px] font-black text-[#111111] mb-2 leading-tight tracking-tight group-hover:text-[#2E6E65] transition-colors">{p.name}</h3>
              <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2 font-medium opacity-80">{p.desc}</p>
            </div>
            
            <div className="mt-8 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Users size={12} />
                  {p.enrolled} / {p.target} Enrolled
                </span>
                <span className="text-[11px] font-black text-[#111111]">{p.completionRate}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${p.completionRate}%`,
                    backgroundColor: p.status === 'active' ? '#2E6E65' : p.color
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
        <BarChart3 size={24} className="mb-3 opacity-50 text-[#2E6E65]" />
        <h3 className="text-sm font-medium text-gray-700 mb-1">Select a program above</h3>
        <p className="text-xs">Click on any program card to view detailed analytics</p>
      </div>
    </div>
  );
}
