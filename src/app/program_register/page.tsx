'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {TextField} from "@/components";
import {useRouter} from "next/navigation";

export default function RegisterPage() {

    const router = useRouter();
    const [programId, setProgramId] = useState('');

    const routeToProgramPage = () => {
        router.push(`/programs/${programId || 'bakeprenuer'}`);
    }

    // Set the program from URL parameter when component mounts
    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const programParam = searchParams.get('program');
        if (programParam) {
            setProgramId(programParam);
        }
    }, []);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('');
    const [localGovernment, setLocalGovernment] = useState('');
    const [geopoliticalZone, setGeopoliticalZone] = useState('');
    const [disability, setDisability] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');

    const dropdownOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const disabilityOptions = [
        { value: 'visual', label: 'Visual Impairment' },
        { value: 'hearing', label: 'Hearing Impairment' },
        { value: 'mobility', label: 'Mobility Impairment' },
        { value: 'mental', label: 'Mental Impairment' },
        { value: 'learning', label: 'Learning Disability' },
        { value: 'other', label: 'Other Disability' },
    ];

    const maritalStatusOptions = [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' },
    ];

    const stateNigeriaOptions = [
        { value: 'abia', label: 'Abia' },
        { value: 'adamawa', label: 'Adamawa' },
        { value: 'akwa_ibom', label: 'Akwa Ibom' },
        { value: 'anambra', label: 'Anambra' },
        { value: 'bauchi', label: 'Bauchi' },
        { value: 'bayelsa', label: 'Bayelsa' },
        { value: 'benue', label: 'Benue' },
        { value: 'borno', label: 'Borno' },
        { value: 'cross_river', label: 'Cross River' },
        { value: 'delta', label: 'Delta' },
        { value: 'ebonyi', label: 'Ebonyi' },
        { value: 'edo', label: 'Edo' },
        { value: 'ekiti', label: 'Ekiti' },
        { value: 'enugu', label: 'Enugu' },
        { value: 'gombe', label: 'Gombe' },
        { value: 'imo', label: 'Imo' },
        { value: 'jigawa', label: 'Jigawa' },
        { value: 'kaduna', label: 'Kaduna' },
        { value: 'kano', label: 'Kano' },
        { value: 'katsina', label: 'Katsina' },
        { value: 'kebbi', label: 'Kebbi' },
        { value: 'kogi', label: 'Kogi' },
        { value: 'kwara', label: 'Kwara' },
        { value: 'lagos', label: 'Lagos' },
        { value: 'nasarawa', label: 'Nasarawa' },
        { value: 'niger', label: 'Niger' },
        { value: 'ogun', label: 'Ogun' },
        { value: 'ondo', label: 'Ondo' },
        { value: 'osun', label: 'Osun' },
        { value: 'oyo', label: 'Oyo' },
        { value: 'plateau', label: 'Plateau' },
        { value: 'rivers', label: 'Rivers' },
        { value: 'sokoto', label: 'Sokoto' },
        { value: 'taraba', label: 'Taraba' },
        { value: 'yobe', label: 'Yobe' },
        { value: 'zamfara', label: 'Zamfara' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt with:', { email, password });
    };
    return (
        <div className={'w-screen'}>
            <div className={'mx-auto flex items-center px-1 py-2 h-20 bg-[#277B12] mb-4 w-screen'}>
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
                    <Link href={'/register'} className={' bg-[#277B12] text-white hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2.5 text-center mb-2 md:mb-0 border-white border-2'}>Register</Link>
                </div>
            </div>
            <div className={'flex flex-col items-center w-full'}>
                <h1 className={'font-bold text-2xl'}>Federal Ministry of Youth Development</h1>
                <h3 className={'text-xl font-medium'}>UNIFIED REGISTRATION PORTAL</h3>
            </div>
            <span className={'text-center font-bold text-lg text-black flex flex-row items-center m-4'}>SECTION 1 -<h4 className={'text-black text-center font-medium'}> PARTICIPANT GENERAL INFORMATION</h4></span>

            <div className={'flex flex-row mb-4 px-3'}>
                <div className={'w-full h-4 bg-[#CECDCD]'}></div>
                <div className={' w-full h-4 bg-[#277B12]'}></div>
            </div>
            <div className={'flex flex-row items-center justify-between px-3'}>
                <h2 className={'font-semibold text-xl'}>1. Participant General Information</h2>
                <h2 className={'font-medium text-sm text-gray-500'}>2. Education and Skills</h2>
            </div>
            <div className={'flex flex-row items-center justify-evenly px-3'}>
                <form onSubmit={handleSubmit} className={'w-[700px] gap-y-3.5'}>
                    {/* Name field */}
                    <TextField
                        type="text"
                        label="Name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={setName}
                        required
                        id="name"
                    />

                    {/* Phone Nummber field */}
                    <TextField
                        type="text"
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        value={name}
                        onChange={setName}
                        required
                        id="phone"
                    />

                    {/* Email field */}
                    <TextField
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={setEmail}
                        required
                        id="email"
                    />

                    {/* Residential Address field */}
                    <TextField
                        type="text"
                        label="Residential Address"
                        placeholder="Enter your residential address"
                        value={name}
                        onChange={setName}
                        required
                        id="address"
                    />

                    {/* State of origin field */}
                    <TextField
                        type="dropdown"
                        label="State of origin"
                        placeholder="Enter your state of origin"
                        value={state}
                        onChange={setState}
                        required
                        options={stateNigeriaOptions}
                        id="state"
                    />

                    {/* Local Government field */}
                    <TextField
                        type="dropdown"
                        label="Local Government"
                        placeholder="Enter your local government"
                        value={localGovernment}
                        onChange={setLocalGovernment}
                        required
                        options={dropdownOptions}
                        id="local-government"
                    />

                    {/* Geopolitical Zone field */}
                    <TextField
                        type="dropdown"
                        label="Geopolitical Zone"
                        placeholder="Enter your geopolitical zone"
                        value={geopoliticalZone}
                        onChange={setGeopoliticalZone}
                        required
                        options={dropdownOptions}
                        id="geopolitical-zone"
                    />

                    {/* Disability field */}
                    <TextField
                        type="dropdown"
                        label="Disability"
                        placeholder="Enter your disability"
                        value={disability}
                        onChange={setDisability}
                        required
                        options={disabilityOptions}
                        id="disability"
                    />

                    {/* Marital Status field */}
                    <TextField
                        type="dropdown"
                        label="Marital Status"
                        placeholder="Enter your marital status"
                        value={maritalStatus}
                        onChange={setMaritalStatus}
                        required
                        options={maritalStatusOptions}
                        id="marital-status"
                    />

                    {/* Password field */}
                    <TextField
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={setPassword}
                        required
                        id="password"
                    />

                </form>
                <div className={'flex flex-col'}>
                    <div className={'px-20 py-10 bg-[#277B12] items-center justify-center rounded-lg mb-8'}>
                        <h2 className={'text-white text-2xl font-bold text-center mb-4'}> Why Register? </h2>
                        <ul className={'list-disc text-white leading-8 text-xl'}>
                            <li>Access to Youth Empowerment Programs</li>
                            <li>Real-time Monitoring of Youth Policies</li>
                            <li>Networking Opportunities with Peers and Mentors</li>
                            <li>Personalized Support and Guidance</li>
                            <li>Stay Updated on Latest Youth Initiatives</li>
                        </ul>
                        <h2 className={'text-[#F9E79F] text-xl font-bold text-center my-4 justify-self-start'}> Need Help? </h2>
                        <Link href={'/'} className={'text-white text-lg font-medium text-center underline'}>Get Assistance</Link>
                    </div>
                    {/* Next button */}
                    <button
                        onClick={routeToProgramPage}
                        type="submit"
                        className={'w-24 justify-end bg-[#277B12] text-white py-4 px-4 mb-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors'}
                    >
                        Next
                    </button>

                </div>
            </div>
        </div>
    );
}
