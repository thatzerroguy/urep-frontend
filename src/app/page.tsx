'use client';

import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {FaChevronLeft, FaChevronRight, FaSearch} from "react-icons/fa";
import {FaSliders, FaSort} from "react-icons/fa6";
import FooterBar from "@/components/FooterBar";

export default function Home() {
  // Program data for the carousel
  const programsData = [
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
      <div className={'w-screen'}>
        <div className={''}>
          <div className={'mx-auto flex flex-col sm:flex-row items-center px-2 py-2 bg-[#277B12]'}>
            <div className="flex items-center">
              <Image className={'mr-2'} src={'/images/fmyd_logo.png'} alt={'logo'} width={80} height={80} />
              <h1 className={'text-white text-xl sm:text-2xl font-bold'}>Yopi Tracker</h1>
            </div>
            <div className={'grow sm:my-0'}>
              <div className={'flex flex-wrap items-center justify-center gap-2 md:gap-4 lg:gap-8'}>
                <Link className={'text-white text-sm sm:text-base md:text-lg'} href= '/'>Home</Link>
                <Link className={'text-white text-sm sm:text-base md:text-lg'} href= '/'>About</Link>
                <Link className={'text-white text-sm sm:text-base md:text-lg'} href= '/'>Program</Link>
                <Link className={'text-white text-sm sm:text-base md:text-lg'} href= '/'>Youth Policy</Link>
                <Link className={'text-white text-sm sm:text-base md:text-lg'} href= '/'>Privacy Policy</Link>
              </div>
            </div>
          </div>

          <div className={'flex flex-col items-center w-full'}>
            <div className={'flex flex-col md:flex-row justify-center items-center gap-6 md:gap-x-8 lg:gap-x-16'}>
              <Image src={'/images/man1.png'} alt={'man'} width={300} height={300} className="hidden md:block" />

              <div className={'flex flex-col items-center gap-y-2 text-center px-4'}>
                <h1 className={'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#277B12]'}>FMYD</h1>
                <h2 className={'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black'}>UNIFIED REGISTRATION PORTAL</h2>
                <h2 className={'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black'}>(UREP)</h2>
                <h4 className={'text-black text-base sm:text-lg md:text-xl text-center'}>REALTIME YOUTH POLICY MONITORING AND EMPOWERMENT PROGRAMS</h4>
              </div>

              <Image src={'/images/man2.png'} alt={'man'} width={300} height={300} className="hidden md:block" />
            </div>
          </div>
          {/* Programs Sections */}
          <div className={'w-full bg-[#277B12]  overflow-hidden'}>
            <div className={'flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4'}>
              <Image src={'/images/chef_small.png'} alt={'bakeprenuer'} width={510} height={300} className={'w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] h-[200px] sm:h-[250px] md:h-[300px] object-cover'}/>
              <Image src={'/images/corpers.png'} alt={'national_youth'} width={510} height={300} className={'w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] h-[200px] sm:h-[250px] md:h-[300px] object-cover'} />
              <Image src={'/images/students.png'} alt={'youth_migration'} width={510} height={300} className={'w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] h-[200px] sm:h-[250px] md:h-[300px] object-cover'} />
              <Image src={'/images/speaker.png'} alt={'african_youth'} width={510} height={300} className={'w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] h-[200px] sm:h-[250px] md:h-[300px] object-cover'} />
            </div>
          </div>

          {/* Search and Sort Buttons */}
          <div className={'flex flex-row space-x-4 mt-6 md:mt-10 justify-between w-full px-8'}>
            <div className={'w-44 h-12 bg-[#277B12] rounded-lg flex flex-row justify-evenly items-center'}>
              <FaSearch color={'white'} size={18}></FaSearch>
              <p className={'text-white text-center font-medium'}>Search</p>
            </div>
            <div className={'w-32 h-12 border border-[#277B12] rounded-lg flex flex-row justify-evenly items-center'}>
              <FaSliders color={'black'} size={18}></FaSliders>
              <p className={'text-black text-center font-medium'}>Sort</p>
              <FaSort color={'black'} size={18}></FaSort>
            </div>
          </div>


          {/*Active programs sections*/}
          <div className={'flex flex-col my-6 md:mt-6 w-[95%] mx-auto'}>
            <h2 className={'font-semibold text-xl text-center text-[#277B12] mb-4 md:mb-5'}>Active Programs</h2>

            <div className={'flex flex-col lg:flex-row gap-6'}>
              {/* Program Card Carousel */}
              <div className={'flex-1 relative'}>
                <div className={'flex flex-col justify-center bg-gradient-to-b from-[#277B12] to-[#F9E79F] rounded-lg shadow-xl p-6 h-[550px] md:h-[550px] lg:h-[518px] overflow-y-auto'}>
                  <h2 className={'font-semibold text-xl text-center text-black mb-3 md:mb-4 pt-3'}>{currentProgram.title}</h2>
                  <div className={'flex flex-col lg:flex-row items-center gap-4'}>
                    <div className={'flex-col justify-start w-full lg:w-1/2'}>
                      <h1 className={'text-white text-lg md:text-xl font-semibold'}>Background</h1>
                      <p className={'text-black font-normal text-xs md:text-sm text-wrap leading-5 mb-2'}>
                        {currentProgram.background}
                      </p>
                      <h3 className={'text-sm md:text-base text-white font-semibold'}>Learn More</h3>

                      <hr className="my-2"/>

                      <h1 className={'text-white text-lg md:text-xl font-semibold'}>Objectives</h1>
                      <ul className="pl-2 mb-2">
                        {currentProgram.objectives.map((objective, index) => (
                          <li key={index} className={'text-black font-normal text-xs md:text-sm text-wrap leading-5'}>
                            {objective}
                          </li>
                        ))}
                      </ul>
                      <h3 className={'text-sm md:text-base text-white font-semibold'}>Learn More</h3>

                      <hr className="my-2"/>

                      <h1 className={'text-white text-lg md:text-xl font-semibold'}>Who Should Attend</h1>
                      <ul className="pl-2 mb-2">
                        {currentProgram.targetAudience.map((audience, index) => (
                          <li key={index} className={'text-black font-normal text-xs md:text-sm text-wrap leading-5'}>
                            {audience}
                          </li>
                        ))}
                      </ul>
                      <h3 className={'text-sm md:text-base text-white font-semibold'}>Learn More</h3>
                    </div>

                    <div className={'flex flex-col justify-center items-center w-full lg:w-1/2'}>
                      <div className={'w-full max-w-[350px] object-cover'}>
                        <Image 
                          src={currentProgram.mainImage} 
                          alt={currentProgram.title} 
                          width={450} 
                          height={350} 
                          className={'rounded-lg w-full h-[300px] object-cover shadow-md'}
                        />
                      </div>
                      <Link 
                        href={`/terms?program=${currentProgram.id}`}
                        className={'text-center text-base md:text-lg text-[#277B12] font-semibold mt-4 rounded-lg bg-white px-6 py-3 hover:bg-gray-100 transition-colors shadow-md'}
                      >
                        Register Now
                      </Link>
                    </div>
                  </div>

                  {/* Date display */}
                  <div className="flex justify-end mt-2">
                    <p className="text-black text-sm font-bold">Date: {currentProgram.date}</p>
                  </div>
                </div>

                {/* Navigation buttons */}
                <button 
                  onClick={prevProgram}
                  className={'absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors'}
                >
                  <FaChevronLeft size={24} color={'#277B12'} />
                </button>

                <button 
                  onClick={nextProgram}
                  className={'absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors'}
                >
                  <FaChevronRight size={24} color={'#277B12'} />
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className={'w-full lg:w-[20%] flex flex-col'}>
                <div className={'flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto'}>
                  {programsData.map((program, index) => (
                    <div 
                      key={program.id}
                      onClick={() => goToProgram(index)}
                      className={`cursor-pointer transition-all duration-300 ${currentProgramIndex === index ? 'scale-105 ring-2 ring-[#277B12]' : 'opacity-80 hover:opacity-100'}`}
                    >
                      <div className={'relative'}>
                        <Image 
                          src={program.thumbnailImage} 
                          alt={program.title} 
                          width={200} 
                          height={120} 
                          className={'rounded-lg w-full h-[120px] object-cover shadow-md'}
                        />
                        <div className={'absolute inset-0 bg-black/40 rounded-lg flex items-end'}>
                          <p className={'text-white text-sm font-medium p-2 truncate w-full'}>
                            {program.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

            {/* Other Programs Section */}
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
                <p className="text-center mb-4">YOUTH ENTREPRENEURSHIP
                  DEVELOPMENT PROGRAM
                  FOR SUSTAINABLE GROWTH</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">DIGITAL SKILLS TRAINING
                  FOR RURAL YOUTH
                  EMPOWERMENT</p>
                <div className={'flex items-center justify-center rounded-lg bg-[#277B12] py-1 w-20'}>
                  <p className={'text-white text-sm text-center'}>Read More</p>
                </div>
              </div>
              <div className={'h-[250px] px-4 py-4 flex flex-col justify-center items-center shadow-2xl rounded-md'}>
                <p className="text-center mb-4">AGRICULTURAL INNOVATION
                  AND MODERNIZATION
                  FOR YOUTH FARMERS</p>
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
