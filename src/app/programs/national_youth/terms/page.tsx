'use client';
import FooterBar from "@/components/FooterBar";
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

export default function NationalYouthTermsPage() {
    const router = useRouter();
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleContinue = () => {
        if (!agreedToTerms) {
            alert('Please agree to the terms and conditions to continue');
            return;
        }
        router.push('/register?program=national_youth');
    }

    return (
        <div className={'w-screen min-h-screen flex flex-col'}>
            {/* Header */}
            <div className={'mx-auto flex items-center px-1 py-2 h-20 bg-[#277B12] mb-4 w-full'}>
                <Image className={'mr-2'} src={'/images/fmyd_logo.png'} alt={'logo'} width={80} height={80} />
                <h1 className={'text-white text-2xl font-bold'}>Yopi Tracker</h1>
                <div className={'grow'}>
                    <div className={'flex items-center justify-center gap-2 md:gap-8'}>
                        <Link className={'text-white text-lg'} href='/'>Home</Link>
                        <Link className={'text-white text-lg'} href='/'>About</Link>
                        <Link className={'text-white text-lg'} href='/'>Program</Link>
                        <Link className={'text-white text-lg'} href='/'>Youth Policy</Link>
                        <Link className={'text-white text-lg'} href='/'>Privacy Policy</Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={'flex-grow flex flex-col items-center w-full px-4 py-8 mb-16'}>
                <h1 className={'font-bold text-3xl my-4 sm:my-8 text-center text-[#277B12]'}>
                    National Youth Policy Validation Workshop
                </h1>
                <h2 className={'font-semibold text-2xl mb-6 text-center'}>Terms and Conditions</h2>

                <div className={'max-w-4xl mx-auto w-full space-y-8 px-4'}>
                    {/* All Content in Single Div */}
                    <div className={'bg-white p-6 rounded-lg shadow-md'}>
                        <h3 className={'font-bold text-xl text-[#277B12] mb-3'}>Background</h3>
                        <p className={'text-gray-700 leading-7 mb-2'}>
                            The National Youth Policy Validation Workshop provides a platform for stakeholders to review 
                            and validate the revised National Youth Policy. It ensures inclusivity, stakeholder input, and 
                            alignment of the policy with current realities facing Nigerian youths.
                        </p>


                        <h3 className={'font-bold text-xl text-[#277B12] mb-3 mt-6'}>Objectives</h3>
                        <ul className={'list-disc pl-6 space-y-2 text-gray-700 leading-7 mb-2'}>
                            <li>To provide a platform for youth to voice their concerns and ideas.</li>
                            <li>To develop actionable solutions to challenges facing Nigerian youth.</li>
                        </ul>

                        <h3 className={'font-bold text-xl text-[#277B12] mb-3 mt-6'}>Who Should Attend</h3>
                        <ul className={'list-disc pl-6 space-y-2 text-gray-700 leading-7 mb-2'}>
                            <li>Youth development stakeholders.</li>
                            <li>Government representatives (MDAs, State Ministries).</li>
                            <li>Civil Society Organisations (CSOs/NGOs).</li>
                            <li>Development partners and donor agencies</li>
                            <li>Private sector organisations with youth-related initiatives</li>
                        </ul>
                    </div>

                    {/* Agreement Checkbox */}
                    <div className={'bg-gray-50 p-6 rounded-lg border-2 border-gray-200'}>
                        <label className={'flex items-start space-x-3 cursor-pointer'}>
                            <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className={'mt-1 h-5 w-5 text-[#277B12] focus:ring-[#277B12] border-gray-300 rounded'}
                            />
                            <span className={'text-gray-700 font-medium'}>
                                Do you agree to these terms and conditions?
                            </span>
                        </label>
                    </div>

                    {/* Continue Button */}
                    <button
                        type="button"
                        onClick={handleContinue}
                        disabled={!agreedToTerms}
                        className={`w-full sm:w-[50%] mx-auto block py-4 px-4 rounded-lg font-semibold transition-colors ${
                            agreedToTerms
                                ? 'bg-[#277B12] text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        I agree to continue
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className={'w-full mt-auto'}>
                <FooterBar/>
            </div>
        </div>
    );
}
