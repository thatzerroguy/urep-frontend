'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from "next/navigation";

export default function ConsentPage() {

    const router = useRouter();
    const [programId, setProgramId] = useState('');

    const routToSuccess = () => {
        router.push(`/success?program=${programId}`);
    }

    // Set the program from URL parameter when component mounts
    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const programParam = searchParams.get('program');
        if (programParam) {
            setProgramId(programParam);
        }
    }, []);

    const [agreement, setAgreement] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt with:', { agreement });
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
            </div>
            <div className={'flex flex-col items-center w-full'}>
                <h1 className={'font-bold text-2xl'}>Federal Ministry of Youth Development</h1>
                <h3 className={'text-xl font-medium'}>UNIFIED REGISTRATION PORTAL</h3>
            </div>
            <span className={'text-center font-bold text-lg text-black flex flex-row items-center m-4'}>SECTION 3 -<h4 className={'text-black text-center font-medium'}> Consent and Declaration</h4></span>

            <div className={'flex flex-row mb-4 px-3'}>
                <div className={'w-full h-4 bg-[#CECDCD]'}></div>
                <div className={' w-full h-4 bg-[#277B12]'}></div>
            </div>
            <div className={'flex flex-row items-center justify-between px-3'}>
                <h2 className={'font-semibold text-xl'}>1. Consent and Declaration</h2>
            </div>
            <div className={'flex flex-row items-center justify-evenly px-3'}>
                <form onSubmit={handleSubmit} className={'w-[900px] gap-y-3.5 mt-12'}>
                    <p>I grant my consent for the Ministry to use my information,
                        including Photos, for purpose of documentation, reporting
                        and administration of the program only. I hereby declare
                        that the information provided is true and correct.
                        I understand that misrepresentation may result in
                        disqualification
                    </p>
                    <div className={'flex justify-between items-center mb-6 mt-4'}>
                        <div className={'flex items-center'}>
                            <input
                                type="checkbox"
                                id="remember-me"
                                checked={agreement}
                                onChange={(e) => setAgreement(e.target.checked)}
                                className={'mr-2 h-4 w-4 text-[#277B12] focus:ring-[#277B12] border-gray-300 rounded'}
                            />
                            <label htmlFor="remember-me" className={'text-sm text-black font-medium'}>
                                Read and accept the <a href={'/terms'} className={'text-[#277B12] hover:underline font-semibold'}>Terms and Conditions</a> of this programme to continue
                            </label>
                        </div>
                    </div>
                    <button
                        onClick={routToSuccess}
                        type="submit"
                        className={'w-24 justify-end bg-[#277B12] text-white py-4 px-4 mb-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors'}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
