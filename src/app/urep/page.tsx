'use client';

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  X,
  Clock,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import Header from "@/components/Header";
import FooterBar from "@/components/FooterBar";

export interface ProgramItem {
  id: string;
  title: string;
  background: string;
  objectives: string[];
  targetAudience: string[];
  mainImage: string;
  thumbnailImage: string;
  registerLink: string;
  date: string;
}

export default function Urep() {
  const programsData: ProgramItem[] = [
    {
      id: 'entrepreneurship',
      title: 'Entrepreneurship Programme for Unemployed Youths Of South-West Geopolitical Zone',
      background:
        "Entrepreneurship Programme for Unemployed Youths Of South-West Geopolitical Zone is a youth development initiative focused on building the capacity of youths from the south-west geopolitical zone with entrepreneurship, IT and human skills, in product sales and marketing. It is in line with the Renewed Hope Agenda of President Bola Ahmed Tinubu's administration and Presidential Initiative on Youth Enterprise Clusters (PIYEC).",
      objectives: [
        'To build the capacity of youths from the south-west geopolitical zone with entrepreneurship, IT and human skills, in product sales and marketing.',
        'To promote entrepreneurship and self-reliance through practical, hands-on learning.',
      ],
      targetAudience: [
        'Youths (15–29 years) as defined by the Nigerian Youth Policy 2019.',
        'Young entrepreneurs or graduates seeking skills to start a business.',
        'Youths who have never participated in a similar programme before.',
      ],
      mainImage: '/images/oyo_flyer.png',
      thumbnailImage: '/images/oyo_flyer.png',
      registerLink: '/register?program=entrepreneurship',
      date: '20/11/2025 - 28/11/2025',
    },
    {
      id: 'bakeprenuer',
      title: 'Bakeprenuer Nigeria',
      background:
        'Bakeprenuer Nigeria is a youth empowerment and skills development initiative focused on the baking and food industry. It seeks to equip young Nigerians with practical skills to enable them to start small-scale businesses, create job opportunities, and drive economic independence.',
      objectives: [
        'To provide Nigerian youths with modern baking and confectionery skills aligned with industry standards.',
        'To promote entrepreneurship and self-reliance through practical, hands-on learning.',
      ],
      targetAudience: [
        'Youths (18–35 years) interested in baking or food business.',
        'Young entrepreneurs or graduates seeking skills to start a business.',
        'Unemployed youths seeking self-reliance through vocational training.',
      ],
      mainImage: '/images/cooking_chefs.png',
      thumbnailImage: '/images/chef_small.png',
      registerLink: '/register?program=bakeprenuer',
      date: '02/11/2025',
    },
    {
      id: 'youth_migration',
      title: 'Youth Migration Awareness Programme',
      background:
        'The Youth Migration Awareness & Management Programme seeks to address irregular migration challenges by educating young people on safe migration pathways, risks of irregular migration, and opportunities for empowerment within Nigeria.',
      objectives: [
        'To educate Nigerian youth on safe migration pathways and the risks of irregular migration.',
        'To provide information on opportunities for empowerment within Nigeria.',
      ],
      targetAudience: [
        'Youths aged 18–35, particularly in migration-prone communities.',
        'Migration stakeholders (IOM, NAPTIP, NDLEA, Immigration Services, Embassies).',
        'CSOs and NGOs working on migration and human trafficking.',
      ],
      mainImage: '/images/students.png',
      thumbnailImage: '/images/students.png',
      registerLink: '/register?program=youth_migration',
      date: '10/11/2025',
    },
    {
      id: 'national_youth',
      title: 'National Youth Policy Validation Workshop',
      background:
        'The National Youth Policy Validation Workshop provides a platform for stakeholders to review and validate the revised National Youth Policy. It ensures inclusivity, stakeholder input, and alignment of the policy with current realities facing Nigerian youths.',
      objectives: [
        'To provide a platform for youth to voice their concerns and ideas.',
        'To develop actionable solutions to challenges facing Nigerian youth.',
      ],
      targetAudience: [
        'Youth development stakeholders.',
        'Government representatives (MDAs, State Ministries).',
        'Civil Society Organisations (CSOs/NGOs).',
        'Development partners and donor agencies.',
        'Private sector organisations with youth-related initiatives.',
      ],
      mainImage: '/images/corpers.png',
      thumbnailImage: '/images/corpers.png',
      registerLink: '/register?program=national_youth',
      date: '15/11/2025',
    },
    {
      id: 'african_youth',
      title: 'African/National Youth Day 2025',
      background:
        'African/National Youth Day is commemorated annually to celebrate the contributions of youths to national and continental development. The programme creates awareness of youth issues, showcases achievements, and provides a platform for engagement between youth, government, and stakeholders.',
      objectives: [
        'To foster collaboration among young Africans.',
        'To develop innovative solutions to African challenges.',
      ],
      targetAudience: [
        'Nigerian youths aged 18-35.',
        'Youth development professionals.',
        'Youth organizations and networks.',
        'Development partners, CSOs, and private sector actors.',
        'Government officials and policymakers.',
      ],
      mainImage: '/images/speaker.png',
      thumbnailImage: '/images/speaker.png',
      registerLink: '/register?program=african_youth',
      date: '01/11/2025',
    },
  ];

  const upcomingProgramsList = [
    'LOCAL YOUTH EXCHANGE PROGRAMME',
    'TRAINING AND EMPOWERMENT OF YOUTH ON WASTE TO WEALTH MANAGEMENT, RECYCLING AND REUSE IN EACH OF THE 6 GEO-POLITICAL ZONES',
    'YOUTH MENTAL HEALTH AND PSYCHOSOCIAL SUPPORT (MHPS) PROGRAMME NATION-WIDE',
    'REVIEW AND IMPLEMENTATION OF NIGERIA YOUTH EMPLOYMENT ACTION PLAN (NIYEAP)',
    'ESTABLISHMENT OF TECH/SOCIAL HUBS IN THE NATIONAL YOUTH DEVELOPMENT CENTRES IN TWO ZONES SOUTH AND NORTH',
    'YOUTH ENTREPRENEURSHIP DEVELOPMENT PROGRAM FOR SUSTAINABLE GROWTH',
    'DIGITAL SKILLS TRAINING FOR RURAL YOUTH EMPOWERMENT',
    'AGRICULTURAL INNOVATION AND MODERNIZATION FOR YOUTH FARMERS',
    'CREATIVE ARTS AND CULTURAL HERITAGE PRESERVATION INITIATIVE',
  ];

  // 4 Featured Hero Images
  const heroImageShowcase = [
    {
      id: 'bakeprenuer',
      title: 'Bakepreneur Nigeria',
      category: 'Culinary Skills',
      image: '/images/chef_small.png',
      alt: 'Bakepreneur youth empowerment',
    },
    {
      id: 'national_youth',
      title: 'National Youth Policy',
      category: 'Policy & Leadership',
      image: '/images/corpers.png',
      alt: 'National youth policy validation workshop',
    },
    {
      id: 'youth_migration',
      title: 'Youth Migration Awareness',
      category: 'Safe Pathways',
      image: '/images/students.png',
      alt: 'Youth migration awareness and management',
    },
    {
      id: 'african_youth',
      title: 'African Youth Initiative',
      category: 'Continental Summit',
      image: '/images/newer_pic.png',
      alt: 'African youth day and engagement',
    },
  ];

  // Search and Sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'title-asc' | 'title-desc'>('default');

  // Modal state
  const [upcomingModalProgram, setUpcomingModalProgram] = useState<string | null>(null);

  // Carousel index & pause state
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Filtered and sorted active programs
  const filteredActivePrograms = useMemo(() => {
    let list = [...programsData];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.background.toLowerCase().includes(q) ||
          p.objectives.some((obj) => obj.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'title-asc') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-desc') {
      list.sort((a, b) => b.title.localeCompare(a.title));
    }
    return list;
  }, [programsData, searchQuery, sortBy]);

  // Filtered upcoming programs
  const filteredUpcoming = useMemo(() => {
    if (!searchQuery.trim()) return upcomingProgramsList;
    const q = searchQuery.toLowerCase();
    return upcomingProgramsList.filter((item) => item.toLowerCase().includes(q));
  }, [upcomingProgramsList, searchQuery]);

  // Adjust carousel index if it exceeds filtered length
  useEffect(() => {
    if (currentProgramIndex >= filteredActivePrograms.length) {
      setCurrentProgramIndex(0);
    }
  }, [filteredActivePrograms.length, currentProgramIndex]);

  const currentProgram = filteredActivePrograms[currentProgramIndex] || null;

  const nextProgram = useCallback(() => {
    if (filteredActivePrograms.length === 0) return;
    setCurrentProgramIndex((prev) =>
      prev === filteredActivePrograms.length - 1 ? 0 : prev + 1
    );
  }, [filteredActivePrograms.length]);

  const prevProgram = useCallback(() => {
    if (filteredActivePrograms.length === 0) return;
    setCurrentProgramIndex((prev) =>
      prev === 0 ? filteredActivePrograms.length - 1 : prev - 1
    );
  }, [filteredActivePrograms.length]);

  // Auto-slide effect
  useEffect(() => {
    if (isPaused || filteredActivePrograms.length <= 1) return;
    const timer = setInterval(() => {
      nextProgram();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextProgram, isPaused, filteredActivePrograms.length]);

  // Escape key handler for modal
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

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden flex flex-col">
      {/* 1. Header (Shared with Landing page) */}
      <Header />

      {/* 2. Hero: 4 Featured Initiative Images */}
      <section className="w-full bg-gradient-to-b from-[#18530b] via-[#216c10] to-[#164d0a] text-white py-10 md:py-14 px-4 sm:px-10 border-b border-green-500">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Header context */}
          <div className="text-center max-w-3xl mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-emerald-100 text-xs font-semibold tracking-wider uppercase backdrop-blur-xs">
              Federal Ministry of Youth Development
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-3">
              Youth Real-Time Engagement Platform
            </h1>
            <p className="text-emerald-100/85 text-xs sm:text-sm md:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
              Empowering Nigerian youths across all geopolitical zones with entrepreneurship, digital skills, and direct capacity-building initiatives.
            </p>
          </div>

          {/* 4 Image Cards Grid - The Primary Focal Point */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {heroImageShowcase.map((item) => {
              const programIdx = programsData.findIndex((p) => p.id === item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (programIdx !== -1) {
                      setCurrentProgramIndex(programIdx);
                      document.getElementById('active-programs-section')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 hover:border-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer bg-black/20"
                >
                  {/* Photo fill */}
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-108"
                    priority
                  />

                  {/* High quality gradient overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity group-hover:from-black/90 group-hover:via-black/45" />

                  {/* Badge & Text on the image */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-[11px] font-bold tracking-wide uppercase border border-white/30">
                        {item.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-white text-lg font-bold tracking-tight leading-snug drop-shadow-md">
                        {item.title}
                      </h3>
                      <div className="mt-2.5 flex items-center gap-1.5 text-emerald-300 text-xs font-semibold group-hover:text-white transition-colors">
                        <span>Explore Programme</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Search and Sort Bar */}
      <section className="w-full bg-gray-50 border-b border-gray-200 py-6 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Functional Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search programmes by title, keywords, skills, background..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#277B12] focus:border-transparent transition-all shadow-xs text-gray-900 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Functional Sort Select */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 shadow-xs">
              <SlidersHorizontal className="w-4 h-4 text-[#277B12]" />
              <label htmlFor="sort-select" className="text-xs font-semibold text-gray-600">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'default' | 'title-asc' | 'title-desc')}
                className="bg-transparent text-sm font-medium text-gray-800 focus:outline-none cursor-pointer pr-2"
              >
                <option value="default">Default Order</option>
                <option value="title-asc">Title (A - Z)</option>
                <option value="title-desc">Title (Z - A)</option>
              </select>
            </div>

            {/* Clear Filters button if search/sort active */}
            {(searchQuery || sortBy !== 'default') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSortBy('default');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl border border-red-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Results Summary */}
        {searchQuery.trim() && (
          <div className="max-w-7xl mx-auto mt-3 text-xs text-gray-600 flex items-center justify-between">
            <span>
              Showing results for &ldquo;<strong>{searchQuery}</strong>&rdquo; (
              {filteredActivePrograms.length} active, {filteredUpcoming.length} upcoming)
            </span>
          </div>
        )}
      </section>

      {/* 4. Active Programs Showcase Carousel */}
      <section id="active-programs-section" className="w-full py-10 px-4 sm:px-10 border-b border-green-500 bg-white scroll-mt-6">
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-2xl sm:text-3xl text-[#277B12] uppercase tracking-wide">
              Active Programs
            </h2>
            <span className="text-xs font-semibold text-gray-500">
              {filteredActivePrograms.length} programme{filteredActivePrograms.length !== 1 ? 's' : ''} available
            </span>
          </div>

          {filteredActivePrograms.length === 0 ? (
            <div className="w-full bg-gray-50 rounded-2xl border border-gray-200 p-12 text-center flex flex-col items-center">
              <Search className="w-12 h-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">No Active Programmes Found</h3>
              <p className="text-sm text-gray-500 max-w-md mb-5">
                No active programmes matched your query &ldquo;{searchQuery}&rdquo;. Try another keyword or clear your filters.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-[#277B12] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          ) : currentProgram ? (
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              {/* Program Card Carousel Main */}
              <div
                className="flex-1 relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex flex-col justify-between bg-gradient-to-b from-[#277B12] to-[#F9E79F] rounded-2xl shadow-xl p-6 sm:p-8 min-h-[540px] overflow-hidden">
                  {/* Header Title */}
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug drop-shadow-sm">
                      {currentProgram.title}
                    </h3>
                  </div>

                  {/* Main Details and Image */}
                  <div className="flex flex-col lg:flex-row items-center gap-6 my-auto">
                    {/* Details Column */}
                    <div className="w-full lg:w-1/2 flex flex-col space-y-3.5 pr-0 lg:pr-2 max-h-[380px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      <div>
                        <h4 className="text-white text-base sm:text-lg font-bold">
                          Background
                        </h4>
                        <p className="text-black/90 font-normal text-xs sm:text-sm leading-relaxed mt-1">
                          {currentProgram.background}
                        </p>
                      </div>

                      <hr className="border-white/30" />

                      <div>
                        <h4 className="text-white text-base sm:text-lg font-bold">
                          Objectives
                        </h4>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {currentProgram.objectives.map((obj, i) => (
                            <li key={i} className="text-black/90 font-normal text-xs sm:text-sm leading-relaxed">
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="border-white/30" />

                      <div>
                        <h4 className="text-white text-base sm:text-lg font-bold">
                          Who Should Attend
                        </h4>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {currentProgram.targetAudience.map((aud, i) => (
                            <li key={i} className="text-black/90 font-normal text-xs sm:text-sm leading-relaxed">
                              {aud}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Image & Register Button */}
                    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 shrink-0">
                      <div className="w-full max-w-[340px] relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-2 border-white/40">
                        <Image
                          src={currentProgram.mainImage}
                          alt={currentProgram.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <Link
                        href={`/programs/${currentProgram.id}/terms`}
                        className="mt-5 inline-flex items-center gap-2 text-center text-sm sm:text-base text-[#277B12] font-bold rounded-xl bg-white px-7 py-3 hover:bg-emerald-50 transition-all shadow-md hover:scale-105"
                      >
                        <span>Register Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <div className="flex items-center gap-1.5 text-black font-semibold text-xs sm:text-sm mt-3">
                        <Calendar className="w-4 h-4 text-[#277B12]" />
                        <span>Date: {currentProgram.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Indicator Dots */}
                  <div className="flex justify-center gap-2 mt-4 pt-2">
                    {filteredActivePrograms.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentProgramIndex(idx)}
                        aria-label={`Go to program ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentProgramIndex === idx
                          ? 'w-8 bg-[#277B12]'
                          : 'w-2 bg-white/60 hover:bg-white'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Navigation Chevrons */}
                {filteredActivePrograms.length > 1 && (
                  <>
                    <button
                      onClick={prevProgram}
                      aria-label="Previous Program"
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#277B12] rounded-full p-2.5 shadow-lg transition-transform hover:scale-110 cursor-pointer z-10"
                    >
                      <ChevronLeft className="w-6 h-6 stroke-[2.5px]" />
                    </button>
                    <button
                      onClick={nextProgram}
                      aria-label="Next Program"
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#277B12] rounded-full p-2.5 shadow-lg transition-transform hover:scale-110 cursor-pointer z-10"
                    >
                      <ChevronRight className="w-6 h-6 stroke-[2.5px]" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Selector */}
              <div className="w-full lg:w-80 shrink-0 flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5 hidden lg:block">
                  Select Programme ({filteredActivePrograms.length})
                </p>
                <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[540px] pb-2 lg:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {filteredActivePrograms.map((prog, index) => {
                    const isSelected = currentProgramIndex === index;
                    return (
                      <div
                        key={prog.id}
                        onClick={() => setCurrentProgramIndex(index)}
                        className={`cursor-pointer rounded-xl transition-all duration-200 shrink-0 w-60 lg:w-full border-2 ${isSelected
                          ? 'border-[#277B12] shadow-md scale-[1.02] bg-green-50/50'
                          : 'border-transparent opacity-80 hover:opacity-100 hover:border-gray-200'
                          }`}
                      >
                        <div className="relative h-24 w-full rounded-lg overflow-hidden">
                          <Image
                            src={prog.thumbnailImage}
                            alt={prog.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-2.5">
                            <p className="text-white text-xs font-semibold line-clamp-2 leading-tight">
                              {prog.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 5. Upcoming Programs Section */}
      <section className="w-full py-12 px-4 sm:px-10 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-2xl sm:text-3xl text-[#277B12] uppercase tracking-wide">
              Upcoming Programs
            </h2>
            <span className="text-xs font-semibold text-gray-500">
              {filteredUpcoming.length} programme{filteredUpcoming.length !== 1 ? 's' : ''} queued
            </span>
          </div>

          {filteredUpcoming.length === 0 ? (
            <p className="text-sm text-gray-500 italic py-6 text-center">
              No upcoming programmes match your search.
            </p>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredUpcoming.map((program, idx) => (
                <div
                  key={idx}
                  className="min-h-[240px] p-6 flex flex-col justify-between items-center shadow-lg hover:shadow-2xl transition-all duration-200 rounded-2xl bg-white border border-gray-100 group"
                >
                  <p className="text-center font-bold text-sm text-gray-800 uppercase leading-relaxed my-auto group-hover:text-[#277B12] transition-colors">
                    {program}
                  </p>
                  <button
                    onClick={() => setUpcomingModalProgram(program)}
                    className="flex items-center justify-center rounded-xl bg-[#277B12] hover:bg-emerald-700 py-2.5 px-6 transition-all duration-150 shadow-sm cursor-pointer hover:scale-105 mt-4"
                  >
                    <span className="text-white text-xs sm:text-sm font-semibold text-center">
                      Read More
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Upcoming Program Pop-up Modal */}
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

      {/* 7. Footer */}
      <FooterBar />
    </div>
  );
}
