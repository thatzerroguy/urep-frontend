'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, AppWindow, FileText } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/admin', icon: LayoutGrid },
    { name: 'Programs', href: '/admin/programs', icon: AppWindow },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-[#F4F4F4] text-[#111111] font-sans">
      {/* Sidebar */}
      <div className="w-64 h-full bg-white border-r border-gray-100 flex flex-col justify-between py-6 relative z-10 shadow-[2px_0_8px_rgba(0,0,0,0.02)]">
        
        {/* Top Section */}
        <div className="px-4">
          {/* App Header */}
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="w-8 h-8 rounded-md bg-[#2E6E65] flex items-center justify-center text-white font-bold text-sm">
              U
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-tight">UREP</h1>
              <p className="text-[11px] text-gray-500 leading-tight">FMYD Dashboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#2E6E65] text-white font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-white/90" : "text-gray-400"} />
                  {item.name}
                  {isActive && <div className="ml-auto text-white/70 text-xs">{'>'}</div>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section - Watermark */}
        <div className="px-4">
          <div className="bg-[#eff5f4] rounded-lg p-4">
            <h3 className="text-[10px] font-bold text-[#2E6E65] uppercase tracking-wider mb-1">Federal Ministry</h3>
            <p className="text-xs text-gray-600">Youth Development, Abuja</p>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto relative flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-end px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-[#111111] leading-tight">Admin User</p>
              <p className="text-xs text-gray-500 leading-tight">admin@youth.gov.ng</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#e6f4f1] text-[#2E6E65] flex justify-center items-center font-bold text-sm border border-[#2E6E65]/20">
              AU
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          <div className="max-w-[1400px] mx-auto min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
