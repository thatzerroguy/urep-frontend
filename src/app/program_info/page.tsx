'use client';
import React, {useMemo, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {TextField} from "@/components";
import {useRouter} from "next/navigation";

export default function ProgramInfo() {

    const router = useRouter();

    const routToProgram = () => {
        router.push(`/programs/${program}`);
    }

    const [program, setProgram] = useState('');

    // Set the program from URL parameter when component mounts
    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const programParam = searchParams.get('program');
        if (programParam) {
            setProgram(programParam);
        }
    }, []);
    const [expectations, setExpectations] = useState('');
    const [knowledge, setKnowledge] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [similarParticipation, setSimilarParticipation] = useState('');
    const [participateFMYD, setParticipateFMYD] = useState('');

    const programOptions = [
        { value: 'african_youth', label: 'African/National Youth Day 2025' },
        { value: 'bakeprenuer', label: 'Bakeprenuer Nigeria' },
        { value: 'national_youth', label: 'National Youth Policy Validation Workshop' },
        { value: 'youth_migration', label: 'Youth Migration Awareness and Management Programme (YMAMP)' },
    ];

    // Get the selected program name
    const selectedProgramName = useMemo(() => {
        if (!program) return '';
        const selectedProgram = programOptions.find(option => option.value === program);
        return selectedProgram ? selectedProgram.label : '';
    }, [program, programOptions]);


    const organisationOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
    ];
    const similarParticipationOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
    ];
    const participateFMYDOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
    ];
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt with:', { program, expectations, organisation, similarParticipation, participateFMYD });
    };
    return (
        <div className={'w-screen'}>
            <div className={'mx-auto flex items-center px-1 py-2 h-20 bg-[#277B12] mb-4'}>
                <Image className={'mr-2'} src={'/images/fmyd_logo.png'} alt={'logo'} width={80} height={80} />
                <h1 className={'text-white text-2xl font-bold'}>Yopi Tracker</h1>
                <div className={'grow'}>
                    <div className={' flex items-center justify-center gap-2 md:gap-8'}>
                        <Link className={'text-white text-lg'} href= '/'>Home</Link>
                        <Link className={'text-white text-lg'} href= '/'>About</Link>
                        <Link className={'text-white text-lg'} href= '/'>Program</Link>
                        <Link className={'text-white text-lg'} href= '/'>Youth Policy</Link>
                        <Link className={'text-white text-lg'} href= '/'>Privacy Policy</Link>
                    </div>
                </div>
                <div>
                    <Link href="/login" className={' bg-white text-black hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2.5 text-center md:mr-2 mb-2 md:mb-0'}>Login</Link>
                </div>
            </div>
            <div className={'flex flex-col items-center w-full'}>
                <h1 className={'font-bold text-2xl'}>Federal Ministry of Youth Development</h1>
                <h3 className={'text-xl font-medium'}>UNIFIED REGISTRATION PORTAL</h3>
            </div>
            <span className={'text-center font-bold text-lg text-black flex flex-row items-center m-4'}>SECTION 2 -<h4 className={'text-black text-center font-medium'}> SPECIFIC PROGRAM INFORMATION</h4></span>

            <div className={'flex flex-row mb-4 px-3'}>
                <div className={'w-full h-4 bg-[#CECDCD]'}></div>
                <div className={' w-full h-4 bg-[#277B12]'}></div>
            </div>
            <div className={'flex flex-row items-center justify-evenly px-3'}>
                <form onSubmit={handleSubmit} className={'w-[700px] gap-y-3.5'}>
                    {/* Program field - static display */}
                    <div className="mb-4">
                        <label htmlFor="program" className="block mb-2 text-sm mt-3 font-medium text-black">
                            Selected Programme
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="w-full px-4 py-4 border border-gray-300 rounded-lg bg-gray-100">
                            {selectedProgramName || "Program will be selected from the URL parameter"}
                        </div>
                    </div>

                    {/* Phone Nummber field */}
                    <TextField
                        type="text"
                        label="What are your expectations from the program?"
                        placeholder="Expectations"
                        value={expectations}
                        onChange={setExpectations}
                        required
                        id="expectations"
                    />

                    {/* Email field */}
                    <TextField
                        type="email"
                        label="How do you intend to utilize knowledge gained from the program?"
                        placeholder="Knowledge"
                        value={knowledge}
                        onChange={setKnowledge}
                        required
                        id="email"
                    />

                    {/* Residential Address field */}
                    <TextField
                        type="dropdown"
                        label="Do you belong to any organisation or institution?"
                        placeholder="Organisation"
                        value={organisation}
                        onChange={setOrganisation}
                        options={organisationOptions}
                        required
                        id="address"
                    />

                    {/* State of origin field */}
                    <TextField
                        type="dropdown"
                        label="Have you participated in any similar program in the past?"
                        placeholder="Similar Participation"
                        value={similarParticipation}
                        onChange={setSimilarParticipation}
                        options={similarParticipationOptions}
                        required
                        id="state"
                    />

                    {/* Local Government field */}
                    <TextField
                        type="dropdown"
                        label="Have you ever participated in any FMYD program?"
                        placeholder="Participate FMYD"
                        value={participateFMYD}
                        onChange={setParticipateFMYD}
                        options={participateFMYDOptions}
                        required
                        id="local-government"
                    />
                    <button
                        onClick={routToProgram}
                        type="submit"
                        className={'w-36 justify-end bg-[#277B12] text-white py-4 px-4 mb-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors'}
                    >
                        Next
                    </button>
                </form>
                {/*<div className={'flex flex-col'}>*/}
                {/*    <div className={'px-20 py-10 bg-[#277B12] items-center justify-center rounded-lg mb-8'}>*/}
                {/*        <h2 className={'text-white text-2xl font-bold text-center mb-4'}> Why Register? </h2>*/}
                {/*        <ul className={'list-disc text-white leading-8 text-xl'}>*/}
                {/*            <li>Access to Youth Empowerment Programs</li>*/}
                {/*            <li>Real-time Monitoring of Youth Policies</li>*/}
                {/*            <li>Networking Opportunities with Peers and Mentors</li>*/}
                {/*            <li>Personalized Support and Guidance</li>*/}
                {/*            <li>Stay Updated on Latest Youth Initiatives</li>*/}
                {/*        </ul>*/}
                {/*        <h2 className={'text-[#F9E79F] text-xl font-bold text-center my-4 justify-self-start'}> Need Help? </h2>*/}
                {/*        <Link href={'/'} className={'text-white text-lg font-medium text-center underline'}>Get Assistance</Link>*/}
                {/*    </div>*/}
                {/*    /!* Next button *!/*/}
                {/*    <button*/}
                {/*        onClick={routToConsent}*/}
                {/*        type="submit"*/}
                {/*        className={'w-24 justify-end bg-[#277B12] text-white py-4 px-4 mb-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors'}*/}
                {/*    >*/}
                {/*        Next*/}
                {/*    </button>*/}

                {/*</div>*/}
            </div>
        </div>
    );
}
