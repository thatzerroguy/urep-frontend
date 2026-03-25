'use client';

import React, {useEffect, useState, useCallback} from "react";
import Image from "next/image";
import Link from "next/link";
import {FaChevronLeft, FaChevronRight, FaSearch} from "react-icons/fa";
import {FaSliders, FaSort} from "react-icons/fa6";
import FooterBar from "@/components/FooterBar";
import { Rock_3D } from "next/font/google";

export default function Home() {
  // Program data for the carousel
  const programsData = [
    {
      id: 'entrepreneurship',
      title: 'Entrepreneurship Programme for Unemployed Youths Of South-West Geopolitical Zone',
      background: 'Entrepreneurship Programme for Unemployed Youths Of South-West Geopolitical Zone is a youth development\n' +
          '                        initiative focused on building the capacity of youths.\n' +
          '                        from the south-west geopolitical zone with entrepreneurship, IT and human skills,\n' +
          '                        in product sales and marketing,\n' +
          '                        It is inline with the Renewed Hope Agenda of President Bola\n' +
          'Ahmed Tinubu\'s administration and Presidential Initiative on Youth Enterprise\n' +
          'Clusters (PIYEC).,',
      objectives: [
        'To build the capacity of youths from the south-west geopolitical zone with entrepreneurship, IT and human skills, in product sales and marketing.',
        'To promote entrepreneurship and self-reliance through practical, hands-on learning.'
      ],
      targetAudience: [
        'Youths (15–29 years) as defined by the Nigerian Youth Policy 2019.',
        'Young entrepreneurs or graduates seeking skills to start a business ',
        'Youths who have never participated in a similar programme before',
      ],
      mainImage: '/images/oyo_flyer.png',
      thumbnailImage: '/images/oyo_flyer.png',
      registerLink: '/register?program=bakeprenuer',
      date: '20/11/2025 - 28/11/2025',
    },
    {
      id: 'bakeprenuer',
      title: 'Bakeprenuer Nigeria',
      background: 'Bakeprenuer Nigeria is a youth empowerment and skills development\n' +
          '                        initiative focused on the baking and food industry.\n' +
          '                        It seeks to equip young Nigerians with practical skills\n' +
          '                        to enable them to start small-scale businesses,\n' +
          '                        create job opportunities,',
      objectives: [
        'To provide Nigerian youths with modern baking and confectionery skills aligned with industry standards.',
        'To promote entrepreneurship and self-reliance through practical, hands-on learning.'
      ],
      targetAudience: [
        'Youths (18–35 years) interested in baking, or food business',
        'Young entrepreneurs or graduates seeking skills to start a business ',
        'Unemployed youths seeking self-reliance through vocational training',
      ],
      mainImage: '/images/cooking_chefs.png',
      thumbnailImage: '/images/chef_small.png',
      registerLink: '/register?program=bakeprenuer',
      date: '02/11/2025',
    },
    {
      id: 'youth_migration',
      title: 'Youth Migration Awareness Programme',
      background: 'The Youth Migration Awareness & Management Programme seeks to address irregular\n' +
          '                        migration challenges by educating young people on safe migration pathways, risks of irregular\n' +
          '                        migration, and opportunities for empowerment within Nigeria.',
      objectives: [
        'To educate Nigerian youth on safe migration pathways and the risks of irregular migration.',
        'To provide information on opportunities for empowerment within Nigeria.'
      ],
      targetAudience: [
        'Youths aged 18–35, particularly in migration-prone communities.',
        'Migration stakeholders (IOM, NAPTIP, NDLEA, Immigration Services, Embassies).',
        'CSOs and NGOs working on migration and human trafficking'
      ],
      mainImage: '/images/students.png',
      thumbnailImage: '/images/students.png',
      registerLink: '/register?program=youth_migration',
      date: '10/11/2025',
    },
    {
      id: 'national_youth',
      title: 'National Youth Policy Validation Workshop',
      background: 'The National Youth Policy Validation Workshop provides a platform for stakeholders to review\n' +
          '                        and validate the revised National Youth Policy. It ensures inclusivity, stakeholder input, and\n' +
          '                        alignment of the policy with current realities facing Nigerian youths.',
      objectives: [
        'To provide a platform for youth to voice their concerns and ideas.',
        'To develop actionable solutions to challenges facing Nigerian youth.'
      ],
      targetAudience: [
        'Youth development stakeholders.',
        'Government representatives (MDAs, State Ministries).',
        'Civil Society Organisations (CSOs/NGOs).',
        'Development partners and donor agencies',
        'Private sector organisations with youth-related initiatives',
      ],
      mainImage: '/images/corpers.png',
      thumbnailImage: '/images/corpers.png',
      registerLink: '/register?program=national_youth',
      date: '15/11/2025',
    },
    {
      id: 'african_youth',
      title: 'African/National Youth Day 2025',
      background: 'African/National Youth Day is commemorated annually to celebrate the contributions of youths\n' +
          '                        to national and continental development. The programme creates awareness of youth issues,\n' +
          '                        showcases achievements, and provides a platform for engagement between youth,\n' +
          '                        government, and stakeholders',
      objectives: [
        'To foster collaboration among young Africans.',
        'To develop innovative solutions to African challenges.'
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
    }
  ];
    //slideshow function by usman
  const galleryImages = [
  { src: '/images/chef_small.png', alt: 'chef' },
  { src: '/images/new_logo.png', alt: 'corpers' },
  { src: '/images/students.png', alt: 'student' },
];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  
  // State for the current program index
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const currentProgram = programsData[currentProgramIndex];

  // Function to navigate to the next program
  const nextProgram = () => {
    setCurrentProgramIndex((prevIndex) => 
      prevIndex === programsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to navigate to the previous program
  const prevProgram = () => {
    setCurrentProgramIndex((prevIndex) => 
      prevIndex === 0 ? programsData.length - 1 : prevIndex - 1
    );
  };

  // Function to navigate to a specific program
  const goToProgram = (index: React.SetStateAction<number>) => {
    setCurrentProgramIndex(index);
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextProgram();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [nextProgram]);

  return (
      <div className={'w-screen bg-white'}>
        <div className={'mx-auto flex flex-col sm:flex-row items-center justify-between px-2 py-2 bg-white'}>
          <div className="flex items-center">
            <Image className={'mr-2'} src={'/images/fmyd_logo.png'} alt={'logo'} width={80} height={80} />
          </div>
          <div className="flex flex-col items-center">
            <h1 className={'text-black text-xl sm:text-2xl font-bold'}>Yopi Tracker</h1>
            <p className={'text-black text-sm sm:text-base md:text-lg italic font-medium'}>a one stop shop for youth activities.</p>
          </div>
          <div className={'grow sm:my-0 flex flex-wrap items-center justify-center gap-2 md:gap-4 lg:gap-8'}>
            <Link className={'text-black text-sm sm:text-base md:text-lg'} href= '/'>Home</Link>
            <Link className={'text-black text-sm sm:text-base md:text-lg'} href= '/'>About</Link>
            <Link className={'text-black text-sm sm:text-base md:text-lg'} href= '/'>Program</Link>
            <Link className={'text-black text-sm sm:text-base md:text-lg'} href= '/'>Youth Policy</Link>
            <Link className={'text-black text-sm sm:text-base md:text-lg'} href='/'>Privacy Policy</Link>
            <Link className={"text-black text-sm sm:texttext-base md:text-lg"} href='/urep'>UREP</Link>
          </div>
        </div>
        
        {/* Slideshow Section */}
        <div className="flex flex-row mb-12 justify-between">
          <Image src={'/images/man1.png'} alt="man1" width={510} height={300} className={'object-cover'} />
          <section className="bg-white overflow-hidden">
              <div className="mx-auto">
                <div className="relative group max-w-5xl ">
                  <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-50">
                    <div 
                      className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                          >
                            {galleryImages.map((image, index) => (
                              <div key={index} className="relative min-w-full h-full">
                                <Image
                                  src={image.src}
                                  alt={image.alt}
                                  height={300}
                                  width={500}
                                  className="object-center"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        {/*<div className="flex justify-center gap-3 mt-8">
                          {galleryImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentIndex(index)}
                              className={`h-2.5 transition-all duration-300 rounded-full ${
                                currentIndex === index ? 'w-10 bg-emerald-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                              }`}
                            />
                          ))}
                        </div>*/}
                      </div>
                    </div>
                  </section>
          <Image src={'/images/new_logo.png'} alt="woman 1" width={510} height={300} className={'object-cover scale-x-[-1]'} />
        </div>


        
          {/*grid boxes by usman*/}
        {/* Active Programs Section */}
        
          <div className={'flex flex-col w-full items-center justify-center px-8'}>
        <h3 className={'text-center text-xl md:text-xl text-[#277B12] font-semibold my-7'}></h3>
        <div className={'w-full bg-white  overflow-hidden mt-14'}>
          <div className={'flex flex-col sm:flex-row wrap items justify-center gap 4'}>
            <div className={'flex flex-col sm:flex-row wrap item justify center'}>
              <Image src={'/images/chef_small.png'} alt={'bakepreneur'} height={400} width={300} className={''}/>
                <p></p>
                <button className={'text-white text-sm text-center'}>Read more</button>
            </div>
            <div className={'flex flex-col sm:flex-row wrap item justify center'}>
              <Image src={'/images/chef_small.png'} alt={'bakepreneur'} height={400} width={300} className={''}/>
                <p></p>
                <button className={'text-white text-sm text-center'}>Read more</button>
            </div>
            <div className={'flex flex-col sm:flex-row wrap item justify center'}>
              <Image src={'/images/chef_small.png'} alt={'bakepreneur'} height={400} width={300} className={''}/>
                <p></p>
                <button className={'text-white text-sm text-center'}>Read more</button>
            </div>
          </div>
        </div>
        <h3 className={'text-center text-xl md:text-xl text-[#277B12] font-semibold my-7'}>Active Programs</h3>
            <div className={'w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'}>
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">LOCAL YOUTH EXCHANGE PROGRAMME</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">TRAINING AND EMPOWERMENT OF
                  YOUTH ON WASTE TO WEALTH
                  MANAGEMENT, RECYCLING
                  AND REUSE IN EACH OF
                  THE 6 GEO-POLITICAL ZONES</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">YOUTH MENTAL HEALTH AND
                  PSYCHOSOCIAL SUPPORT (MHPS)
                  PROGRAMME NATION-WIDE</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">REVIEW AND IMPLEMENTATION
                  OF NIGERIA YOUTH EMPLOYMENT
                  ACTION PLAN (NIYEAP)</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">ESTABLISHMENT OF TECH/SOCIAL
                  HUBS IN THE NATIONAL YOUTH
                  DEVELOPMENT CENTRES
                  IN TWO ZONES SOUTH AND NORTH</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
              
            
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">CREATIVE ARTS AND
                  CULTURAL HERITAGE
                  PRESERVATION INITIATIVE</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
            </div>

            {/* Upcoming Programs Section */}
          <div className={'flex flex-col w-full items-center justify-center px-8'}>
            <h3 className={'text-center text-xl md:text-xl text-[#277B12] font-semibold my-7'}>Upcoming Programs</h3>

            <div className={'w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'}>
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">LOCAL YOUTH EXCHANGE PROGRAMME</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">TRAINING AND EMPOWERMENT OF
                  YOUTH ON WASTE TO WEALTH
                  MANAGEMENT, RECYCLING
                  AND REUSE IN EACH OF
                  THE 6 GEO-POLITICAL ZONES</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">YOUTH MENTAL HEALTH AND
                  PSYCHOSOCIAL SUPPORT (MHPS)
                  PROGRAMME NATION-WIDE</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">REVIEW AND IMPLEMENTATION
                  OF NIGERIA YOUTH EMPLOYMENT
                  ACTION PLAN (NIYEAP)</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">ESTABLISHMENT OF TECH/SOCIAL
                  HUBS IN THE NATIONAL YOUTH
                  DEVELOPMENT CENTRES
                  IN TWO ZONES SOUTH AND NORTH</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
              
            
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">CREATIVE ARTS AND
                  CULTURAL HERITAGE
                  PRESERVATION INITIATIVE</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        <FooterBar/>
      </div>
  );
}
