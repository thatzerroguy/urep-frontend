const fs = require('fs');
const path = require('path');

const programs = [
  'African Youth',
  'Bakeprenuer',
  'Entrepreneurship',
  'National Youth',
  'Youth Mental Health',
  'Youth Migration'
];

const geopoliticalZones = ['North Central', 'North East', 'North West', 'South East', 'South South', 'South West'];
const statesByZone = {
  'North Central': ['Benue', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau', 'FCT'],
  'North East': ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
  'North West': ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'],
  'South East': ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
  'South South': ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers'],
  'South West': ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']
};
const genders = ['Male', 'Female', 'Prefer not to say'];
const statuses = ['Student', 'Employed', 'Unemployed', 'Graduate', 'Artisan', 'Other'];
const yesNo = ['Yes', 'No'];
const youthBrackets = ['Yes', 'No'];
const sponsoringOrgs = ['UNFPA', 'State Government', 'NYCN', 'NANS', 'NGO', 'Private Sector', 'Other'];
const expertiseAreas = ['Advocacy', 'Entrepreneurship Trainer', 'Political Engagement', 'Community Mobiliser', 'Counsellor', 'Psychiatrist', 'Therapist', 'Nurse'];
const outcomes = ['Advocacy', 'Create awareness', 'Start a youth club', 'Mentor others', 'Other'];
const bakingInterests = ['Bread making', 'Cake and Pastry', 'Snack and Fast Food', 'Confectionery', 'Food Business', 'Other'];
const bakingSupports = ['Family Support', 'Coordinator Support', 'Other', 'Sponsorship'];
const timeDurations = ['3 Months', '6 Months', '1 Year'];
const stakeholders = ['Government', 'NGO', 'Private Sector', 'Individual', 'Academic'];
const priorities = ['Education', 'Employment', 'Health', 'Security', 'Infrastructure'];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randStr = (prefix) => prefix + Math.floor(Math.random() * 10000);

const registrations = [];
let idCounter = 1;

for (const program of programs) {
  for (let i = 0; i < 100; i++) {
    const zone = rand(geopoliticalZones);
    const state = rand(statesByZone[zone]);
    const d = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);

    const baseReg = {
      id: idCounter.toString(),
      name: `User ${idCounter}`,
      email: `user${idCounter}@example.com`,
      program: program,
      dateRegistered: d.toISOString().split('T')[0],
      geopoliticalZone: zone,
      state: state,
      gender: rand(genders),
    };

    if (program === 'African Youth') {
      Object.assign(baseReg, {
        youthProfessional: rand(yesNo),
        expertiseArea: rand(expertiseAreas),
        participationReason: randStr('Reason '),
        sponsoringOrganization: rand(sponsoringOrgs),
        belongsToOrg: rand(yesNo),
        organizationName: randStr('Org '),
        expectations: randStr('Expectation '),
        programOutcome: rand(outcomes),
        previousParticipation: rand(yesNo),
        fmydParticipation: rand(yesNo)
      });
    } else if (program === 'Bakeprenuer' || program === 'Entrepreneurship') {
      Object.assign(baseReg, {
        youthBracket: rand(youthBrackets),
        status: rand(statuses),
        participationReason: randStr('Reason '),
        expectations: randStr('Expectation '),
        previousParticipation: rand(yesNo),
        priorKnowledge: rand(yesNo),
        bakingInterest: program === 'Bakeprenuer' ? rand(bakingInterests) : undefined,
        bakingBusiness: program === 'Bakeprenuer' ? rand(yesNo) : undefined,
        bakingSupport: program === 'Bakeprenuer' ? rand(bakingSupports) : undefined,
        timeDuration: program === 'Bakeprenuer' ? rand(timeDurations) : undefined,
        sponsoringOrganization: rand(sponsoringOrgs)
      });
    } else if (program === 'National Youth') {
      Object.assign(baseReg, {
        stakeholder: rand(stakeholders),
        organizationName: randStr('Org '),
        expectations: randStr('Expectation '),
        previousParticipation: rand(yesNo),
        benefitedFromFMYD: rand(yesNo),
        participationReason: randStr('Reason '),
        youthFocusedOrganization: rand(yesNo),
        urgentPriority: rand(priorities)
      });
    } else if (program === 'Youth Mental Health') {
      Object.assign(baseReg, {
        stakeholder: rand(stakeholders),
        organizationName: randStr('Org '),
        programOutcome: rand(outcomes),
        expectations: randStr('Expectation ')
      });
    } else if (program === 'Youth Migration') {
      Object.assign(baseReg, {
        youthProfessional: rand(yesNo),
        programOutcome: rand(outcomes),
        sponsoringOrganization: rand(sponsoringOrgs),
        participationReason: randStr('Reason '),
        expectations: randStr('Expectation '),
        previousParticipation: rand(yesNo),
        benefitedFromFMYD: rand(yesNo),
        youthFocusedOrganization: rand(yesNo)
      });
    }

    registrations.push(baseReg);
    idCounter++;
  }
}

const fileContent = `export interface RegistrationData {
  id: string;
  name: string;
  email: string;
  program: string;
  dateRegistered: string;
  geopoliticalZone: string;
  state: string;
  gender?: string;
  youthProfessional?: string;
  expertiseArea?: string;
  participationReason?: string;
  sponsoringOrganization?: string;
  belongsToOrg?: string;
  organizationName?: string;
  expectations?: string;
  programOutcome?: string;
  previousParticipation?: string;
  fmydParticipation?: string;
  youthBracket?: string;
  status?: string;
  priorKnowledge?: string;
  bakingInterest?: string;
  bakingBusiness?: string;
  bakingSupport?: string;
  timeDuration?: string;
  stakeholder?: string;
  benefitedFromFMYD?: string;
  youthFocusedOrganization?: string;
  urgentPriority?: string;
}

export const mockRegistrations: RegistrationData[] = ${JSON.stringify(registrations, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/mockRegistrations.ts'), fileContent);
console.log('Successfully generated mock registrations.');
