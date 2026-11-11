'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Clock } from 'lucide-react';

export function Hero3() {
  const [upcomingModalProgram, setUpcomingModalProgram] = useState<string | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setUpcomingModalProgram(null);
      }
    };
    if (upcomingModalProgram) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [upcomingModalProgram]);

  const updates = [
    {
      id: 1,
      img: '/chefsmall1.png',
      title: 'Bakepreneur Program',
      description: 'Bakeprenuer Nigeria is a youth empowerment and skills development initiative focused on the baking and food industry. It seeks to equip young Nigerians with practical skills to enable them to start small-scale businesses, create job opportunities.'
    },
    {
      id: 2,
      img: '/student1.png',
      title: 'Youth Migration Awareness',
      description: 'The Youth Migration Awareness & Management Programme seeks to address irregular migration challenges by educating young people on safe migration pathways, risks of irregular migration, and opportunities for empowerment within Nigeria.'
    },
    {
      id: 3,
      img: '/corper1.png',
      title: 'National Youth Policy',
      description: 'The National Youth Policy Validation Workshop provides a platform for stakeholders to review and validate the revised National Youth Policy. It ensures inclusivity, stakeholder input, and alignment of the policy with current realities facing Nigerian youths.'
    },
  ];

  const upcomingPrograms = [
    "LOCAL YOUTH EXCHANGE PROGRAMME",
    "TRAINING AND EMPOWERMENT OF YOUTH ON WASTE TO WEALTH MANAGEMENT, RECYCLING AND REUSE IN EACH OF THE 6 GEO-POLITICAL ZONES",
    "YOUTH MENTAL HEALTH AND PSYCHOSOCIAL SUPPORT (MHPS) PROGRAMME NATION-WIDE",
    "REVIEW AND IMPLEMENTATION OF NIGERIA YOUTH EMPLOYMENT ACTION PLAN (NIYEAP)",
    "ESTABLISHMENT OF TECH/SOCIAL HUBS IN THE NATIONAL YOUTH DEVELOPMENT CENTRES IN TWO ZONES SOUTH AND NORTH",
    "YOUTH ENTREPRENEURSHIP DEVELOPMENT PROGRAM FOR SUSTAINABLE GROWTH",
    "DIGITAL SKILLS TRAINING FOR RURAL YOUTH EMPOWERMENT",
    "AGRICULTURAL INNOVATION AND MODERNIZATION FOR YOUTH FARMERS",
    "CREATIVE ARTS AND CULTURAL HERITAGE PRESERVATION INITIATIVE",
  ];

  return (
    <section className="flex flex-col w-full items-center justify-center px-4 sm:px-10 bg-white">
      {/* UPDATES Section */}
      <h3 className="text-center text-xl text-black font-semibold my-8 tracking-widest uppercase">
        UPDATES
      </h3>

      <div className="w-full bg-white mb-14 border-b-[1px] border-green-500 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {updates.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="overflow-hidden h-56 relative">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-1 items-center text-center">
                <h4 className="text-lg font-bold text-gray-800 mb-2 uppercase tracking-tight">
                  {item.title}
                </h4>
                <p className="text-base text-black mb-6 leading-relaxed flex-1 font-normal">
                  {item.description}
                </p>
                <Link
                  href="/register?program=bakeprenuer"
                  className="bg-[#277B12] text-white text-xs font-semibold px-8 py-2.5 rounded-full hover:bg-emerald-700 transition-colors mt-auto shadow-sm"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Programs Section */}
      <div className="w-full flex flex-col items-center mb-16">
        <h3 className="text-center text-xl text-black font-semibold mb-8">
          Upcoming Programs
        </h3>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingPrograms.map((program, index) => (
            <div
              key={index}
              className="min-h-[240px] p-6 flex flex-col justify-between items-center shadow-lg border border-gray-50 rounded-xl hover:shadow-2xl transition-shadow duration-300 bg-white"
            >
              <p className="text-center text-sm font-bold text-gray-800 uppercase leading-relaxed mt-2">
                {program}
              </p>
              <button
                onClick={() => setUpcomingModalProgram(program)}
                className="mt-6 flex items-center justify-center rounded-lg bg-[#277B12] hover:bg-emerald-700 py-2 px-6 transition-all duration-150 shadow-sm cursor-pointer hover:scale-105"
              >
                <span className="text-white text-xs font-semibold">Read More</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Program Pop-up Modal */}
      {upcomingModalProgram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          onClick={() => setUpcomingModalProgram(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-7 relative border border-gray-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setUpcomingModalProgram(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 rounded-full p-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge Icon */}
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#277B12] flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>

            {/* Content */}
            <span className="text-xs font-bold uppercase tracking-wider text-[#277B12]">
              Upcoming Programme
            </span>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mt-1 mb-2.5 leading-snug">
              {upcomingModalProgram}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Information and registration details for this programme will be published soon. Please check back later!
            </p>

            {/* Action Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setUpcomingModalProgram(null)}
                className="bg-[#277B12] hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
              >
                Got it, I&apos;ll check back later
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero3;
