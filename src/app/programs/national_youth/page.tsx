'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {TextField} from "@/components";
import {useRouter} from "next/navigation";

export default function NationalYouthPage() {

    const router = useRouter();
    const backToPreviousPage = () => {
        router.back();
    }
    const routeToNextPage = () => {
        router.push('/consent?program=national_youth');
    }

    const [stakeholder, setStakeholder] = useState('');
    const [organization, setOrganization] = useState('');
    const [expectation, setExpectation] = useState('');
    const [application, setApplication] = useState('');
    const [previousEngagement, setPreviousEngagement] = useState('');
    const [benefitedFromFMYD, setBenefitedFromFMYD] = useState('');
    const [geopoliticalZone, setGeopoliticalZone] = useState('');
    const [reason, setReason] = useState('');
    const [youthFocusedOrganization, setYouthFocusedOrganization] = useState('');
    const [urgentPriority, setUrgentPriority] = useState('');

    const embassyOptions = [
        { value: 'line_ministries', label: 'Line Ministries, Departments and Agencies' },
        { value: 'state_ministry_of_youth_development', label: 'State Ministry of Youth Development' },
        { value: 'development_partnership', label: 'Development Partnership' },
        { value: 'youth_policy_coalition', label: 'Youth Policy Coalition' },
        { value: 'youth_ngo', label: 'Youth NGO' },
        { value: 'youth_cso', label: 'Youth CSO' },
        {value: 'Private_Sector', label: 'Private Sector'},
        {value: 'academic_institution', label: 'Academic Institution'},
        {value: 'research_institution', label: 'Research Institution'},
        {value: 'media_house', label: 'Media House'},
        {value: 'others', label: 'Others'},
    ];

    const useOfOutcomeOptions = [
        { value: 'advocacy', label: 'Advocacy' },
        { value: 'community_development', label: 'Community Development' },
        { value: 'networking', label: 'Networking with other youth stakeholders' },
        { value: 'strengthen_collaboration', label: 'Strengthen Collaboration between government and youth' },
        { value: 'other', label: 'Other' },
    ];

    const previousEngagementOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
    ];

    const geographicalLocationOptions = [
        { value: 'North Central', label: 'North Central' },
        { value: 'North East', label: 'North East' },
        { value: 'North West', label: 'North West' },
        { value: 'South East', label: 'South East' },
        { value: 'South South', label: 'South South' },
        { value: 'South West', label: 'South West' },
    ];

    const urgentPriorityOptions = [
        {value: 'employment_and_job_creation', label: 'Employment and Job Creation'},
        {value: 'education', label: 'Education'},
        {value: 'health', label: 'Health'},
        {value: 'political_participation', label: 'Political Participation'},
        {value: 'digital_transformation', label: 'Digital Transformation'},
        {value: 'gender_equality', label: 'Gender Equality'},
        {value: 'peace_building', label: 'Peace Building'},
        {value: 'youth_right_and_civic_engagement', label: 'Youth Right and Civic Engagement'},
        {value: 'other', label: 'Other'},
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt with:', { stakeholder, organization, expectation });
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
            <span className={'text-center font-bold text-lg text-black flex flex-row items-center m-4'}>PROGRAM SPECIFIC QUESTIONS -<h4 className={'text-black text-center font-medium'}> National Youth Validation Workshop</h4></span>

            <div className={'flex flex-row mb-4 px-3'}>
                <div className={'w-full h-4 bg-[#CECDCD]'}></div>
                <div className={' w-full h-4 bg-[#277B12]'}></div>
            </div>
            <div className={'flex flex-row items-center justify-evenly px-3 mt-10'}>
                <form onSubmit={handleSubmit} className={'w-[700px] gap-y-3.5'}>
                    {/* Youth Professional field */}
                    <TextField
                        type="text"
                        label="Are you a you a youth development stakeholder"
                        placeholder="Yes, Area of expertise"
                        value={stakeholder}
                        onChange={setStakeholder}
                        required
                        id="stakeholder"
                    />

                    <TextField
                        type="text"
                        label="Why do you want to participate in National Youth Validation Workshop?"
                        placeholder="Reason"
                        value={reason}
                        onChange={setReason}
                        required
                        id="reason"
                    />

                    <TextField
                        type="text"
                        label="What is your expectation from National Youth Validation Workshop?"
                        placeholder="Expectation"
                        value={expectation}
                        onChange={setExpectation}
                        required
                        id="expectation"
                    />

                    {/* Embassy field */}
                    <TextField
                        type="dropdown"
                        label="Which organisation or institution do you represent"
                        placeholder="NGO/ISO"
                        value={organization}
                        onChange={setOrganization}
                        required
                        options={embassyOptions}
                        id="embassy"
                    />

                    <TextField
                        type="text"
                        label="Do you belong to a youth focused organization?"
                        placeholder="Yes/No, Name of Organization"
                        value={youthFocusedOrganization}
                        onChange={setYouthFocusedOrganization}
                        required
                        id="youth_focused_organization"
                    />

                    {/* Baking Business field */}
                    <TextField
                        type="dropdown"
                        label="How do you intend to apply the outcome of the revised National Youth Policy?"
                        placeholder="Advocacy"
                        value={application}
                        onChange={setApplication}
                        required
                        options={useOfOutcomeOptions}
                        id="baking_business"
                    />
                    {/* Baking Business field */}
                    <TextField
                        type="dropdown"
                        label="How have you previously engaged with the Federal Ministry of Youth Development?"
                        placeholder="Workshops/Training"
                        value={previousEngagement}
                        onChange={setPreviousEngagement}
                        required
                        options={previousEngagementOptions}
                        id="baking_business"
                    />
                    {/* Benefited from FMYD field */}
                    <TextField
                        type="dropdown"
                        label="Have you benefited from the Federal Ministry of Youth Development?"
                        placeholder="Yes/No"
                        value={benefitedFromFMYD}
                        onChange={setBenefitedFromFMYD}
                        required
                        options={previousEngagementOptions}
                        id="baking_business"
                    />
                    {/* Urgent Priority field */}
                    <TextField
                        type="dropdown"
                        label="What do you think is the most urgent priority for youth development in Nigeria?"
                        placeholder="Urgent Priority"
                        value={urgentPriority}
                        onChange={setUrgentPriority}
                        required
                        options={urgentPriorityOptions}
                        id="baking_business"
                    />

                    {/* Geopolitical Zone field */}
                    <TextField
                        type="dropdown"
                        label="What is your geopolitical zone?"
                        placeholder="Geopolitical Zone"
                        value={geopoliticalZone}
                        onChange={setGeopoliticalZone}
                        required
                        options={geographicalLocationOptions}
                        id="baking_business"
                    />

                    {/* Back and Next button */}
                    <div className={'flex justify-between items-center mt-7'}>
                        <button
                            onClick={backToPreviousPage}
                            type="button"
                            className={'w-36 justify-start bg-[#277B12] text-white py-4 px-4 mb-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors'}
                        >
                            Back
                        </button>
                        <button
                            onClick={routeToNextPage}
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