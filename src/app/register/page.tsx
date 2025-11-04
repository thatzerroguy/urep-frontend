'use client';
import FooterBar from "@/components/FooterBar";
import Image from "next/image";
import Link from "next/link";
import React, {useMemo, useState} from "react";
import {TextField} from "@/components";
import {useRouter} from "next/navigation";
import statesData from "nigerian-states/src/states.json";


export default function RegisterPage() {

    const router = useRouter();
    // Function to handle opening the terms modal
    // const navigateToProgramInfo = () => {
    //     router.push(`/programs/${programme}`);
    // }

    // const openTermsModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    //     e.preventDefault();
    //     setShowTermsModal(true);
    // }
    //
    // // Function to handle accepting terms
    // const acceptTerms = () => {
    //     setAgreeProgramTerms(true);
    //     setShowTermsModal(false);
    // }
    //
    // // Function to handle declining terms
    // const declineTerms = () => {
    //     setAgreeProgramTerms(false);
    //     setShowTermsModal(false);
    // }

    const [nin, setNin] = useState('');
    const [programme, setProgramme] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [dob, setDob] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [state, setState] = useState('');
    const [lga, setLga] = useState('');
    const [stateOptions, setStateOptions] = useState<{value: string, label: string}[]>([]);
    const [lgaOptions, setLgaOptions] = useState<{value: string, label: string}[]>([]);
    // const [agreeProgramTerms, setAgreeProgramTerms] = useState(false);
    // const [showTermsModal, setShowTermsModal] = useState(false);
    const [organisation, setOrganisation] = useState('');
    // const [receiveOTP, setReceiveOTP] = useState('');
    const [otp, setOtp] = useState('');
    const [isNINVerified, setIsNINVerified] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [generatedOTP, setGeneratedOTP] = useState('');
    const [otpError, setOtpError] = useState('');
    const [ninError, setNinError] = useState('');
    
    // Section C: Demographics
    const [stateOfOrigin, setStateOfOrigin] = useState('');
    const [lgaOfOrigin, setLgaOfOrigin] = useState('');
    const [lgaOfOriginOptions, setLgaOfOriginOptions] = useState<{value: string, label: string}[]>([]);
    const [disabilityStatus, setDisabilityStatus] = useState<string[]>([]);
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
    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const programParam = searchParams.get('program');
        if (programParam) {
            setProgramme(programParam);
        }
    }, []);

    // Load Nigerian states on mount
    React.useEffect(() => {
        const stateNames = Object.keys(statesData);
        const stateOpts = stateNames.map((stateName: string) => ({
            value: stateName,
            label: stateName
        }));
        setStateOptions(stateOpts);
    }, []);

    const programmeOptions= [
        { value: 'african_youth', label: 'African/National Youth Day 2025' },
        { value: 'bakeprenuer', label: 'Bakeprenuer Nigeria' },
        { value: 'national_youth', label: 'National Youth Policy Validation Workshop' },
        { value: 'youth_migration', label: 'Youth Migration Awareness and Management Programme (YMAMP)' },
    ];
    

    // Get the selected program name
    const selectedProgramName = useMemo(() => {
        if (!programme) return '';
        const selectedProgram = programmeOptions.find(option => option.value === programme);
        return selectedProgram ? selectedProgram.label : '';
    }, [programme, programmeOptions]);

    // Handle state change and load corresponding LGAs
    const handleStateChange = (selectedState: string) => {
        setState(selectedState);
        setLga(''); // Clear selected LGA when state changes
        
        const stateInfo = statesData[selectedState as keyof typeof statesData];
        
        // Handle both formats: object with lgas property OR direct array
        let lgas: string[] = [];
        
        if (Array.isArray(stateInfo)) {
            // Direct array format (e.g., "Bauchi": ["Alkaleri", "Bauchi", ...])
            lgas = stateInfo;
        } else if (stateInfo && typeof stateInfo === 'object' && 'lgas' in stateInfo) {
            // Object format with lgas property (e.g., "Abia": { abbrv3: "ABI", lgas: [...] })
            lgas = stateInfo.lgas;
        }
        
        if (lgas.length > 0) {
            const lgaOpts = lgas.map((lgaName: string) => ({
                value: lgaName,
                label: lgaName
            }));
            setLgaOptions(lgaOpts);
        } else {
            setLgaOptions([]);
        }
    };

    // Handle NIN change and validation
    const handleNINChange = (value: string) => {
        setNin(value);
        setNinError('');
        setIsNINVerified(false);
        setOtpSent(false);
        setOtp('');
        // Clear previously filled data
        if (!isNINVerified) {
            setName('');
            setDob('');
            setGender('');
        }
    };

    // Send OTP (simulated)
    const handleSendOTP = () => {
        if (!nin || nin.length !== 11) {
            setNinError('Please enter a valid 11-digit NIN');
            return;
        }

        if (!demoNINDatabase[nin]) {
            setNinError('NIN not found in our records. Try: 12345678901, 98765432109, 11122233344, 55566677788, or 99988877766');
            return;
        }

        // if (!receiveOTP) {
        //     setOtpError('Please select how you want to receive OTP');
        //     return;
        // }

        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(otp);
        setOtpSent(true);
        setNinError('');
        setOtpError('');
        
        // In a real app, this would be sent via SMS/Email
        alert(`OTP sent! For demo purposes, your OTP is: ${otp}`);
    };

    // Verify OTP and fill NIN data
    const handleVerifyOTP = () => {
        if (!otp) {
            setOtpError('Please enter the OTP');
            return;
        }

        if (otp !== generatedOTP) {
            setOtpError('Invalid OTP. Please try again.');
            return;
        }

        // OTP is correct, fetch and fill NIN data
        const ninData = demoNINDatabase[nin];
        if (ninData) {
            setName(ninData.name);
            setDob(ninData.dob);
            setGender(ninData.gender);
            setIsNINVerified(true);
            setPhoneNumber(ninData.phoneNumber);
            setOtpError('');
            alert('NIN verified successfully! Personal information has been filled.');
        }
    };

    // Handle password change and validation
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (confirmPassword && value !== confirmPassword) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

    // Handle confirm password change and validation
    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        if (password && value !== password) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

    // Handle state of origin change and load corresponding LGAs
    const handleStateOfOriginChange = (selectedState: string) => {
        setStateOfOrigin(selectedState);
        setLgaOfOrigin(''); // Clear selected LGA when state changes
        
        const stateInfo = statesData[selectedState as keyof typeof statesData];
        
        // Handle both formats: object with lgas property OR direct array
        let lgas: string[] = [];
        
        if (Array.isArray(stateInfo)) {
            lgas = stateInfo;
        } else if (stateInfo && typeof stateInfo === 'object' && 'lgas' in stateInfo) {
            lgas = stateInfo.lgas;
        }
        
        if (lgas.length > 0) {
            const lgaOpts = lgas.map((lgaName: string) => ({
                value: lgaName,
                label: lgaName
            }));
            setLgaOfOriginOptions(lgaOpts);
        } else {
            setLgaOfOriginOptions([]);
        }
    };

    // Handle disability checkbox
    const handleDisabilityCheckbox = (value: string) => {
        if (disabilityStatus.includes(value)) {
            setDisabilityStatus(disabilityStatus.filter(item => item !== value));
            if (value === 'other') {
                setOtherDisability('');
            }
        } else {
            setDisabilityStatus([...disabilityStatus, value]);
        }
    };

    //   const otpOptions= [
    //     { value: 'sms', label: 'SMS' },
    // ]

    const organisationOptions= [
        { value: 'NGO', label: 'NGO' },
        { value: 'Government Agency', label: 'Government Agency' },
        { value: 'Private Sector', label: 'Private Sector' },
        { value: 'Educational Institution', label: 'Educational Institution' },
        { value: 'Other', label: 'Other' },
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate passwords match
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        // Validate NIN is verified
        if (!isNINVerified) {
            alert('Please verify your NIN before proceeding');
            return;
        }

        // Section A: Personal Information Validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please complete all personal information fields (Name, Email, Password, Confirm Password)');
            return;
        }

        // Section B: Additional Information Validation
        if (!dob || !gender || !state || !lga) {
            alert('Please complete Section B: Additional Information (Date of Birth, Gender, State of Residence, Local Government)');
            return;
        }

        // Section C: Demographics Validation
        if (!stateOfOrigin || !lgaOfOrigin) {
            alert('Please complete Section C: Demographics - State and Local Government of Origin are required');
            return;
        }

        if (disabilityStatus.length === 0) {
            alert('Please complete Section C: Demographics - Disability Status is required (select at least one option)');
            return;
        }

        if (disabilityStatus.includes('other') && !otherDisability.trim()) {
            alert('Please specify your disability status in the "Other" field');
            return;
        }

        if (!maritalStatus) {
            alert('Please complete Section C: Demographics - Marital Status is required');
            return;
        }

        // Section D: Education & Skills Validation
        if (!educationLevel) {
            alert('Please complete Section D: Education & Skills - Education Level is required');
            return;
        }

        if (educationLevel === 'other' && !otherEducation.trim()) {
            alert('Please specify your education level in the "Other" field');
            return;
        }

        if (!occupationStatus) {
            alert('Please complete Section D: Education & Skills - Occupation Status is required');
            return;
        }

        if (occupationStatus === 'other' && !otherOccupation.trim()) {
            alert('Please specify your occupation status in the "Other" field');
            return;
        }

        if (!skillsInterest.trim()) {
            alert('Please complete Section D: Education & Skills - Skills and Areas of Interest is required');
            return;
        }

        if (!yearsExperience) {
            alert('Please complete Section D: Education & Skills - Years of Experience is required');
            return;
        }
        
        // All validations passed
        console.log('Registration attempt with:', { 
            nin, 
            programme, 
            name, 
            email, 
            password, 
            dob, 
            gender, 
            state, 
            lga, 
            organisation,
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
        
        // Navigate to the selected program page
        router.push(`/programs/${programme}`);
    };

    return (
        <div className={'w-screen h-screen pt-1'}>
            <div className={'pt-1 px-3'}>
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
                    <h1 className={'font-bold text-3xl my-2'}>Federal Ministry of Youth Development</h1>
                    <h2 className={'font-semibold text-2xl mb-4'}>UNIFIED REGISTRATION PORTAL (UREP)</h2>
                    <h2 className={'font-semibold text-xl mb-4'}>PERSONAL INFORMATION</h2>
                    <form onSubmit={handleSubmit} className={'my-5 w-[70%]'}>
                        {/* Programme field - static display */}
                          <h2 className="text-xl font-bold mt-8 mb-4 text-[#277B12]">Section A1: Personal Information</h2>
                        <div className="mb-4">
                            <label htmlFor="programme" className="block mb-2 text-sm mt-3 font-medium text-black">
                                Selected Programme
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="w-full px-4 py-4 border border-gray-300 rounded-lg bg-gray-100">
                                {selectedProgramName || "Program will be selected from the URL parameter"}
                            </div>
                        </div>
                        {/*{programme && (*/}
                        {/*    <div className={'flex items-center mt-2 mb-4'}>*/}
                        {/*        <input*/}
                        {/*            type="checkbox"*/}
                        {/*            id="program-terms"*/}
                        {/*            checked={agreeProgramTerms}*/}
                        {/*            onChange={(e) => setAgreeProgramTerms(e.target.checked)}*/}
                        {/*            className={'mr-2 h-4 w-4 text-[#277B12] focus:ring-[#277B12] border-gray-300 rounded'}*/}
                        {/*            required*/}
                        {/*        />*/}
                        {/*        <label htmlFor="program-terms" className={'text-sm text-black font-medium'}>*/}
                        {/*            By selecting this program, you agree to the <a href="#" onClick={openTermsModal} className={'text-[#277B12] hover:underline font-semibold'}>Terms and Conditions</a> of the {selectedProgramName}.*/}
                        {/*        </label>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                        {/* Organisation field */}
                        <TextField
                            type="dropdown"
                            label="Organisation"
                            placeholder="Which organisation are you from?"
                            value={organisation}
                            onChange={setOrganisation}
                            options={organisationOptions}
                            required
                            id="organisation"
                        />
                        {/* NIN field */}
                        <div className="mb-4">
                            <label htmlFor="nin" className="block mb-2 text-sm mt-3 font-medium text-black">
                                National Identity Number
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="nin"
                                value={nin}
                                onChange={(e) => handleNINChange(e.target.value)}
                                placeholder="Enter your 11-digit NIN"
                                className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#277B12] ${
                                    ninError ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                                maxLength={11}
                                disabled={isNINVerified}
                            />
                            {ninError && <p className="mt-1 text-sm text-red-500">{ninError}</p>}
                            {isNINVerified && (
                                <p className="mt-1 text-sm text-green-600">✓ NIN verified successfully</p>
                            )}
                        </div>

                        {/* OTP Receive Option field - only shows when NIN is not verified */}
                        {!isNINVerified && (
                            <div className="mb-4">
                                <div className="w-full px-4 py-4 border border-gray-300 rounded-lg bg-gray-100">
                                    You will receive an OTP via SMS to your NIN registered mobile number.
                                </div>
                            </div>
                        )}

                        {/* Send OTP Button */}
                        {!otpSent && !isNINVerified && (
                            <button
                                type="button"
                                onClick={handleSendOTP}
                                className="w-full bg-[#277B12] text-white font-semibold py-3 px-6 mb-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
                            >
                                Send OTP
                            </button>
                        )}

                        {/* OTP field - only show after OTP is sent */}
                        {otpSent && !isNINVerified && (
                            <div className="mb-4">
                                <label htmlFor="otp" className="block mb-2 text-sm mt-3 font-medium text-black">
                                    OTP
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => {
                                        setOtp(e.target.value);
                                        setOtpError('');
                                    }}
                                    placeholder="Enter the 6-digit OTP"
                                    className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#277B12] ${
                                        otpError ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                    maxLength={6}
                                />
                                {otpError && <p className="mt-1 text-sm text-red-500">{otpError}</p>}
                                
                                {/* Verify OTP Button */}
                                <button
                                    type="button"
                                    onClick={handleVerifyOTP}
                                    className="w-full bg-[#277B12] text-white font-semibold py-3 px-6 mt-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        )}

                        {/* Name field */}
                        <TextField
                            type="text"
                            label="Name"
                            placeholder="Auto Filled with NIN"
                            value={name}
                            onChange={setName}
                            required
                            id="name"
                            readOnly={true}
                            
                        />
                        {/* Date of Birth field */}
                        <TextField
                            type="text"
                            label="Date of Birth"
                            placeholder="Auto Filled with NIN"
                            value={dob}
                            onChange={setDob}
                            required
                            id="dob"
                            readOnly={true}
                        />
                        {/* Phone Number field */}
                        <TextField
                            type="text"
                            label="Phone Number"
                            placeholder="Auto Filled with NIN"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                            required
                            id="phoneNumber"
                            readOnly={true}
                        />
                        {/* Gender field */}
                        <TextField
                            type="text"
                            label="Gender"
                            placeholder="Auto Filled with NIN"
                            value={gender}
                            onChange={setGender}
                            required
                            id="gender"
                            readOnly={true}
                        />
                          <h2 className="text-xl font-bold mt-8 mb-4 text-[#277B12]">Section A2: Contact Information</h2>
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
                        {/* Password field */}
                        <TextField
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            id="password"
                            error={passwordError}
                        />
                        {/* Confirm Password field */}
                        <TextField
                            type="password"
                            label="Confirm Password"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            id="confirmPassword"
                            error={passwordError}
                        />
                        {/* State field */}
                        <TextField
                            type="dropdown"
                            label="State of Residence"
                            placeholder="Select your state of residence"
                            value={state}
                            onChange={handleStateChange}
                            options={stateOptions}
                            required
                            id="state"
                        />
                        {/* LGA field */}
                        <TextField
                            type="dropdown"
                            label="Local Government Area of Residence"
                            placeholder="Select your local government area of residence"
                            value={lga}
                            onChange={setLga}
                            options={lgaOptions}
                            required
                            id="lga"
                        />

                        {/* Section C: Demographics */}
                        <h2 className="text-xl font-bold mt-8 mb-4 text-[#277B12]">Section A3: Demographics</h2>

                        {/* State of Origin */}
                        <TextField
                            type="dropdown"
                            label="State of Origin"
                            placeholder="Select your state of origin"
                            value={stateOfOrigin}
                            onChange={handleStateOfOriginChange}
                            options={stateOptions}
                            required
                            id="stateOfOrigin"
                        />

                        {/* LGA of Origin */}
                        <TextField
                            type="dropdown"
                            label="LGA of Origin"
                            placeholder="Select your LGA of origin"
                            value={lgaOfOrigin}
                            onChange={setLgaOfOrigin}
                            options={lgaOfOriginOptions}
                            required
                            id="lgaOfOrigin"
                        />

                        {/* Disability Status - Checkboxes */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm mt-3 font-medium text-black">
                                Disability Status
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="space-y-2 mt-3">
                                {disabilityOptions.map((option) => (
                                    <div key={option.value} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`disability-${option.value}`}
                                            checked={disabilityStatus.includes(option.value)}
                                            onChange={() => handleDisabilityCheckbox(option.value)}
                                            className="h-4 w-4 text-[#277B12] focus:ring-[#277B12] border-gray-300 rounded"
                                        />
                                        <label htmlFor={`disability-${option.value}`} className="text-sm text-black">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {/* Show other disability text field if "other" is selected */}
                            {disabilityStatus.includes('other') && (
                                <div className="ml-6 mt-3">
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

                        {/* Marital Status */}
                        <TextField
                            type="dropdown"
                            label="Marital Status"
                            placeholder="Select your marital status"
                            value={maritalStatus}
                            onChange={setMaritalStatus}
                            options={maritalStatusOptions}
                            required
                            id="maritalStatus"
                        />

                        {/* Section D: Education & Skills */}
                        <h2 className="text-xl font-bold mt-8 mb-4 text-[#277B12]">Section A4: Education & Skills</h2>

                        {/* Highest Level of Education */}
                        <TextField
                            type="dropdown"
                            label="Highest Level of Education Completed"
                            placeholder="Select your highest education level"
                            value={educationLevel}
                            onChange={setEducationLevel}
                            options={educationLevelOptions}
                            required
                            id="educationLevel"
                        />

                        {/* Other Education (conditional) */}
                        {educationLevel === 'other' && (
                            <TextField
                                type="text"
                                label="Please specify education level"
                                placeholder="Enter your education level"
                                value={otherEducation}
                                onChange={setOtherEducation}
                                required
                                id="otherEducation"
                            />
                        )}

                        {/* Current Occupation/Status */}
                        <TextField
                            type="dropdown"
                            label="Current Occupation/Status"
                            placeholder="Select your current occupation status"
                            value={occupationStatus}
                            onChange={setOccupationStatus}
                            options={occupationStatusOptions}
                            required
                            id="occupationStatus"
                        />

                        {/* Other Occupation (conditional) */}
                        {occupationStatus === 'other' && (
                            <TextField
                                type="text"
                                label="Please specify occupation"
                                placeholder="Enter your occupation"
                                value={otherOccupation}
                                onChange={setOtherOccupation}
                                required
                                id="otherOccupation"
                            />
                        )}

                        {/* Skills/Areas of Interest */}
                        <div className="mb-4">
                            <label htmlFor="skillsInterest" className="block mb-2 text-sm mt-3 font-medium text-black">
                                Skills/Areas of Interest
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <textarea
                                id="skillsInterest"
                                value={skillsInterest}
                                onChange={(e) => setSkillsInterest(e.target.value)}
                                placeholder="Describe your skills and areas of interest..."
                                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#277B12] min-h-24"
                                required
                            />
                        </div>

                        {/* Years of Experience */}
                        <TextField
                            type="text"
                            label="Years of Experience *"
                            placeholder="e.g., 5 years"
                            value={yearsExperience}
                            onChange={setYearsExperience}
                            id="yearsExperience"
                            required
                        />

                        {/* Continue button move to the right */}
                        <button
                            type="submit"
                            className={' bg-[#277B12] text-white font-semibold py-3 px-9 mb-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors float-right disabled:opacity-50'}
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
            <FooterBar/>

            {/*/!* Terms and Conditions Modal *!/*/}
            {/*{showTermsModal && (*/}
            {/*    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">*/}
            {/*        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">*/}
            {/*            <div className="flex justify-between items-center p-4 border-b">*/}
            {/*                <h2 className="text-xl font-bold text-gray-800">Terms and Conditions for {selectedProgramName}</h2>*/}
            {/*                <button*/}
            {/*                    onClick={() => setShowTermsModal(false)}*/}
            {/*                    className="text-gray-500 hover:text-gray-700"*/}
            {/*                >*/}
            {/*                    <FaTimes size={20} />*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*            <div className="p-6 max-h-96 overflow-y-auto">*/}
            {/*                <h3 className="font-semibold text-lg mb-4">Please read and accept the following terms:</h3>*/}
            {/*                <ul className="list-disc pl-5 space-y-2 mb-4">*/}
            {/*                    <li>Make sure all information provided are accurate. Multiple registration by the same person is not allowed.</li>*/}
            {/*                    <li>This Program will be taken place in Ondo State</li>*/}
            {/*                    <li>Free transportation will be provided by the ministry from Headquarter everyday during the program</li>*/}
            {/*                    <li>This is a three day program.</li>*/}
            {/*                </ul>*/}
            {/*                <p className="text-sm text-gray-600 mt-4">*/}
            {/*                    By accepting these terms, you agree to abide by all the conditions specified for participation in {selectedProgramName}.*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <div className="flex justify-end space-x-4 p-4 border-t">*/}
            {/*                <button*/}
            {/*                    onClick={declineTerms}*/}
            {/*                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"*/}
            {/*                >*/}
            {/*                    Decline*/}
            {/*                </button>*/}
            {/*                <button*/}
            {/*                    onClick={acceptTerms}*/}
            {/*                    className="px-4 py-2 bg-[#277B12] text-white rounded hover:bg-green-700 transition-colors"*/}
            {/*                >*/}
            {/*                    Accept*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}
