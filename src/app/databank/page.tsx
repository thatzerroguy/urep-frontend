'use client';
import FooterBar from "@/components/FooterBar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TextField } from "@/components";
import { useRouter } from "next/navigation";
import statesData from "nigerian-states/src/states.json";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
} from "lucide-react";

export default function DatabankPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    surname: "",
    firstName: "",
    otherName: "",
    dob: "",
    age: "",
    gender: "",
    maritalStatus: "",
    religion: "",
    otherReligion: "",
    stateOfOrigin: "",
    lgaOfOrigin: "",
    profession: "",
    otherProfession: "",
    residentialAddress: "",
    stateOfResidence: "",
    lgaOfResidence: "",
    phoneNumber: "",
    email: "",

    // Step 2: Education, Skills & Training
    educationStatus: "",
    currentEducationStatus: "",
    highestQualification: "",
    institutionAttended: "",
    fieldOfStudy: "",
    professionalCertifications: "",
    informalTraining: "",
    otherInformalTraining: "",
    skills: "",
    otherSkills: "",
    furtherTraining: "",

    // Step 3: Employment, Business & Financial
    employmentStatus: "",
    employmentType: "",
    businessName: "",
    businessCategory: "",
    businessLocation: "",
    monthlyIncome: "",
    loanAwareness: "",
    loanProvider: "",
    hasBankAccount: "",
    bankName: "",
    otherBank: "",
    supportNeeded: "",
    interestedInMatching: "",

    // Step 4: Health, Social & Digital
    healthcareAccess: "",
    healthInsurance: "",
    hasDisability: "",
    disabilityType: "",
    youthOrgMember: "",
    awareGovPrograms: "",
    benefitedGovGrants: "",
    registeredVoter: "",
    politicalGroupMember: "",
    politicalGroupName: "",
    hasSocialMedia: "",
    socialMediaPlatforms: [] as string[],
    socialMediaPrimaryUse: "",
    socialMediaTraining: "",
    consent: false,
  });

  const updateField = (field: string, value: string | string[] | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: "socialMediaPlatforms", value: string) => {
    const currentValues = formData[field];
    if (currentValues.includes(value)) {
      updateField(
        field,
        currentValues.filter((v) => v !== value)
      );
    } else {
      updateField(field, [...currentValues, value]);
    }
  };

  // State & LGA options mapping
  const [stateOptions, setStateOptions] = useState<{ value: string; label: string }[]>([]);
  const [lgaOfOriginOptions, setLgaOfOriginOptions] = useState<{ value: string; label: string }[]>([]);
  const [lgaOfResidenceOptions, setLgaOfResidenceOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const stateNames = Object.keys(statesData);
    const opts = stateNames.map((name) => ({ value: name, label: name }));
    setStateOptions(opts);
  }, []);

  const handleStateOfOriginChange = (selectedState: string) => {
    updateField("stateOfOrigin", selectedState);
    updateField("lgaOfOrigin", "");

    const stateInfo = statesData[selectedState as keyof typeof statesData];
    let lgas: string[] = [];
    if (Array.isArray(stateInfo)) lgas = stateInfo;
    else if (stateInfo && typeof stateInfo === "object" && "lgas" in stateInfo) lgas = stateInfo.lgas;

    setLgaOfOriginOptions(lgas.map((lga) => ({ value: lga, label: lga })));
  };

  const handleStateOfResidenceChange = (selectedState: string) => {
    updateField("stateOfResidence", selectedState);
    updateField("lgaOfResidence", "");

    const stateInfo = statesData[selectedState as keyof typeof statesData];
    let lgas: string[] = [];
    if (Array.isArray(stateInfo)) lgas = stateInfo;
    else if (stateInfo && typeof stateInfo === "object" && "lgas" in stateInfo) lgas = stateInfo.lgas;

    setLgaOfResidenceOptions(lgas.map((lga) => ({ value: lga, label: lga })));
  };

  // Multi-step Navigation
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please consent to the use of your data to submit the form.");
      return;
    }
    console.log("Submitting Databank Form:", formData);
    alert("Thank you! Your information has been successfully submitted to the Youth Databank.");
    router.push("/");
  };

  // --- Constants for Dropdowns ---
  const genderOpts = [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }];
  const maritalOpts = [{ value: "Single", label: "Single" }, { value: "Married", label: "Married" }, { value: "Divorced", label: "Divorced" }, { value: "Widowed", label: "Widowed" }];
  const religionOpts = [{ value: "Christianity", label: "Christianity" }, { value: "Moslem", label: "Moslem" }, { value: "Others", label: "Others" }];
  const yesNoOpts = [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }];
  
  const professionOpts = [
    "Accountant", "Architect", "Artist", "Artisan", "Auditor", "Banker", "Business Owner", "Chef",
    "Civil Engineer", "Computer Scientist", "Consultant", "Content Creator", "Security Officer", 
    "Customer Service Representative", "Data Analyst", "Driver", "Economist", "Fashion Designer", 
    "Farmer", "Fisherman", "Graphic Designer", "Information Technology Specialist", "Journalist", 
    "Lecturer", "Marketer", "Nurse", "Pharmacist", "Pilot", "Policeman / Policewoman", 
    "Public Servant", "Researcher", "Social Worker", "Soldier", "Teacher", "Writer / Author", 
    "Veterinary Doctor", "Doctor", "Electrical Engineer", "Financial Analyst", "Human Resource Manager", 
    "Lawyer", "Military Personnel", "Photographer", "Project Manager", "Retailer / Shopkeeper", 
    "Software Developer", "Technician", "Other (Specify)"
  ].map(p => ({ value: p, label: p }));

  const bankOpts = [
    "Access Bank", "Citibank", "Fidelity Bank", "Fairmoney Mfb", "First City Monument Bank (FCMB)",
    "Globus Bank", "Heritage Bank", "Jaiz Bank", "Keystone Bank", "Moniepoint Mfb", "Optimus Bank",
    "Palmpay", "Polaris Bank", "Providus Bank", "Standard Chartered Bank", "Sterling Bank", "Titan Trust Bank",
    "Unity Bank", "Wema Bank", "United Bank for Africa (UBA)", "Ecobank Nigeria", "First Bank of Nigeria",
    "Guaranty Trust Bank (GTBank)", "Kuda Mfb", "Opay (Paycom)", "Parallex Bank", "Stanbic IBTC Bank",
    "SunTrust Bank", "Union Bank of Nigeria", "Zenith Bank", "Other (please specify)"
  ].map(b => ({ value: b, label: b }));

  return (
    <div className={"w-screen min-h-screen pt-1 bg-gray-50 flex flex-col"}>
      <div className={"pt-1 px-3 flex-grow"}>
        <div className={"mx-auto flex items-center px-4 py-2 h-20 bg-[#277B12] mb-6 rounded-md shadow-sm"}>
          <Image className={"mr-2"} src={"/images/fmyd_logo.png"} alt={"logo"} width={60} height={60} />
          <h1 className={"text-white text-xl md:text-2xl font-bold hidden md:block"}>Yopi Tracker</h1>
          <div className={"grow"}>
            <div className={"flex items-center justify-center gap-4 md:gap-8"}>
              <Link className={"text-white text-sm md:text-lg"} href="/">Home</Link>
              <Link className={"text-white text-sm md:text-lg"} href="/">About</Link>
              <Link className={"text-white text-sm md:text-lg"} href="/">Program</Link>
            </div>
          </div>
          <div>
            <Link href="/login" className={"bg-white text-[#277B12] hover:bg-gray-100 font-medium rounded-lg text-sm md:text-md px-4 py-2"}>
              Login
            </Link>
          </div>
        </div>

        <div className={"flex flex-col items-center w-full max-w-4xl mx-auto"}>
          <div className="text-center mb-8">
            <h1 className={"font-bold text-2xl md:text-4xl my-2 text-[#277B12]"}>National Youth Databank</h1>
            <h2 className={"font-semibold text-lg md:text-xl text-gray-700"}>Register to be a recognised youth in Nigeria</h2>
          </div>

          {/* Stepper Indicator */}
          <div className="flex w-full justify-between items-center mb-8 px-4 relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300 -z-10"></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-[#277B12] -z-10 transition-all duration-300" style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}></div>
            
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center bg-gray-50 px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${currentStep >= step ? 'bg-[#277B12] text-white border-[#277B12]' : 'bg-white text-gray-400 border-gray-300'}`}>
                  {currentStep > step ? <CheckCircle2 size={24} /> : step}
                </div>
                <span className={`text-xs mt-2 hidden md:block ${currentStep >= step ? 'text-[#277B12] font-semibold' : 'text-gray-500'}`}>
                  {step === 1 && "Personal Info"}
                  {step === 2 && "Education & Skills"}
                  {step === 3 && "Employment"}
                  {step === 4 && "Social & Health"}
                </span>
              </div>
            ))}
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className={"w-full bg-white shadow-lg rounded-xl p-6 md:p-10 mb-10"}>
            
            {/* --- STEP 1: PERSONAL INFORMATION --- */}
            {currentStep === 1 && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold mb-6 text-[#277B12] border-b pb-2">Step 1: Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <TextField type="text" label="Surname" placeholder="Enter Surname" value={formData.surname} onChange={(v) => updateField('surname', v)} required />
                  <TextField type="text" label="First Name" placeholder="Enter First Name" value={formData.firstName} onChange={(v) => updateField('firstName', v)} required />
                  <TextField type="text" label="Other Name" placeholder="Enter Other Name" value={formData.otherName} onChange={(v) => updateField('otherName', v)} />
                  <TextField type="date" label="Date of Birth" value={formData.dob} onChange={(v) => updateField('dob', v)} required />
                  <TextField type="text" label="Age" placeholder="Enter Age" value={formData.age} onChange={(v) => updateField('age', v)} required />
                  <TextField type="dropdown" label="Gender" placeholder="Select Gender" options={genderOpts} value={formData.gender} onChange={(v) => updateField('gender', v)} required />
                  <TextField type="dropdown" label="Marital Status" placeholder="Select Marital Status" options={maritalOpts} value={formData.maritalStatus} onChange={(v) => updateField('maritalStatus', v)} required />
                  
                  <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField type="dropdown" label="Religion" placeholder="Select Religion" options={religionOpts} value={formData.religion} onChange={(v) => updateField('religion', v)} required />
                    {formData.religion === "Others" && (
                      <TextField type="text" label="Specify Religion" placeholder="Please specify" value={formData.otherReligion} onChange={(v) => updateField('otherReligion', v)} required />
                    )}
                  </div>

                  <TextField type="dropdown" label="State of Origin" placeholder="Select State" options={stateOptions} value={formData.stateOfOrigin} onChange={handleStateOfOriginChange} required />
                  <TextField type="dropdown" label="LGA of Origin" placeholder="Select LGA" options={lgaOfOriginOptions} value={formData.lgaOfOrigin} onChange={(v) => updateField('lgaOfOrigin', v)} required />
                  
                  <TextField type="dropdown" label="Profession" placeholder="Select Profession" options={professionOpts} value={formData.profession} onChange={(v) => updateField('profession', v)} required />
                  {formData.profession === "Other (Specify)" && (
                    <TextField type="text" label="Specify Profession" placeholder="Please specify" value={formData.otherProfession} onChange={(v) => updateField('otherProfession', v)} required />
                  )}
                  
                  <div className="col-span-1 md:col-span-2">
                    <TextField type="text" label="Residential Address" placeholder="Enter full address" value={formData.residentialAddress} onChange={(v) => updateField('residentialAddress', v)} required />
                  </div>
                  
                  <TextField type="dropdown" label="State of Residence" placeholder="Select State" options={stateOptions} value={formData.stateOfResidence} onChange={handleStateOfResidenceChange} required />
                  <TextField type="dropdown" label="LGA of Residence" placeholder="Select LGA" options={lgaOfResidenceOptions} value={formData.lgaOfResidence} onChange={(v) => updateField('lgaOfResidence', v)} required />
                  
                  <TextField type="text" label="Phone Number" placeholder="Enter phone number" value={formData.phoneNumber} onChange={(v) => updateField('phoneNumber', v)} required />
                  <TextField type="email" label="Email" placeholder="Enter email address" value={formData.email} onChange={(v) => updateField('email', v)} required />
                </div>

                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#277B12]">Identity and Biometrics (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer">
                      <UploadCloud className="text-gray-400 mb-2" size={32} />
                      <p className="text-sm font-medium text-gray-700">Face Capture</p>
                      <p className="text-xs text-gray-500">Click here to upload file. (&lt; 10MB)</p>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer">
                      <UploadCloud className="text-gray-400 mb-2" size={32} />
                      <p className="text-sm font-medium text-gray-700">Fingerprint</p>
                      <p className="text-xs text-gray-500">Click here to upload file. (&lt; 10MB)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 2: EDUCATION & SKILLS --- */}
            {currentStep === 2 && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold mb-6 text-[#277B12] border-b pb-2">Step 2: Education, Skills & Training</h2>
                
                <h3 className="text-lg font-semibold mb-4">Educational Background</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <TextField type="dropdown" label="Education Status" options={[{value: "Formal", label: "Formal"}, {value: "Informal", label: "Informal"}]} value={formData.educationStatus} onChange={(v) => updateField('educationStatus', v)} required />
                  
                  {formData.educationStatus === "Formal" && (
                    <>
                      <TextField type="dropdown" label="Current Education Status" options={[{value: "Graduate", label: "Graduate"}, {value: "Undergraduate", label: "Undergraduate"}]} value={formData.currentEducationStatus} onChange={(v) => updateField('currentEducationStatus', v)} />
                      <TextField type="dropdown" label="Highest Qualification" options={[
                        "First School Leaving Certificate (FSLC)", "Junior Secondary School Certificate (JSSC)", "Senior Secondary School Certificate (SSCE)", "West African Senior School Certificate (WASSCE)", "National Examination Council (NECO)", "General Certificate of Education (GCE O’Level)", "National Diploma (ND)", "Higher National Diploma (HND)", "National Certificate of Education (NCE)", "Bachelor of Arts (BA)", "Bachelor of Science (B.Sc)", "Bachelor of Engineering (B.Eng)", "Master of Science (M.Sc)", "Master of Business Administration (MBA)", "Doctor of Philosophy (PhD)"
                      ].map(q => ({value: q, label: q}))} value={formData.highestQualification} onChange={(v) => updateField('highestQualification', v)} />
                      <TextField type="text" label="Institution Attended" value={formData.institutionAttended} onChange={(v) => updateField('institutionAttended', v)} />
                      <TextField type="text" label="Field of Study" value={formData.fieldOfStudy} onChange={(v) => updateField('fieldOfStudy', v)} />
                      <TextField type="text" label="Professional Certifications" value={formData.professionalCertifications} onChange={(v) => updateField('professionalCertifications', v)} />
                    </>
                  )}
                </div>

                <h3 className="text-lg font-semibold mt-8 mb-4 border-t pt-6">Skills & Informal Training</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <TextField type="dropdown" label="What Informal Training Have You Had?" options={[
                    "Apprenticeship", "Community Training", "Online Lessons", "Religious Schooling", "Others"
                  ].map(o => ({value: o, label: o}))} value={formData.informalTraining} onChange={(v) => updateField('informalTraining', v)} />
                  {formData.informalTraining === "Others" && (
                    <TextField type="text" label="Specify Training" value={formData.otherInformalTraining} onChange={(v) => updateField('otherInformalTraining', v)} />
                  )}

                  <TextField type="dropdown" label="What Skills Do you have?" options={[
                    "Tailoring/Fashion Design", "Catering / Baking", "Carpentry", "Electrical Installation", "Plumbing", "Hairdressing / Barbing", "Painting", "Welding / Metal works", "Phone Repair", "Auto Mechanic", "Farming", "IT / Web design", "Others"
                  ].map(o => ({value: o, label: o}))} value={formData.skills} onChange={(v) => updateField('skills', v)} />
                  {formData.skills === "Others" && (
                    <TextField type="text" label="Specify Skills" value={formData.otherSkills} onChange={(v) => updateField('otherSkills', v)} />
                  )}

                  <TextField type="dropdown" label="Would you like further training and certification?" options={yesNoOpts} value={formData.furtherTraining} onChange={(v) => updateField('furtherTraining', v)} required />
                </div>
              </div>
            )}

            {/* --- STEP 3: EMPLOYMENT & ECONOMIC STATUS --- */}
            {currentStep === 3 && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold mb-6 text-[#277B12] border-b pb-2">Step 3: Employment & Economic Status</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <TextField type="dropdown" label="Current Employment Status" options={[
                    "Employed", "Unemployed", "Student"
                  ].map(s => ({value: s, label: s}))} value={formData.employmentStatus} onChange={(v) => updateField('employmentStatus', v)} required />
                  
                  {formData.employmentStatus === "Employed" && (
                    <>
                      <TextField type="dropdown" label="Type of employment" options={[
                        "Public", "Private", "Self-Employed"
                      ].map(s => ({value: s, label: s}))} value={formData.employmentType} onChange={(v) => updateField('employmentType', v)} />
                      <TextField type="text" label="Business Name" value={formData.businessName} onChange={(v) => updateField('businessName', v)} />
                      <TextField type="dropdown" label="Business Category" options={[
                        "Agriculture", "Food processing", "Retail/Trading", "Fashion Design/Tailoring", "Catering/Baking", "Transportation/Logistics", "Construction/Building", "ICT/Tech Services", "Health/Beauty", "Creative Industry", "Hospitality/Tourism", "Education Services", "Professional Services", "Media/Printing"
                      ].map(s => ({value: s, label: s}))} value={formData.businessCategory} onChange={(v) => updateField('businessCategory', v)} />
                      <TextField type="text" label="Business Location" value={formData.businessLocation} onChange={(v) => updateField('businessLocation', v)} />
                    </>
                  )}
                  
                  <TextField type="dropdown" label="Average Monthly Income" options={[
                    "Below ₦50,000", "₦50,000 - ₦100,000", "₦500,000 - ₦1,000,000", "Above ₦1,000,000"
                  ].map(s => ({value: s, label: s}))} value={formData.monthlyIncome} onChange={(v) => updateField('monthlyIncome', v)} />
                </div>

                <h3 className="text-lg font-semibold mt-8 mb-4 border-t pt-6">Financial Inclusion & Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <TextField type="dropdown" label="Are you aware or have you taken a student loan?" options={[
                    {value: "Yes", label: "Yes"}, {value: "No", label: "No"}, {value: "Not interested", label: "Not interested"}
                  ]} value={formData.loanAwareness} onChange={(v) => updateField('loanAwareness', v)} />
                  
                  {formData.loanAwareness === "Yes" && (
                    <TextField type="dropdown" label="Loan Provider" options={[
                      "Government Funds", "Private", "NGO"
                    ].map(s => ({value: s, label: s}))} value={formData.loanProvider} onChange={(v) => updateField('loanProvider', v)} />
                  )}

                  <TextField type="dropdown" label="Do you have a bank account?" options={yesNoOpts} value={formData.hasBankAccount} onChange={(v) => updateField('hasBankAccount', v)} required />
                  {formData.hasBankAccount === "Yes" && (
                    <>
                      <TextField type="dropdown" label="Select Bank" options={bankOpts} value={formData.bankName} onChange={(v) => updateField('bankName', v)} />
                      {formData.bankName === "Other (please specify)" && (
                        <TextField type="text" label="Specify Bank" value={formData.otherBank} onChange={(v) => updateField('otherBank', v)} />
                      )}
                    </>
                  )}

                  <TextField type="dropdown" label="What Support is Needed?" options={[
                    "Grant / Funding", "Loans", "Business Training", "Digital Tools", "Marketing Linkages", "Mentorship"
                  ].map(s => ({value: s, label: s}))} value={formData.supportNeeded} onChange={(v) => updateField('supportNeeded', v)} />

                  <TextField type="dropdown" label="Interested in being matched with an opportunity?" options={yesNoOpts} value={formData.interestedInMatching} onChange={(v) => updateField('interestedInMatching', v)} />
                </div>
              </div>
            )}

            {/* --- STEP 4: HEALTH, SOCIAL & DIGITAL PRESENCE --- */}
            {currentStep === 4 && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold mb-6 text-[#277B12] border-b pb-2">Step 4: Health, Social & Digital Presence</h2>
                
                <h3 className="text-lg font-semibold mb-4">Health & Well-being</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <TextField type="dropdown" label="Access to healthcare services?" options={yesNoOpts} value={formData.healthcareAccess} onChange={(v) => updateField('healthcareAccess', v)} />
                  <TextField type="dropdown" label="Do you have health insurance?" options={yesNoOpts} value={formData.healthInsurance} onChange={(v) => updateField('healthInsurance', v)} />
                  <TextField type="dropdown" label="Any form of disability?" options={yesNoOpts} value={formData.hasDisability} onChange={(v) => updateField('hasDisability', v)} />
                  {formData.hasDisability === "Yes" && (
                    <TextField type="dropdown" label="Disability Type" options={[
                      "Autism", "Blindness", "Deafness", "Dumbness", "Lameness"
                    ].map(s => ({value: s, label: s}))} value={formData.disabilityType} onChange={(v) => updateField('disabilityType', v)} />
                  )}
                </div>

                <h3 className="text-lg font-semibold mt-8 mb-4 border-t pt-6">Social & Political Engagement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <TextField type="dropdown" label="Member of any youth organization?" options={yesNoOpts} value={formData.youthOrgMember} onChange={(v) => updateField('youthOrgMember', v)} />
                  <TextField type="dropdown" label="Aware of government youth programs?" options={yesNoOpts} value={formData.awareGovPrograms} onChange={(v) => updateField('awareGovPrograms', v)} />
                  <TextField type="dropdown" label="Benefited from any government grants or loans?" options={yesNoOpts} value={formData.benefitedGovGrants} onChange={(v) => updateField('benefitedGovGrants', v)} />
                  <TextField type="dropdown" label="Are you a registered voter?" options={yesNoOpts} value={formData.registeredVoter} onChange={(v) => updateField('registeredVoter', v)} />
                  <TextField type="dropdown" label="Do you belong to any political group?" options={yesNoOpts} value={formData.politicalGroupMember} onChange={(v) => updateField('politicalGroupMember', v)} />
                  {formData.politicalGroupMember === "Yes" && (
                    <TextField type="text" label="Political group name" value={formData.politicalGroupName} onChange={(v) => updateField('politicalGroupName', v)} />
                  )}
                </div>

                <h3 className="text-lg font-semibold mt-8 mb-4 border-t pt-6">Digital Presence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <TextField type="dropdown" label="Do you have a social media account?" options={yesNoOpts} value={formData.hasSocialMedia} onChange={(v) => updateField('hasSocialMedia', v)} />
                  
                  {formData.hasSocialMedia === "Yes" && (
                    <>
                      <div className="mb-4 col-span-1 md:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-black">Select Social Media Platforms You Use</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {["Facebook", "X", "Instagram", "Tiktok", "Linkedin", "Youtube", "Whatsapp", "Telegram", "Others"].map((platform) => (
                            <div key={platform} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`platform-${platform}`}
                                checked={formData.socialMediaPlatforms.includes(platform)}
                                onChange={() => handleCheckboxChange('socialMediaPlatforms', platform)}
                                className="h-4 w-4 text-[#277B12] focus:ring-[#277B12] border-gray-300 rounded"
                              />
                              <label htmlFor={`platform-${platform}`} className="text-sm text-black cursor-pointer">{platform}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <TextField type="dropdown" label="Primary use of social media" options={[
                        "Network", "Business / Marketing", "Entertainment", "Education", "Job search", "News / Information"
                      ].map(s => ({value: s, label: s}))} value={formData.socialMediaPrimaryUse} onChange={(v) => updateField('socialMediaPrimaryUse', v)} />
                    </>
                  )}
                  
                  <TextField type="dropdown" label="Would you like training on effective social media usage?" options={yesNoOpts} value={formData.socialMediaTraining} onChange={(v) => updateField('socialMediaTraining', v)} />
                </div>

                <div className="mt-10 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => updateField('consent', e.target.checked)}
                      className="h-5 w-5 mt-0.5 text-[#277B12] focus:ring-[#277B12] border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-sm font-medium text-gray-800 cursor-pointer">
                      I consent to the use of my data for development and analysis purposes by the Federal Ministry of Youth Development.
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-10 pt-6 border-t flex justify-between items-center">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  currentStep === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-[#277B12] border-2 border-[#277B12] hover:bg-green-50'
                }`}
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold bg-[#277B12] text-white hover:bg-green-700 transition-colors shadow-md"
                >
                  <span>Next Step</span>
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold bg-[#277B12] text-white hover:bg-green-700 transition-colors shadow-md"
                >
                  <span>Submit Application</span>
                  <CheckCircle2 size={20} />
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}
