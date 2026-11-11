'use client';

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";

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

export const defaultProgramsData: ProgramItem[] = [
  {
    id: "entrepreneurship",
    title: "Entrepreneurship Programme for Unemployed Youths Of South-West Geopolitical Zone",
    background:
      "Entrepreneurship Programme for Unemployed Youths Of South-West Geopolitical Zone is a youth development initiative focused on building the capacity of youths from the south-west geopolitical zone with entrepreneurship, IT and human skills, in product sales and marketing. It is in line with the Renewed Hope Agenda of President Bola Ahmed Tinubu's administration and Presidential Initiative on Youth Enterprise Clusters (PIYEC).",
    objectives: [
      "To build the capacity of youths from the south-west geopolitical zone with entrepreneurship, IT and human skills, in product sales and marketing.",
      "To promote entrepreneurship and self-reliance through practical, hands-on learning.",
    ],
    targetAudience: [
      "Youths (15–29 years) as defined by the Nigerian Youth Policy 2019.",
      "Young entrepreneurs or graduates seeking skills to start a business.",
      "Youths who have never participated in a similar programme before.",
    ],
    mainImage: "/images/oyo_flyer.png",
    thumbnailImage: "/images/oyo_flyer.png",
    registerLink: "/register?program=entrepreneurship",
    date: "20/11/2025 - 28/11/2025",
  },
  {
    id: "bakeprenuer",
    title: "Bakeprenuer Nigeria",
    background:
      "Bakeprenuer Nigeria is a youth empowerment and skills development initiative focused on the baking and food industry. It seeks to equip young Nigerians with practical skills to enable them to start small-scale businesses, create job opportunities, and drive economic independence.",
    objectives: [
      "To provide Nigerian youths with modern baking and confectionery skills aligned with industry standards.",
      "To promote entrepreneurship and self-reliance through practical, hands-on learning.",
    ],
    targetAudience: [
      "Youths (18–35 years) interested in baking or food business.",
      "Young entrepreneurs or graduates seeking skills to start a business.",
      "Unemployed youths seeking self-reliance through vocational training.",
    ],
    mainImage: "/images/cooking_chefs.png",
    thumbnailImage: "/images/chef_small.png",
    registerLink: "/register?program=bakeprenuer",
    date: "02/11/2025",
  },
  {
    id: "youth_migration",
    title: "Youth Migration Awareness Programme",
    background:
      "The Youth Migration Awareness & Management Programme seeks to address irregular migration challenges by educating young people on safe migration pathways, risks of irregular migration, and opportunities for empowerment within Nigeria.",
    objectives: [
      "To educate Nigerian youth on safe migration pathways and the risks of irregular migration.",
      "To provide information on opportunities for empowerment within Nigeria.",
    ],
    targetAudience: [
      "Youths aged 18–35, particularly in migration-prone communities.",
      "Migration stakeholders (IOM, NAPTIP, NDLEA, Immigration Services, Embassies).",
      "CSOs and NGOs working on migration and human trafficking.",
    ],
    mainImage: "/images/students.png",
    thumbnailImage: "/images/students.png",
    registerLink: "/register?program=youth_migration",
    date: "10/11/2025",
  },
  {
    id: "national_youth",
    title: "National Youth Policy Validation Workshop",
    background:
      "The National Youth Policy Validation Workshop provides a platform for stakeholders to review and validate the revised National Youth Policy. It ensures inclusivity, stakeholder input, and alignment of the policy with current realities facing Nigerian youths.",
    objectives: [
      "To provide a platform for youth to voice their concerns and ideas.",
      "To develop actionable solutions to challenges facing Nigerian youth.",
    ],
    targetAudience: [
      "Youth development stakeholders.",
      "Government representatives (MDAs, State Ministries).",
      "Civil Society Organisations (CSOs/NGOs).",
      "Development partners and donor agencies.",
      "Private sector organisations with youth-related initiatives.",
    ],
    mainImage: "/images/corpers.png",
    thumbnailImage: "/images/corpers.png",
    registerLink: "/register?program=national_youth",
    date: "15/11/2025",
  },
  {
    id: "african_youth",
    title: "African/National Youth Day 2025",
    background:
      "African/National Youth Day is commemorated annually to celebrate the contributions of youths to national and continental development. The programme creates awareness of youth issues, showcases achievements, and provides a platform for engagement between youth, government, and stakeholders.",
    objectives: [
      "To foster collaboration among young Africans.",
      "To develop innovative solutions to African challenges.",
    ],
    targetAudience: [
      "Nigerian youths aged 18-35.",
      "Youth development professionals.",
      "Youth organizations and networks.",
      "Development partners, CSOs, and private sector actors.",
      "Government officials and policymakers.",
    ],
    mainImage: "/images/speaker.png",
    thumbnailImage: "/images/speaker.png",
    registerLink: "/register?program=african_youth",
    date: "01/11/2025",
  },
];

export function ActivePrograms() {
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const programsData = defaultProgramsData;
  const currentProgram = programsData[currentProgramIndex];

  const nextProgram = useCallback(() => {
    setCurrentProgramIndex((prevIndex) =>
      prevIndex === programsData.length - 1 ? 0 : prevIndex + 1
    );
  }, [programsData.length]);

  const prevProgram = () => {
    setCurrentProgramIndex((prevIndex) =>
      prevIndex === 0 ? programsData.length - 1 : prevIndex - 1
    );
  };

  const goToProgram = (index: number) => {
    setCurrentProgramIndex(index);
  };

  // Auto-advance carousel every 6 seconds unless user pauses/hovers
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextProgram();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextProgram, isPaused]);

  return (
    <section id="programs" className="w-full bg-white py-10 border-b border-green-500 overflow-x-hidden scroll-mt-20">
      {/* Container aligned with Header and Footer */}
      <div className="w-full px-4 sm:px-10 flex flex-col">
        <h2 className="font-bold text-2xl sm:text-3xl text-center text-[#277B12] mb-8 uppercase tracking-wide">
          Active Programs
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Main Program Card Showcase */}
          <div
            className="flex-1 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex flex-col justify-between bg-gradient-to-b from-[#277B12] to-[#F9E79F] rounded-2xl shadow-xl p-6 sm:p-8 min-h-[540px] overflow-hidden">
              {/* Program Header */}
              <div className="text-center mb-4">
                <h3 className="font-bold text-xl sm:text-2xl text-black tracking-tight leading-snug">
                  {currentProgram.title}
                </h3>
              </div>

              {/* Main Content Split: Details & Media */}
              <div className="flex flex-col lg:flex-row items-center gap-6 my-auto">
                {/* Details Column - Scrollbar completely hidden */}
                <div className="w-full lg:w-1/2 flex flex-col space-y-3.5 pr-0 lg:pr-2 max-h-[380px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  <div>
                    <h4 className="text-black text-base sm:text-lg font-bold">
                      Background
                    </h4>
                    <p className="text-black font-medium text-xs sm:text-sm leading-relaxed mt-1">
                      {currentProgram.background}
                    </p>
                  </div>

                  <hr className="border-black/20" />

                  <div>
                    <h4 className="text-black text-base sm:text-lg font-bold">
                      Objectives
                    </h4>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      {currentProgram.objectives.map((objective, idx) => (
                        <li
                          key={idx}
                          className="text-black font-medium text-xs sm:text-sm leading-relaxed"
                        >
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="border-black/20" />

                  <div>
                    <h4 className="text-black text-base sm:text-lg font-bold">
                      Who Should Attend
                    </h4>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      {currentProgram.targetAudience.map((audience, idx) => (
                        <li
                          key={idx}
                          className="text-black font-medium text-xs sm:text-sm leading-relaxed"
                        >
                          {audience}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Visual / Flyer Column */}
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

              {/* Progress dots at bottom of card */}
              <div className="flex justify-center gap-2 mt-4 pt-2">
                {programsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToProgram(idx)}
                    aria-label={`Go to program ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentProgramIndex === idx
                        ? "w-8 bg-[#277B12]"
                        : "w-2 bg-black/30 hover:bg-black/60"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Left Chevron Button */}
            <button
              onClick={prevProgram}
              aria-label="Previous Program"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#277B12] rounded-full p-2.5 shadow-lg transition-transform hover:scale-110 cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5px]" />
            </button>

            {/* Right Chevron Button */}
            <button
              onClick={nextProgram}
              aria-label="Next Program"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#277B12] rounded-full p-2.5 shadow-lg transition-transform hover:scale-110 cursor-pointer z-10"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5px]" />
            </button>
          </div>

          {/* Thumbnail Navigation List - Scrollbar completely hidden */}
          <div className="w-full lg:w-80 shrink-0 flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5 hidden lg:block">
              All Available Programs ({programsData.length})
            </p>
            <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[540px] pb-2 lg:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {programsData.map((program, index) => {
                const isSelected = currentProgramIndex === index;
                return (
                  <div
                    key={program.id}
                    onClick={() => goToProgram(index)}
                    className={`cursor-pointer rounded-xl transition-all duration-200 shrink-0 w-60 lg:w-full border-2 ${isSelected
                        ? "border-[#277B12] shadow-md scale-[1.02] bg-green-50/50"
                        : "border-transparent opacity-80 hover:opacity-100 hover:border-gray-200"
                      }`}
                  >
                    <div className="relative h-24 w-full rounded-lg overflow-hidden">
                      <Image
                        src={program.thumbnailImage}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-2.5">
                        <p className="text-white text-xs font-semibold line-clamp-2 leading-tight">
                          {program.title}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ActivePrograms;
