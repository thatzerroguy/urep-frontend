'use client';

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TextField } from "@/components";
import { useRouter } from "next/navigation";
import statesData from "nigerian-states/src/states.json";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const [registrantType, setRegistrantType] = useState('');
    const [nin, setNin] = useState('');
    const [programme, setProgramme] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [state, setState] = useState('');
    const [lga, setLga] = useState('');
    const [stateOptions, setStateOptions] = useState<{ value: string; label: string }[]>([]);
    const [lgaOptions, setLgaOptions] = useState<{ value: string; label: string }[]>([]);
    const [organisation, setOrganisation] = useState('');
    const [governmentAgency, setGovernmentAgency] = useState('');
    const [otp, setOtp] = useState('');
    const [isNINVerified, setIsNINVerified] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [generatedOTP, setGeneratedOTP] = useState('');
    const requiresNIN = registrantType === 'youth_participant' || registrantType === 'corps_member';

    const registrantTypeOptions = [
        { value: 'youth_participant', label: 'Youth Participant' },
        { value: 'corps_member', label: 'Corps Member' },
        { value: 'guest', label: 'Guest' },
        { value: 'ministry_of_youth', label: 'Ministry of Youth' },
    ];

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
    ];

    // Section C: Demographics
    const [stateOfOrigin, setStateOfOrigin] = useState('');
    const [lgaOfOrigin, setLgaOfOrigin] = useState('');
    const [lgaOfOriginOptions, setLgaOfOriginOptions] = useState<{ value: string; label: string }[]>([]);
    const [disabilityStatus, setDisabilityStatus] = useState<string[]>(['none']);
    const [otherDisability, setOtherDisability] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');

    // Section D: Education & Skills
    const [educationLevel, setEducationLevel] = useState('');
    const [otherEducation, setOtherEducation] = useState('');
    const [occupationStatus, setOccupationStatus] = useState('');
    const [otherOccupation, setOtherOccupation] = useState('');
    const [skillsInterest, setSkillsInterest] = useState('');
    const [yearsExperience, setYearsExperience] = useState('');

    // Demo NIN database
    const demoNINDatabase: Record<string, { name: string; dob: string; gender: string; phoneNumber: string }> = {
        '12345678901': {
            name: 'Adewale Johnson',
            dob: '1995-03-15',
            gender: 'Male',
            phoneNumber: '08012345678'
        },
        '98765432109': {
            name: 'Chiamaka Okonkwo',
            dob: '1998-07-22',
            gender: 'Female',
            phoneNumber: '08098765432'
        },
        '11122233344': {
            name: 'Ibrahim Musa',
            dob: '1992-11-08',
            gender: 'Male',
            phoneNumber: '08011122233'
        },
        '55566677788': {
            name: 'Blessing Adebayo',
            dob: '2000-01-30',
            gender: 'Female',
            phoneNumber: '08055566677'
        },
        '99988877766': {
            name: 'Chinedu Okafor',
            dob: '1996-09-12',
            gender: 'Male',
            phoneNumber: '08099988877'
        }
    };

    // Set the program from URL parameter when component mounts
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const programParam = searchParams.get('program');
        if (programParam) {
            setProgramme(programParam);
        }
    }, []);

    // Load Nigerian states on mount
    useEffect(() => {
        const stateNames = Object.keys(statesData);
        const stateOpts = stateNames.map((stateName: string) => ({
            value: stateName,
            label: stateName
        }));
        setStateOptions(stateOpts);
    }, []);

    const programmeOptions = useMemo(() => [
        { value: 'african_youth', label: 'African/National Youth Day 2025' },
        { value: 'bakeprenuer', label: 'Bakeprenuer Nigeria' },
        { value: 'entrepreneurship', label: 'Entrepreneurship Programme for Unemployed Youths Of South-West Geopolitical Zone' },
        { value: 'national_youth', label: 'National Youth Policy Validation Workshop' },
        { value: 'youth_migration', label: 'Youth Migration Awareness and Management Programme (YMAMP)' },
    ], []);

    // Get the selected program name
    const selectedProgramName = useMemo(() => {
        if (!programme) return '';
        const selectedProgram = programmeOptions.find(option => option.value === programme);
        return selectedProgram ? selectedProgram.label : '';
    }, [programme, programmeOptions]);

    // Handle state change and load corresponding LGAs
    const handleStateChange = (selectedState: string) => {
        setState(selectedState);
        setLga('');

        const stateInfo = statesData[selectedState as keyof typeof statesData];
        let lgas: string[] = [];

        if (Array.isArray(stateInfo)) {
            lgas = stateInfo;
        } else if (stateInfo && typeof stateInfo === 'object' && 'lgas' in stateInfo) {
            lgas = stateInfo.lgas;
        }

        if (lgas.length > 0) {
            setLgaOptions(lgas.map((lgaName: string) => ({ value: lgaName, label: lgaName })));
        } else {
            setLgaOptions([]);
        }
    };

    // Handle NIN change
    const handleNINChange = (value: string) => {
        setNin(value);
        const ninElem = document.getElementById('nin') as HTMLInputElement;
        if (ninElem) {
            ninElem.setCustomValidity('');
        }
        setIsNINVerified(false);
        setOtpSent(false);
        setOtp('');
        setName('');
        setDob('');
        setGender('');
        setPhoneNumber('');
    };

    const handleRegistrantTypeChange = (value: string) => {
        setRegistrantType(value);
        setNin('');
        setIsNINVerified(false);
        setOtpSent(false);
        setOtp('');
        setGeneratedOTP('');
        setName('');
        setDob('');
        setGender('');
        setPhoneNumber('');
    };

    // Send OTP (simulated with native validation feedback)
    const handleSendOTP = () => {
        const ninElem = document.getElementById('nin') as HTMLInputElement;
        if (!nin || nin.length !== 11) {
            if (ninElem) {
                ninElem.setCustomValidity('Please enter a valid 11-digit NIN');
                ninElem.reportValidity();
            }
            return;
        }

        if (!demoNINDatabase[nin]) {
            if (ninElem) {
                ninElem.setCustomValidity('NIN not found. Try demo: 12345678901, 98765432109, 11122233344, 55566677788');
                ninElem.reportValidity();
            }
            return;
        }

        if (ninElem) {
            ninElem.setCustomValidity('');
        }

        const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(randomOtp);
        setOtpSent(true);
    };

    // Verify OTP and fill NIN data
    const handleVerifyOTP = () => {
        const otpElem = document.getElementById('otpInput') as HTMLInputElement;
        if (!otp) {
            if (otpElem) {
                otpElem.setCustomValidity('Please enter the OTP');
                otpElem.reportValidity();
            }
            return;
        }

        if (otp !== generatedOTP) {
            if (otpElem) {
                otpElem.setCustomValidity('Invalid OTP. Please check the code and try again.');
                otpElem.reportValidity();
            }
            return;
        }

        if (otpElem) {
            otpElem.setCustomValidity('');
        }

        const ninData = demoNINDatabase[nin];
        if (ninData) {
            setName(ninData.name);
            setDob(ninData.dob);
            setGender(ninData.gender);
            setPhoneNumber(ninData.phoneNumber);
            setIsNINVerified(true);

            const ninElem = document.getElementById('nin') as HTMLInputElement;
            if (ninElem) {
                ninElem.setCustomValidity('');
            }
        }
    };

    // Handle password changes
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        const confirmElem = document.getElementById('confirmPassword') as HTMLInputElement;
        if (confirmElem && confirmPassword && value !== confirmPassword) {
            confirmElem.setCustomValidity('Passwords do not match');
        } else if (confirmElem) {
            confirmElem.setCustomValidity('');
        }
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        const confirmElem = document.getElementById('confirmPassword') as HTMLInputElement;
        if (confirmElem) {
            if (password && value !== password) {
                confirmElem.setCustomValidity('Passwords do not match');
            } else {
                confirmElem.setCustomValidity('');
            }
        }
    };

    // Handle state of origin change and load corresponding LGAs
    const handleStateOfOriginChange = (selectedState: string) => {
        setStateOfOrigin(selectedState);
        setLgaOfOrigin('');

        const stateInfo = statesData[selectedState as keyof typeof statesData];
        let lgas: string[] = [];

        if (Array.isArray(stateInfo)) {
            lgas = stateInfo;
        } else if (stateInfo && typeof stateInfo === 'object' && 'lgas' in stateInfo) {
            lgas = stateInfo.lgas;
        }

        if (lgas.length > 0) {
            setLgaOfOriginOptions(lgas.map((lgaName: string) => ({ value: lgaName, label: lgaName })));
        } else {
            setLgaOfOriginOptions([]);
        }
    };

    // Handle disability checkbox
    const handleDisabilityCheckbox = (value: string) => {
        const firstBox = document.getElementById('disability-none') as HTMLInputElement;
        if (firstBox) {
            firstBox.setCustomValidity('');
        }

        if (value === 'none') {
            setDisabilityStatus(['none']);
            setOtherDisability('');
            return;
        }

        let updated = disabilityStatus.filter(v => v !== 'none');
        if (updated.includes(value)) {
            updated = updated.filter(item => item !== value);
            if (value === 'other') setOtherDisability('');
        } else {
            updated.push(value);
        }

        if (updated.length === 0) {
            updated = ['none'];
        }
        setDisabilityStatus(updated);
    };

    const organisationOptions = [
        { value: 'NGO', label: 'NGO' },
        { value: 'Government Agency', label: 'Government Agency' },
        { value: 'Private Sector', label: 'Private Sector' },
        { value: 'Educational Institution', label: 'Educational Institution' },
        { value: 'Other', label: 'Other' },
    ];

    const governmentAgencyOptions = [
        { value: 'FEDERAL MINISTRY OF YOUTH DEVELOPMENT', label: 'FEDERAL MINISTRY OF YOUTH DEVELOPMENT' },
        { value: 'CITIZENSHIP AND LEADERSHIP TRAINING CENTRE', label: 'CITIZENSHIP AND LEADERSHIP TRAINING CENTRE' },
        { value: 'FEDERAL MIN. OF WOMEN AFFAIRS AND SOCIAL DEVELOPMENT', label: 'FEDERAL MIN. OF WOMEN AFFAIRS AND SOCIAL DEVELOPMENT' },
        { value: 'FEDERAL MINISTRY OF ENVIRONMENT', label: 'FEDERAL MINISTRY OF ENVIRONMENT' },
        { value: 'FEDERAL MINISTRY OF EDUCATION', label: 'FEDERAL MINISTRY OF EDUCATION' },
        { value: 'FEDERAL MINISTRY OF HUMANITARIAN AFFAIRS AND POVERTY REDUCTION', label: 'FEDERAL MINISTRY OF HUMANITARIAN AFFAIRS AND POVERTY REDUCTION' },
        { value: 'FEDERAL MINISTRY OF LABOUR AND EMPLOYMENT', label: 'FEDERAL MINISTRY OF LABOUR AND EMPLOYMENT' },
        { value: 'FEDERAL MINISTRY OF WATER RESOURCES AND SANITATION', label: 'FEDERAL MINISTRY OF WATER RESOURCES AND SANITATION' },
        { value: 'FEDERAL MINISTRY OF INNOVATION, SCIENCE AND TECHNOLOGY', label: 'FEDERAL MINISTRY OF INNOVATION, SCIENCE AND TECHNOLOGY' },
        { value: 'FEDERAL MINISTRY OF AGRICULTURE AND FOOD SECURITY', label: 'FEDERAL MINISTRY OF AGRICULTURE AND FOOD SECURITY' },
        { value: 'NATIONAL INFORMATION, TECHNOLOGY DEVELOPMENT AGENCY (NITDA)', label: 'NATIONAL INFORMATION, TECHNOLOGY DEVELOPMENT AGENCY (NITDA)' },
        { value: 'NATIONAL YOUTH SERVICE CORPS (NYSC)', label: 'NATIONAL YOUTH SERVICE CORPS (NYSC)' },
        { value: 'NATIONAL DRUGS LAW ENFORCEMENT AGENCY (NDLEA)', label: 'NATIONAL DRUGS LAW ENFORCEMENT AGENCY (NDLEA)' },
        { value: 'NIGERIAN DATA PROTECTION COMMISSION', label: 'NIGERIAN DATA PROTECTION COMMISSION' },
        { value: 'NIGERIAN EDUCATION LOAN FUND (NELFUND)', label: 'NIGERIAN EDUCATION LOAN FUND (NELFUND)' },
        { value: 'SMALL AND MEDIUM ENTERPRISES DEVELOPMENT AGENCY OF NIGERIA', label: 'SMALL AND MEDIUM ENTERPRISES DEVELOPMENT AGENCY OF NIGERIA' },
        { value: 'FEDERAL MINISTRY OF INFORMATION AND NATIONAL ORIENTATION', label: 'FEDERAL MINISTRY OF INFORMATION AND NATIONAL ORIENTATION' },
        { value: 'FEDERAL MINISTRY OF HEALTH AND SOCIAL WELFARE', label: 'FEDERAL MINISTRY OF HEALTH AND SOCIAL WELFARE' },
        { value: 'FEDERAL MINISTRY OF COMMUNICATION, INNOVATION AND DIGITAL ECONOMY', label: 'FEDERAL MINISTRY OF COMMUNICATION, INNOVATION AND DIGITAL ECONOMY' },
        { value: 'FEDERAL MINISTRY OF SCIENCE AND TECNOLOGY AND INNOVATION', label: 'FEDERAL MINISTRY OF SCIENCE AND TECNOLOGY AND INNOVATION' },
        { value: 'FEDERAL MINISTRY OF BUGET AND ECONOMIC PLANNING', label: 'FEDERAL MINISTRY OF BUGET AND ECONOMIC PLANNING' },
        { value: 'FEDERAL MINISTRY OF INDUSTRY, TRADE AND INVESTEMENT', label: 'FEDERAL MINISTRY OF INDUSTRY, TRADE AND INVESTEMENT' },
        { value: 'NIGERIAN IMMIGRATION SERVICES', label: 'NIGERIAN IMMIGRATION SERVICES' },
        { value: 'FEDERAL MINISTRY OF JUSTICE', label: 'FEDERAL MINISTRY OF JUSTICE' },
        { value: 'NATIONAL SPORTS COMMISSION', label: 'NATIONAL SPORTS COMMISSION' },
        { value: 'NATIONAL DIRECTORATE OF EMPLOYMENT (NDE)', label: 'NATIONAL DIRECTORATE OF EMPLOYMENT (NDE)' },
        { value: 'NATIONAL BOARD FOR TECHNICAL EDUCATION (NBTE)', label: 'NATIONAL BOARD FOR TECHNICAL EDUCATION (NBTE)' },
        { value: 'NATIONAL HUMAN RIGHTS COMMISSION (NHRC)', label: 'NATIONAL HUMAN RIGHTS COMMISSION (NHRC)' },
        { value: 'NATIONAL POPULATION COMMISSION', label: 'NATIONAL POPULATION COMMISSION' },
    ];

    const maritalStatusOptions = [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'other', label: 'Other' },
    ];

    const disabilityOptions = [
        { value: 'none', label: 'None' },
        { value: 'physical', label: 'Physical' },
        { value: 'visual', label: 'Visual' },
        { value: 'hearing', label: 'Hearing' },
        { value: 'other', label: 'Other (Specify)' },
    ];

    const educationLevelOptions = [
        { value: 'no_formal', label: 'No Formal Education' },
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'diploma_ond', label: 'Diploma/OND' },
        { value: 'hnd', label: 'HND' },
        { value: 'bachelors', label: "Bachelor's" },
        { value: 'masters', label: "Master's" },
        { value: 'phd', label: 'PhD' },
        { value: 'other', label: 'Other' },
    ];

    const occupationStatusOptions = [
        { value: 'student', label: 'Student' },
        { value: 'unemployed', label: 'Unemployed' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'employed_public_private', label: 'Employed (Public/Private)' },
        { value: 'other', label: 'Other' },
    ];

    const steps = [
        { number: 1, title: 'Personal Info', desc: 'Identity verification and personal details' },
        { number: 2, title: 'Contact & Security', desc: 'Login credentials and residential address' },
        { number: 3, title: 'Demographics', desc: 'Origin, marital status and accessibility' },
        { number: 4, title: 'Education & Skills', desc: 'Qualifications, trade and experience' },
    ];

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Step 1 cross-field validation
        if (currentStep === 1) {
            if (requiresNIN && !isNINVerified) {
                const ninElem = document.getElementById('nin') as HTMLInputElement;
                if (ninElem) {
                    ninElem.setCustomValidity('Please verify your 11-digit NIN with OTP before continuing');
                    ninElem.reportValidity();
                }
                return;
            }
            setCurrentStep(2);
            return;
        }

        // Step 2 cross-field validation
        if (currentStep === 2) {
            if (password !== confirmPassword) {
                const confirmElem = document.getElementById('confirmPassword') as HTMLInputElement;
                if (confirmElem) {
                    confirmElem.setCustomValidity('Passwords do not match');
                    confirmElem.reportValidity();
                }
                return;
            }
            setCurrentStep(3);
            return;
        }

        // Step 3 cross-field validation
        if (currentStep === 3) {
            if (disabilityStatus.length === 0) {
                const firstBox = document.getElementById('disability-none') as HTMLInputElement;
                if (firstBox) {
                    firstBox.setCustomValidity('Please select at least one option');
                    firstBox.reportValidity();
                }
                return;
            }
            setCurrentStep(4);
            return;
        }

        // Step 4 final submission
        console.log('Registration submitted:', {
            registrantType,
            nin,
            programme,
            name,
            email,
            password,
            dob,
            gender,
            phoneNumber,
            state,
            lga,
            organisation,
            governmentAgency: organisation === 'Government Agency' ? governmentAgency : undefined,
            stateOfOrigin,
            lgaOfOrigin,
            disabilityStatus,
            otherDisability,
            maritalStatus,
            educationLevel,
            otherEducation,
            occupationStatus,
            otherOccupation,
            skillsInterest,
            yearsExperience
        });

        router.push(programme ? `/programs/${programme}` : '/');
    };

    return (
        <div className="w-full min-h-screen overflow-y-auto flex flex-col bg-white relative justify-center py-6 sm:py-8">
            {/* Top-left corner branding */}
            <Link href="/" className="absolute top-5 left-5 sm:top-7 sm:left-10 flex items-center gap-3 z-20 group">
                <Image
                    src="/fmyd_logo1.png"
                    alt="Federal Ministry of Youth Development Logo"
                    width={64}
                    height={64}
                    className="h-12 sm:h-14 w-auto object-contain"
                    priority
                />
                <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm sm:text-base tracking-tight leading-tight group-hover:text-[#277B12] transition-colors">
                        Unified Registration Portal
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium leading-none">
                        Federal Ministry of Youth Development
                    </span>
                </div>
            </Link>

            <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 my-auto pt-16 sm:pt-4">
                {/* Heading */}
                <div className="text-center mb-3">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Create your account</h1>
                    <p className="text-xs text-gray-500 mt-0.5">Join the Unified Registration Portal in 4 quick steps</p>
                </div>

                {/* Progressive Stepper */}
                <div className="mb-4">
                    <div className="flex items-center justify-between relative max-w-lg mx-auto px-2">
                        <div className="absolute top-3.5 left-6 right-6 h-0.5 bg-gray-200 -z-0" />
                        <div
                            className="absolute top-3.5 left-6 h-0.5 bg-[#277B12] -z-0 transition-all duration-300"
                            style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 24px)` }}
                        />
                        {steps.map((s) => {
                            const isCompleted = currentStep > s.number;
                            const isCurrent = currentStep === s.number;
                            return (
                                <div key={s.number} className="flex flex-col items-center z-10 bg-white px-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (s.number < currentStep) {
                                                setCurrentStep(s.number);
                                            }
                                        }}
                                        disabled={s.number > currentStep}
                                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 ${isCompleted
                                                ? 'bg-[#277B12] text-white hover:bg-[#1b5c0d] cursor-pointer'
                                                : isCurrent
                                                    ? 'border-2 border-[#277B12] bg-white text-[#277B12] ring-2 ring-green-100'
                                                    : 'border-2 border-gray-200 bg-white text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {isCompleted ? <Check size={14} /> : s.number}
                                    </button>
                                    <span className={`text-[10px] sm:text-xs mt-1 hidden sm:block font-medium ${isCurrent ? 'text-[#277B12] font-semibold' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                                        }`}>
                                        {s.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Active Section Header */}
                <div className="border-b border-gray-100 pb-2 mb-3 flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-semibold text-[#277B12] uppercase tracking-wider">
                            Step {currentStep} of {totalSteps}
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-gray-900">{steps[currentStep - 1].title}</h2>
                    </div>
                    <span className="text-xs text-gray-400 hidden sm:block">{steps[currentStep - 1].desc}</span>
                </div>

                {/* Form Body - Native HTML5 Validation */}
                <form onSubmit={handleSubmit} className="space-y-2.5">
                    {/* ── STEP 1: Personal Information ── */}
                    {currentStep === 1 && (
                        <div className="space-y-3 animate-in fade-in duration-200">
                            <TextField
                                type="dropdown"
                                label="Registrant Type"
                                placeholder="Select your registration type"
                                value={registrantType}
                                onChange={handleRegistrantTypeChange}
                                options={registrantTypeOptions}
                                required
                                id="registrantType"
                            />

                            {/* Selected Programme */}
                            <div className="flex flex-col gap-1 mb-1">
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Selected Programme <span className="text-red-500">*</span>
                                </label>
                                <div className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium">
                                    {selectedProgramName || 'General Youth Registration (Default)'}
                                </div>
                            </div>

                            {/* Organisation & Optional Government Agency */}
                            <div className={`grid grid-cols-1 ${organisation === 'Government Agency' ? 'sm:grid-cols-2' : ''} gap-x-4`}>
                                <TextField
                                    type="dropdown"
                                    label="Organisation"
                                    placeholder="Which organisation are you from?"
                                    value={organisation}
                                    onChange={(val) => {
                                        setOrganisation(val);
                                        if (val !== 'Government Agency') setGovernmentAgency('');
                                    }}
                                    options={organisationOptions}
                                    required
                                    id="organisation"
                                />
                                {organisation === 'Government Agency' && (
                                    <TextField
                                        type="dropdown"
                                        label="Government Agency"
                                        placeholder="Select Agency"
                                        value={governmentAgency}
                                        onChange={setGovernmentAgency}
                                        options={governmentAgencyOptions}
                                        required
                                        id="governmentAgency"
                                    />
                                )}
                            </div>

                            {requiresNIN && (
                                <>
                                    {/* NIN Input & Verification */}
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="nin" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                            National Identity Number (NIN) <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                id="nin"
                                                value={nin}
                                                onChange={(e) => handleNINChange(e.target.value)}
                                                placeholder="Enter your 11-digit NIN"
                                                className={`flex-1 px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#277B12] focus:border-[#277B12] placeholder:text-gray-400 ${isNINVerified ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white'
                                                    }`}
                                                required
                                                maxLength={11}
                                                disabled={isNINVerified}
                                            />
                                            {!otpSent && !isNINVerified && (
                                                <button
                                                    type="button"
                                                    onClick={handleSendOTP}
                                                    className="bg-[#277B12] text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-[#1b5c0d] transition-colors whitespace-nowrap"
                                                >
                                                    Send OTP
                                                </button>
                                            )}
                                        </div>
                                        {isNINVerified && (
                                            <p className="text-xs text-green-600 font-semibold mt-1">✓ NIN verified successfully</p>
                                        )}
                                    </div>

                                    {/* OTP info & field */}
                                    {otpSent && !isNINVerified && (
                                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg space-y-2">
                                            <p className="text-xs text-green-800">
                                                An OTP was sent via SMS. (Demo code: <span className="font-bold underline tracking-wider">{generatedOTP}</span>)
                                            </p>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    id="otpInput"
                                                    value={otp}
                                                    onChange={(e) => {
                                                        setOtp(e.target.value);
                                                        e.target.setCustomValidity('');
                                                    }}
                                                    placeholder="Enter 6-digit OTP"
                                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#277B12] bg-white"
                                                    maxLength={6}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleVerifyOTP}
                                                    className="bg-[#277B12] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1b5c0d]"
                                                >
                                                    Verify OTP
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Auto-filled NIN details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pt-1">
                                <TextField
                                    type="text"
                                    label="Full Name"
                                    placeholder={requiresNIN ? "Auto-filled via NIN" : "Enter your full name"}
                                    value={name}
                                    onChange={setName}
                                    id="name"
                                    readOnly={requiresNIN}
                                    required
                                />
                                <TextField
                                    type={requiresNIN ? "text" : "date"}
                                    label="Date of Birth"
                                    placeholder={requiresNIN ? "Auto-filled via NIN" : undefined}
                                    value={dob}
                                    onChange={setDob}
                                    id="dob"
                                    readOnly={requiresNIN}
                                    required
                                />
                                <TextField
                                    type="text"
                                    label="Phone Number"
                                    placeholder={requiresNIN ? "Auto-filled via NIN" : "Enter your phone number"}
                                    value={phoneNumber}
                                    onChange={setPhoneNumber}
                                    id="phoneNumber"
                                    readOnly={requiresNIN}
                                    required
                                />
                                {requiresNIN ? (
                                    <TextField
                                        type="text"
                                        label="Gender"
                                        placeholder="Auto-filled via NIN"
                                        value={gender}
                                        onChange={setGender}
                                        id="gender"
                                        readOnly
                                        required
                                    />
                                ) : (
                                    <TextField
                                        type="dropdown"
                                        label="Gender"
                                        placeholder="Select gender"
                                        value={gender}
                                        onChange={setGender}
                                        options={genderOptions}
                                        id="gender"
                                        required
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {/* ── STEP 2: Contact & Security ── */}
                    {currentStep === 2 && (
                        <div className="space-y-3 animate-in fade-in duration-200">
                            <TextField
                                type="email"
                                label="Email Address"
                                placeholder="you@example.com"
                                value={email}
                                onChange={setEmail}
                                required
                                id="email"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                <TextField
                                    type="password"
                                    label="Password"
                                    placeholder="Create password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    id="password"
                                />
                                <TextField
                                    type="password"
                                    label="Confirm Password"
                                    placeholder="Re-enter password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                    id="confirmPassword"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                <TextField
                                    type="dropdown"
                                    label="State of Residence"
                                    placeholder="Select State"
                                    value={state}
                                    onChange={handleStateChange}
                                    options={stateOptions}
                                    required
                                    id="state"
                                />
                                <TextField
                                    type="dropdown"
                                    label="LGA of Residence"
                                    placeholder="Select LGA"
                                    value={lga}
                                    onChange={setLga}
                                    options={lgaOptions}
                                    required
                                    id="lga"
                                />
                            </div>
                        </div>
                    )}

                    {/* ── STEP 3: Demographics ── */}
                    {currentStep === 3 && (
                        <div className="space-y-3 animate-in fade-in duration-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                <TextField
                                    type="dropdown"
                                    label="State of Origin"
                                    placeholder="Select State"
                                    value={stateOfOrigin}
                                    onChange={handleStateOfOriginChange}
                                    options={stateOptions}
                                    required
                                    id="stateOfOrigin"
                                />
                                <TextField
                                    type="dropdown"
                                    label="LGA of Origin"
                                    placeholder="Select LGA"
                                    value={lgaOfOrigin}
                                    onChange={setLgaOfOrigin}
                                    options={lgaOfOriginOptions}
                                    required
                                    id="lgaOfOrigin"
                                />
                            </div>

                            <TextField
                                type="dropdown"
                                label="Marital Status"
                                placeholder="Select status"
                                value={maritalStatus}
                                onChange={setMaritalStatus}
                                options={maritalStatusOptions}
                                required
                                id="maritalStatus"
                            />

                            {/* Disability Status */}
                            <div className="flex flex-col gap-1 pt-1">
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Disability Status <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-0.5">
                                    {disabilityOptions.map((option) => (
                                        <label key={option.value} className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer text-sm">
                                            <input
                                                type="checkbox"
                                                id={`disability-${option.value}`}
                                                checked={disabilityStatus.includes(option.value)}
                                                onChange={() => handleDisabilityCheckbox(option.value)}
                                                className="h-4 w-4 rounded border-gray-300 text-[#277B12] focus:ring-[#277B12]"
                                            />
                                            <span className="text-gray-700 text-xs sm:text-sm">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                {disabilityStatus.includes('other') && (
                                    <div className="mt-2">
                                        <TextField
                                            type="text"
                                            placeholder="Please specify disability"
                                            value={otherDisability}
                                            onChange={setOtherDisability}
                                            required
                                            id="otherDisability"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ── STEP 4: Education & Skills ── */}
                    {currentStep === 4 && (
                        <div className="space-y-3 animate-in fade-in duration-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                <TextField
                                    type="dropdown"
                                    label="Highest Level of Education"
                                    placeholder="Select qualification"
                                    value={educationLevel}
                                    onChange={setEducationLevel}
                                    options={educationLevelOptions}
                                    required
                                    id="educationLevel"
                                />
                                {educationLevel === 'other' ? (
                                    <TextField
                                        type="text"
                                        label="Specify Education"
                                        placeholder="Enter qualification"
                                        value={otherEducation}
                                        onChange={setOtherEducation}
                                        required
                                        id="otherEducation"
                                    />
                                ) : <div />}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                <TextField
                                    type="dropdown"
                                    label="Current Occupation / Status"
                                    placeholder="Select status"
                                    value={occupationStatus}
                                    onChange={setOccupationStatus}
                                    options={occupationStatusOptions}
                                    required
                                    id="occupationStatus"
                                />
                                {occupationStatus === 'other' ? (
                                    <TextField
                                        type="text"
                                        label="Specify Occupation"
                                        placeholder="Enter occupation"
                                        value={otherOccupation}
                                        onChange={setOtherOccupation}
                                        required
                                        id="otherOccupation"
                                    />
                                ) : <div />}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="skillsInterest" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Skills / Areas of Interest <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="skillsInterest"
                                    value={skillsInterest}
                                    onChange={(e) => setSkillsInterest(e.target.value)}
                                    placeholder="Describe your skills, vocations, and areas of interest..."
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#277B12] focus:border-[#277B12] placeholder:text-gray-400 min-h-16 h-16 resize-none bg-white"
                                    required
                                />
                            </div>

                            <TextField
                                type="text"
                                label="Years of Experience"
                                placeholder="e.g. 3 years"
                                value={yearsExperience}
                                onChange={setYearsExperience}
                                id="yearsExperience"
                                required
                            />
                        </div>
                    )}

                    {/* Progressive Stepper Controls */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
                        {currentStep > 1 ? (
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <ChevronLeft size={16} />
                                Previous
                            </button>
                        ) : <div />}

                        <div className="flex items-center gap-3 sm:gap-4">
                            <span className="text-xs text-gray-500">
                                Already have an account?{' '}
                                <Link href="/login" className="text-[#277B12] hover:underline font-semibold">
                                    Login
                                </Link>
                            </span>

                            {currentStep < totalSteps ? (
                                <button
                                    type="submit"
                                    className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold bg-[#277B12] text-white hover:bg-[#1b5c0d] transition-colors shadow-sm cursor-pointer"
                                >
                                    Continue
                                    <ChevronRight size={16} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-semibold bg-[#277B12] text-white hover:bg-[#1b5c0d] transition-colors shadow-sm cursor-pointer"
                                >
                                    Submit Application
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
