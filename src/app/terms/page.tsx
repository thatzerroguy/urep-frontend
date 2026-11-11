'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import FooterBar from '@/components/FooterBar';
import { useRouter } from 'next/navigation';

export default function GeneralTermsPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (!agreed) return;
    const searchParams = new URLSearchParams(window.location.search);
    const program = searchParams.get('program');
    router.push(`/register${program ? `?program=${program}` : ''}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <Header />

      {/* Top Banner */}
      <div className="w-full bg-[#f8f9fa] border-b border-gray-200/80 py-12 sm:py-16 text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Terms and Conditions
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl mx-auto">
          Unified Registration Portal &bull; Federal Ministry of Youth Development
        </p>
      </div>

      {/* Main Document Content */}
      <main className="max-w-3xl mx-auto w-full px-6 py-12 sm:py-16 flex-1 text-gray-800">
        <div className="space-y-10 text-sm sm:text-base leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to the Unified Registration Portal (UREP). These Terms and Conditions govern your general use of this portal and registration for all youth empowerment, capacity development, and skills acquisition programmes administered by the Federal Ministry of Youth Development.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing the portal, creating an account, or registering for any initiative, you agree to these Terms and Conditions. If you do not agree with these practices, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              2. Eligibility & Participation
            </h2>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">General Criteria</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <strong className="font-semibold text-gray-900">National Youth Definition:</strong> Programmes on this portal are designed for Nigerian citizens aged 18 to 35 years in line with the Nigerian National Youth Policy.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">NIN Requirement:</strong> All applicants must possess a valid 11-digit National Identity Number (NIN) issued by NIMC.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">Accuracy of Information:</strong> You agree to provide true, accurate, and current information. Falsification of details will lead to immediate disqualification.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              3. Information We Collect
            </h2>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Information you provide</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <strong className="font-semibold text-gray-900">Registration Information:</strong> When you create an account, we collect your name, email address, password, phone number, and verified NIN data.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">Demographic Data:</strong> State of residence, LGA, state of origin, gender, date of birth, educational background, and vocational experience.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              4. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <strong className="font-semibold text-gray-900">Processing Applications:</strong> To verify your eligibility, process your registration for specific training programmes, and communicate updates.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">National Youth Databank:</strong> To aggregate anonymized analytics that inform national youth development planning and cluster allocations.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">Data Protection:</strong> All records are secured in compliance with the Nigeria Data Protection Act (NDPA) 2023.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              5. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For inquiries regarding these Terms and Conditions or technical support, please contact the Federal Ministry of Youth Development portal support team.
            </p>
          </section>

          {/* Bottom Agreement */}
          <div className="pt-8 border-t border-gray-200 space-y-6">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#277B12] focus:ring-[#277B12] cursor-pointer"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                I have read, understand, and agree to the <strong className="font-semibold text-gray-900">General Terms and Conditions</strong> of the Unified Registration Portal.
              </span>
            </label>

            <div>
              <button
                type="button"
                onClick={handleContinue}
                disabled={!agreed}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#277B12] text-white hover:bg-[#1b5c0d] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
              >
                Continue to Registration
              </button>
            </div>
          </div>

        </div>
      </main>

      <FooterBar />
    </div>
  );
}
