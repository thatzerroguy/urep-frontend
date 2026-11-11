'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import FooterBar from '@/components/FooterBar';

export interface ProgramTermsProps {
  programId: string;
  programName: string;
  scope?: string;
  customTerms?: {
    title: string;
    description?: string;
    items?: {
      subtitle?: string;
      details: string[];
    }[];
  }[];
}

export default function ProgramTermsTemplate({
  programId,
  programName,
  scope = 'National Youth Initiative',
}: ProgramTermsProps) {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (!agreed) return;
    router.push(`/register?program=${programId}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <Header />

      {/* Clean Top Banner matching reference */}
      <div className="w-full bg-[#f8f9fa] border-b border-gray-200/80 py-12 sm:py-16 text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Terms and Conditions
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl mx-auto">
          {programName} &bull; {scope}
        </p>
      </div>

      {/* Clean Document Body */}
      <main className="max-w-3xl mx-auto w-full px-6 py-12 sm:py-16 flex-1 text-gray-800">
        <div className="space-y-10 text-sm sm:text-base leading-relaxed">

          {/* 1. Introduction */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to the Unified Registration Portal (UREP), operated by the Federal Ministry of Youth Development.
              These Terms and Conditions govern your application, eligibility screening, and participation in the{' '}
              <strong className="font-semibold text-gray-900">{programName}</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By submitting an application or participating in this programme, you agree to comply with and be bound by
              the terms and guidelines set out below. If you do not agree with any part of these terms, please do not proceed
              with registration.
            </p>
          </section>

          {/* 2. Eligibility & Application Guidelines */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              2. Eligibility and Participation Criteria
            </h2>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Participant Requirements</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <strong className="font-semibold text-gray-900">Age Bracket:</strong> Open to Nigerian citizens aged 18
                  to 35 years as defined under the National Youth Policy.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">Identity Authentication:</strong> Possession of a valid
                  11-digit National Identity Number (NIN) verifiable against the National Identity Management Commission
                  (NIMC) database.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">Single Registration Policy:</strong> Each candidate may
                  submit only one application. Duplicate profiles, proxy applications, or falsification of personal details
                  will result in immediate disqualification.
                </li>
              </ul>
            </div>
          </section>

          {/* 3. Code of Conduct & Commitments */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              3. Code of Conduct and Attendance
            </h2>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Obligations of Selected Candidates</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <strong className="font-semibold text-gray-900">Attendance:</strong> Punctual and full attendance at all
                  mandatory workshops, training modules, or validation sessions.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">Professional Decorum:</strong> Mutual respect,
                  non-violent engagement, and zero tolerance for any form of harassment, discrimination, or disruptive conduct.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">Facility and Resource Care:</strong> Responsible use of
                  all equipment, learning facilities, and materials provided during the programme.
                </li>
              </ul>
            </div>
          </section>

          {/* 4. Information We Collect & Privacy */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              4. Data Collection and Privacy
            </h2>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Information you provide</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <strong className="font-semibold text-gray-900">Personal Information:</strong> Full name, date of birth,
                  gender, phone number, and residential address sourced via your verified NIN.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">Demographic & Educational Details:</strong> State of origin,
                  disability status, education level, and trade skills to assess placement and programme suitability.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How we use your information</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  To verify your identity, process admissions, and issue official ministry certifications.
                </li>
                <li>
                  All collected records are handled in strict compliance with the Nigeria Data Protection Act (NDPA) and
                  will not be shared with unauthorized third parties.
                </li>
              </ul>
            </div>
          </section>

          {/* 5. Certification and Disqualification */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              5. Certification and Disqualification
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                Official certificates and any subsequent empowerment starter benefits are conditional on meeting the
                required attendance threshold and successfully completing all programme evaluations.
              </li>
              <li>
                The Federal Ministry of Youth Development reserves the right to revoke participation or withdraw certification
                at any stage if fraudulent information or ethical violations are identified.
              </li>
            </ul>
          </section>

          {/* 6. Contact & Inquiries */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              6. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns regarding these Terms and Conditions or the registration process, please contact the Federal Ministry of Youth Development via the official portal helpdesk.
            </p>
          </section>

          {/* Bottom Agreement & Continue Section */}
          <div className="pt-8 border-t border-gray-200 space-y-6">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#277B12] focus:ring-[#277B12] cursor-pointer"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                I confirm that I have read, understand, and agree to the{' '}
                <strong className="font-semibold text-gray-900">Terms and Conditions</strong> for{' '}
                {programName}.
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

