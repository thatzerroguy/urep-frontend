'use client';
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {TextField} from "@/components";
import {useRouter} from "next/navigation";

export default function AfricanYouthPage() {

    const router = useRouter();
    const backToPreviousPage = () => {
        router.back();
    }
    const routeToNextPage = () => {
        router.push('/consent?program=african_youth');
    }

    // Form state
    const [isYouthProfessional, setIsYouthProfessional] = useState('');
    const [expertiseArea, setExpertiseArea] = useState('');
    const [participationReason, setParticipationReason] = useState('');
    const [sponsoringOrg, setSponsoringOrg] = useState('');
    const [belongsToOrg, setBelongsToOrg] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [expectations, setExpectations] = useState('');
    const [programOutcome, setProgramOutcome] = useState<string[]>([]);
    const [otherOutcome, setOtherOutcome] = useState('');
    const [previousParticipation, setPreviousParticipation] = useState('');
    const [previousProgramDetails, setPreviousProgramDetails] = useState('');
    const [fmydParticipation, setFmydParticipation] = useState('');
    const [fmydProgramDetails, setFmydProgramDetails] = useState('');

    // Validation errors
    const [reasonError, setReasonError] = useState('');

    const yesNoOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
    ];

    const expertiseOptions = [
        { value: 'advocacy', label: 'Advocacy' },
        { value: 'entrepreneurship', label: 'Entrepreneurship Trainer' },
        { value: 'political', label: 'Political Engagement' },
        { value: 'mobiliser', label: 'Community Mobiliser' },
        { value: 'counsellor', label: 'Counsellor' },
        { value: 'psychiatrist', label: 'Psychiatrist' },
        { value: 'therapist', label: 'Therapist' },
        { value: 'nurse', label: 'Nurse' },
    ];

    const sponsorshipOptions = [
        { value: 'unfpa', label: 'UNFPA' },
        { value: 'state_govt', label: 'State Government' },
        { value: 'nycn', label: 'NYCN' },
        { value: 'nans', label: 'NANS' },
        { value: 'other', label: 'Other' },
    ];

    const outcomeOptions = [
        { value: 'advocacy', label: 'Advocacy' },
        { value: 'awareness', label: 'Create awareness' },
        { value: 'youth_club', label: 'Start a youth club' },
        { value: 'mentor', label: 'Mentor others' },
        { value: 'other', label: 'Other (specify below)' },
    ];

    // Handle checkbox for program outcome
    const handleOutcomeCheckbox = (value: string) => {
        if (programOutcome.includes(value)) {
            setProgramOutcome(programOutcome.filter(item => item !== value));
            if (value === 'other') {
                setOtherOutcome('');
            }
        } else {
            setProgramOutcome([...programOutcome, value]);
        }
    };

    // Validate word count for participation reason
    const handleReasonChange = (value: string) => {
        const wordCount = value.trim().split(/\s+/).filter(w => w).length;
        if (wordCount > 50) {
            setReasonError('Maximum 50 words allowed');
        } else {
            setReasonError('');
        }
        setParticipationReason(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Question 1: Youth Professional
        if (!isYouthProfessional) {
            alert('Question 1: Please specify if you are a youth development professional');
            return;
        }

        // If yes, expertise area is required
        if (isYouthProfessional === 'yes' && !expertiseArea) {
            alert('Question 1: Please specify your area of expertise');
            return;
        }

        // Question 2: Participation Reason
        if (!participationReason.trim()) {
            alert('Question 2: Please explain why you want to participate in this programme');
            return;
        }

        const wordCount = participationReason.trim().split(/\s+/).filter(w => w).length;
        if (wordCount > 50) {
            setReasonError('Please reduce to 50 words or less');
            alert('Question 2: Please reduce your response to 50 words or less');
            return;
        }

        // Question 3: Sponsoring Organisation
        if (!sponsoringOrg) {
            alert('Question 3: Please select your sponsoring organisation');
            return;
        }

        // Question 4: Youth Organization Membership
        if (!belongsToOrg) {
            alert('Question 4: Please specify if you belong to any youth-focused organization');
            return;
        }

        // If yes, organization name is required
        if (belongsToOrg === 'yes' && !organizationName.trim()) {
            alert('Question 4: Please provide the name of the organization you belong to');
            return;
        }

        // Question 5: Expectations
        if (!expectations.trim()) {
            alert('Question 5: Please describe your expectations of this programme');
            return;
        }

        // Question 6: Programme Outcome
        if (programOutcome.length === 0) {
            alert('Question 6: Please select at least one intended outcome for this programme');
            return;
        }

        // If "other" is selected, specification is required
        if (programOutcome.includes('other') && !otherOutcome.trim()) {
            alert('Question 6: Please specify your other intended outcome');
            return;
        }

        // Question 7: Previous Participation
        if (!previousParticipation) {
            alert('Question 7: Please specify if you have participated in a similar policy validation programme');
            return;
        }

        // If yes, details are required
        if (previousParticipation === 'yes' && !previousProgramDetails.trim()) {
            alert('Question 7: Please provide details about your previous participation');
            return;
        }

        // Question 8: FMYD Programme Participation
        if (!fmydParticipation) {
            alert('Question 8: Please specify if you have participated in any FMYD programme before');
            return;
        }

        // If yes, programme details are required
        if (fmydParticipation === 'yes' && !fmydProgramDetails.trim()) {
            alert('Question 8: Please provide the programme name and year');
            return;
        }

        // All validations passed
        console.log('Form submission:', {
            isYouthProfessional,
            expertiseArea,
            participationReason,
            sponsoringOrg,
            belongsToOrg,
            organizationName,
            expectations,
            programOutcome,
            otherOutcome,
            previousParticipation,
            previousProgramDetails,
            fmydParticipation,
            fmydProgramDetails
        });

        routeToNextPage();
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
            <span className={'text-center font-bold text-lg text-black flex flex-row items-center m-4'}>PROGRAM SPECIFIC QUESTIONS -<h4 className={'text-black text-center font-medium'}> African/National Youth Day 2025</h4></span>

            <div className={'flex flex-row mb-4 px-3'}>
                <div className={'w-full h-4 bg-[#CECDCD]'}></div>
                <div className={' w-full h-4 bg-[#277B12]'}></div>
            </div>
            <div className={'flex flex-row items-center justify-evenly px-3 mt-10'}>
                <form onSubmit={handleSubmit} className={'w-[700px] gap-y-3.5'}>
                    
                    {/* Question 1: Youth Professional */}
                    <TextField
                        type="dropdown"
                        label="1. Are you a youth development professional? *"
                        placeholder="Select an option"
                        value={isYouthProfessional}
                        onChange={setIsYouthProfessional}
                        options={yesNoOptions}
                        required
                        id="isYouthProfessional"
                    />

                    {/* Show expertise dropdown if Yes */}
                    {isYouthProfessional === 'yes' && (
                        <TextField
                            type="dropdown"
                            label="Please specify your area of expertise *"
                            placeholder="Select your expertise area"
                            value={expertiseArea}
                            onChange={setExpertiseArea}
                            options={expertiseOptions}
                            required
                            id="expertiseArea"
                        />
                    )}

                    {/* Question 2: Participation Reason */}
                    <div className="mb-4">
                        <label htmlFor="participationReason" className="block mb-2 text-sm mt-3 font-medium text-black">
                            2. Why do you want to participate in this programme? (Max 50 words) *
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                            id="participationReason"
                            value={participationReason}
                            onChange={(e) => handleReasonChange(e.target.value)}
                            placeholder="Share your motivation for participating..."
                            className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#277B12] min-h-24 ${
                                reasonError ? 'border-red-500' : 'border-gray-300'
                            }`}
                            required
                        />
                        <p className="text-sm text-gray-600 mt-1">
                            {participationReason.trim().split(/\s+/).filter(w => w).length} / 50 words
                        </p>
                        {reasonError && <p className="mt-1 text-sm text-red-500">{reasonError}</p>}
                    </div>

                    {/* Question 3: Sponsoring Organisation */}
                    <TextField
                        type="dropdown"
                        label="3. Your Sponsoring Organisation *"
                        placeholder="Select sponsoring organisation"
                        value={sponsoringOrg}
                        onChange={setSponsoringOrg}
                        options={sponsorshipOptions}
                        required
                        id="sponsoringOrg"
                    />

                    {/* Question 4: Youth Organization Membership */}
                    <TextField
                        type="dropdown"
                        label="4. Do you belong to any youth-focused organization? *"
                        placeholder="Select an option"
                        value={belongsToOrg}
                        onChange={setBelongsToOrg}
                        options={yesNoOptions}
                        required
                        id="belongsToOrg"
                    />

                    {/* Show organization name if Yes */}
                    {belongsToOrg === 'yes' && (
                        <TextField
                            type="text"
                            label="Please specify the organization name *"
                            placeholder="Enter organization name"
                            value={organizationName}
                            onChange={setOrganizationName}
                            required
                            id="organizationName"
                        />
                    )}

                    {/* Question 5: Expectations */}
                    <div className="mb-4">
                        <label htmlFor="expectations" className="block mb-2 text-sm mt-3 font-medium text-black">
                            5. What are your expectations of this programme? *
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                            id="expectations"
                            value={expectations}
                            onChange={(e) => setExpectations(e.target.value)}
                            placeholder="Describe your expectations..."
                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#277B12] min-h-24"
                            required
                        />
                    </div>

                    {/* Question 6: Programme Outcome - Checkboxes */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm mt-3 font-medium text-black">
                            6. What do you intend to do with the outcome of this programme? (Select all that apply) *
                        </label>
                        <div className="space-y-2 mt-3">
                            {outcomeOptions.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`outcome-${option.value}`}
                                        checked={programOutcome.includes(option.value)}
                                        onChange={() => handleOutcomeCheckbox(option.value)}
                                        className="h-4 w-4 text-[#277B12] focus:ring-[#277B12] border-gray-300 rounded"
                                    />
                                    <label htmlFor={`outcome-${option.value}`} className="text-sm text-black">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Show other outcome text field if "other" is selected */}
                        {programOutcome.includes('other') && (
                            <div className="ml-6 mt-3">
                                <TextField
                                    type="text"
                                    placeholder="Please specify"
                                    value={otherOutcome}
                                    onChange={setOtherOutcome}
                                    required
                                    id="otherOutcome"
                                />
                            </div>
                        )}
                    </div>

                    {/* Question 7: Previous Participation */}
                    <TextField
                        type="dropdown"
                        label="7. Have you participated in a similar conference? *"
                        placeholder="Select an option"
                        value={previousParticipation}
                        onChange={setPreviousParticipation}
                        options={yesNoOptions}
                        required
                        id="previousParticipation"
                    />

                    {/* Show details if Yes */}
                    {previousParticipation === 'yes' && (
                        <div className="mb-4">
                            <label htmlFor="previousProgramDetails" className="block mb-2 text-sm mt-3 font-medium text-black">
                                Please briefly explain *
                            </label>
                            <textarea
                                id="previousProgramDetails"
                                value={previousProgramDetails}
                                onChange={(e) => setPreviousProgramDetails(e.target.value)}
                                placeholder="Describe your previous participation..."
                                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#277B12] min-h-20"
                                required
                            />
                        </div>
                    )}

                    {/* Question 8: FMYD Programme Participation */}
                    <TextField
                        type="dropdown"
                        label="8. Have you participated in any FMYD programme before? *"
                        placeholder="Select an option"
                        value={fmydParticipation}
                        onChange={setFmydParticipation}
                        options={yesNoOptions}
                        required
                        id="fmydParticipation"
                    />

                    {/* Show programme details if Yes */}
                    {fmydParticipation === 'yes' && (
                        <TextField
                            type="text"
                            label="Please specify (Programme Name, Year) *"
                            placeholder="e.g., Youth Leadership Summit, 2024"
                            value={fmydProgramDetails}
                            onChange={setFmydProgramDetails}
                            required
                            id="fmydProgramDetails"
                        />
                    )}

                    <div className={'flex justify-between items-center mt-7'}>
                        <button
                            onClick={backToPreviousPage}
                            type="button"
                            className={'w-36 justify-start bg-[#277B12] text-white py-4 px-4 mb-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors'}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className={'w-36 justify-end bg-[#277B12] text-white py-4 px-4 mb-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors'}
                        >
                            Next
                        </button>
                    </div>
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
                {/*    /!* Back and Next button *!/*/}
                {/*    <div className={'flex justify-between items-center mt-4'}>*/}
                {/*        <button*/}
                {/*            onClick={backToPreviousPage}*/}
                {/*            type="button"*/}
                {/*            className={'w-24 justify-start bg-[#277B12] text-white py-4 px-4 mb-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors'}*/}
                {/*        >*/}
                {/*            Back*/}
                {/*        </button>*/}
                {/*        <button*/}
                {/*            onClick={routeToNextPage}*/}
                {/*            type="submit"*/}
                {/*            className={'w-24 justify-end bg-[#277B12] text-white py-4 px-4 mb-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors'}*/}
                {/*        >*/}
                {/*            Next*/}
                {/*        </button>*/}
                {/*    </div>*/}

                {/*</div>*/}
            </div>
        </div>
    );
}