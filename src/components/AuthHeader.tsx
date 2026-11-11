import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function AuthHeader() {
  return (
    <header className="w-full border-b border-gray-100 bg-white py-3 px-4 sm:px-8 shrink-0">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/fmyd_logo1.png"
            alt="Federal Ministry of Youth Development"
            width={48}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm sm:text-base leading-tight group-hover:text-[#277B12] transition-colors">
              Unified Registration Portal
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              Federal Ministry of Youth Development
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#277B12] transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </Link>
      </div>
    </header>
  );
}

export default AuthHeader;

