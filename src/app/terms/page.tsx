'use client';
import FooterBar from "@/components/FooterBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";

export default function TermsPage() {
    const router = useRouter();
    const navigateToRegisterPage = () => {
        // Get the program parameter from the URL
        const searchParams = new URLSearchParams(window.location.search);
        const program = searchParams.get('program');

        // Navigate to register page with program parameter
        router.push(`/register?program=${program || ''}`);
    }
  return (
      <div className={'w-screen min-h-screen flex flex-col'}>
          {/* Header */}
          <div className={'mx-auto flex items-center px-1 py-2 h-20 bg-[#277B12] mb-4 w-full'}>
              <Image className={'mr-2'} src={'/images/fmyd_logo.png'} alt={'logo'} width={80} height={80} />
              <h1 className={'text-white text-2xl font-bold'}>Yopi Tracker</h1>
              <div className={'grow'}>
                  <div className={'flex items-center justify-center gap-2 md:gap-8'}>
                      <Link className={'text-white text-lg'} href= '/'>Home</Link>
                      <Link className={'text-white text-lg'} href= '/'>About</Link>
                      <Link className={'text-white text-lg'} href= '/'>Program</Link>
                      <Link className={'text-white text-lg'} href= '/'>Youth Policy</Link>
                      <Link className={'text-white text-lg'} href= '/'>Privacy Policy</Link>
                  </div>
              </div>
          </div>

          {/* Main Content */}
          <div className={'flex-grow flex flex-col items-center w-full px-4 py-8 mb-16'}>
              <h1 className={'font-bold text-3xl my-4 sm:my-8 text-center'}>TERMS AND CONDITIONS</h1>
              <ul className={'list-disc text-black leading-7 sm:leading-8 text-base sm:text-xl mb-8 max-w-3xl mx-auto px-4'}>
                  <li>Make sure all information provided are accurate. Multiple registration by the same person is not allowed.</li>
                  <li>This Program will be taken place in Ondo State</li>
                  <li>Free transportation will be provided by the ministry from Headquarter everyday during the program</li>
                  <li>This is a three day program.</li>
              </ul>
              <button
                  type="submit"
                  onClick={navigateToRegisterPage}
                  className={'w-full sm:w-[30%] bg-[#277B12] text-white py-4 px-4 mb-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors'}
              >
                  I agree to continue
              </button>
          </div>

          {/* Footer */}
          <div className={'w-full mt-auto'}>
              <FooterBar/>
          </div>
      </div>
  );
}
