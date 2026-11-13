'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Clock } from 'lucide-react';

export function Hero3() {
  const [upcomingModalProgram, setUpcomingModalProgram] = useState<string | null>(null);
  const [selectedUpdate, setSelectedUpdate] = useState<
    | {
        id: number;
        title: string;
        body: string;
        secondaryImages?: string[];
      }
    | null
  >(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setUpcomingModalProgram(null);
        setSelectedUpdate(null);
      }
    };

    const isAnyModalOpen = Boolean(upcomingModalProgram || selectedUpdate);
    if (isAnyModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [upcomingModalProgram, selectedUpdate]);

  const updates = [
    {
      id: 1,
      img: '/corper1.png',
      title: 'National Youth Policy',
      slug: 'national_youth',
      readMoreLink: 'https://nydb.ng/',
      registerLink: '/register',
      isExternalReadMore: true,
      hasRegisterButton: true,
      description: 'The National Youth Policy provides a framework for youth development, inclusion, and participation across Nigeria.',
      body: 'The National Youth Policy provides a framework for youth development, inclusion, and participation across Nigeria. It supports policy direction for youth empowerment, education, social inclusion, entrepreneurship, and national development.'
    },
    {
      id: 2,
      img: '/ac1.jpeg',
      secondaryImages: [
        '/ac2.jpeg',
        '/ac3.jpeg',
        '/ac4.jpeg',
        '/ac5.jpeg',
        '/ac6.jpeg',
      ],
      title: 'PRESIDENT TINUBU ORDERS ACTION ON YOUTH CONFAB OUTCOMES, INSISTS ON TIMELINES, MEASURABLE RESULTS',
      hasRegisterButton: false,
      description: 'The president demands youth participation in implementation and says the conference must deliver real opportunities.',
      body: 'President Bola Ahmed Tinubu has directed the Federal Ministry of Youth Development to immediately begin translating the outcomes of the 2026 National Youth Conference into concrete government actions, insisting that the recommendations must produce measurable results rather than become another report abandoned on government shelves.\n\nThe President gave the directive on Monday at the closing ceremony of the National Youth Conference, held at the State House Conference Centre, Abuja, where he was represented by the Speaker of the House of Representatives, Rt. Hon. Abbas Tajudeen.\n\nIn a significant move to ensure that the conference delivers lasting results, President Tinubu directed the Minister of Youth Development, Comrade Ayodele Olawande, to work with relevant Ministries, Departments and Agencies, state governments, the private sector and development partners to develop a practical implementation framework with clear priorities, assigned responsibilities, realistic timelines and measurable indicators of progress.\n\nThe President further insisted that young Nigerians must be actively involved in implementing and monitoring the decisions arising from the conference, signalling a shift from merely consulting young people to giving them a meaningful role in translating their recommendations into action.\n\n“The real test of this Conference begins after today. I do not want the recommendations of this Conference to become another report gathering dust on government shelves. I want them to become a guide for action,” the President declared.\n\n“You must not be invited to the table only when decisions are being discussed. You must also have a place at the table when those decisions are being implemented.”\n\nAcknowledging the economic and social challenges confronting Nigerian youth, President Tinubu said his administration understood their concerns about unemployment, the cost of living, access to education, business opportunities and insecurity.\n\nHe stressed that young Nigerians deserved more than explanations about current economic difficulties, assuring them that the government’s reforms and investments in education, skills development, innovation and entrepreneurship were intended to create opportunities that would improve their lives.\n\nHighlighting initiatives such as the Nigerian Education Loan Fund, the Three Million Technical Talent programme, YouthCred and the Nigerian Youth Academy, the President emphasised the need to ensure that skills training translates into employment, innovation attracts investment and young entrepreneurs have greater access to finance.\n\nHe also commended the Federal Ministry of Youth Development, the Conference Planning Committee and participating young Nigerians for demonstrating that the country’s youth possess the ideas, courage and determination required to contribute meaningfully to national development.\n\nEarlier, the Honourable Minister of Youth Development, Comrade Ayodele Olawande, disclosed that the conference had produced a comprehensive 18-point action agenda covering six priority areas, following nationwide virtual consultations and physical deliberations involving youth representatives from across the country and the diaspora.\n\nOlawande described the conference as a major step towards giving young Nigerians a stronger voice in national decision-making, stressing that the Ministry’s priority was to ensure that the ideas generated translated into policies, programmes and opportunities that would directly benefit them.\n\n“For the first time in the history of this country, the youth can feel the government, see the government, and touch the government,” the Minister declared.\n\nHe explained that the conference recommendations would be pursued through relevant executive, legislative and judicial channels, with the Ministry working alongside stakeholders to ensure that the outcomes received the necessary institutional attention.\n\nThe Minister also expressed appreciation to President Tinubu for providing the platform, describing the conference as an opportunity for young Nigerians to move beyond expressing their concerns to contributing directly to solutions.\n\nDelivering the keynote address, the Honourable Minister of Finance and Coordinating Minister of the Economy, Taiwo Oyedele, challenged young Nigerians to play a more active role in shaping the country’s economic future and strengthening confidence in Nigeria’s investment potential.\n\nHe warned that negative perceptions and distorted narratives could discourage investment, undermine economic confidence and ultimately deny young Nigerians opportunities for employment and enterprise.\n\n“A factory that is not built means jobs that are not created,” he stated, urging delegates to embrace constructive engagement, innovation and practical solutions to national challenges.\n\nOyedele emphasised the need to translate economic progress into tangible benefits for citizens through increased investment, production, job creation and shared prosperity.\n\nThe National Youth Conference, convened by the Tinubu administration, brought together young Nigerians from across the country and the diaspora to deliberate on pressing national issues and develop recommendations aimed at strengthening youth participation in governance, economic development and nation-building.\n\nWith the President’s directive, attention now turns to the development of an implementation framework that will determine how the conference outcomes are translated into government action, with young Nigerians expected to remain active participants in the process.\n\nSigned:\n\nNwachukwu Chtistian\nAssistant Director\nfor: Director (Information & Public Relations)'
    },
    {
      id: 3,
      img: '/confb1.jpg',
      secondaryImages: [
        '/confb2.jpg',
        '/confb3.jpg',
        '/confb4.jpg',
        '/confb5.jpg',
        '/confb6.jpg',
        '/confb7.jpg',
        '/confb8.jpg',
      ],
      title: 'FG COMMENCES PHYSICAL PHASE OF NATIONAL YOUTH CONFAB 2026, TASKS DELEGATES ON ACTIONABLE RECOMMENDATIONS',
      hasRegisterButton: false,
      description: 'The Federal Government has begun the physical phase of the 2026 National Youth Confab, with delegates tasked to develop actionable recommendations.',
      body: 'The Federal Government has begun the physical phase of the 2026 National Youth Confab, with the Honourable Minister of Youth Development, Comrade Ayodele Olawande, charging delegates to develop clear, practical, and achievable recommendations to address the challenges facing young Nigerians and contribute to national development.\n\nSpeaking at the commencement of the physical phase of the Conference, held at the NAF Conference Centre and Suites, Abuja, under the theme, “Next Gen Nigeria: Crafting Solutions, Owning the Future,” the Minister described the gathering as a significant milestone in the Federal Government’s efforts to strengthen youth participation in national development.\n\nHe noted that the virtual phase had provided an inclusive platform for young Nigerians across the country, with representation from all 36 states and the Federal Capital Territory, to contribute their perspectives on critical issues, including leadership and governance, employment, education, skills development, technology, climate change, peace, security and national unity.\n\nOlawande explained that the physical phase would enable delegates to examine issues raised during the virtual sessions critically, identify pressing challenges, assess proposed solutions and develop actionable recommendations to guide government decisions and improve the lives of young Nigerians. He stressed that the Conference must go beyond discussions and produce tangible outcomes that can be translated into policies, programmes and measurable results.\n\nThe Minister reaffirmed the commitment of President Bola Ahmed Tinubu’s administration, under the Renewed Hope Agenda, to advancing youth development through education, skills acquisition, business support, technological advancement and job creation. He also assured delegates of the Ministry’s determination to strengthen existing programmes and partnerships to ensure that the outcomes of the Conference inform youth-focused policies and interventions.\n\nHe urged delegates to participate actively, listen to one another, respect divergent opinions and remain focused on developing practical solutions. He further reminded them of their responsibility to millions of young Nigerians who were not physically present at the Conference, emphasising the need to ensure that their deliberations produced recommendations and partnerships capable of delivering lasting impact.\n\nIn her welcome address, the Permanent Secretary of the Ministry, Dr. Maryam Keshinro, expressed appreciation to Nigerian youths for their patience, presence, sacrifices and commitment to building a better Nigeria.\n\nShe observed that young people are not merely the future of the country but also an integral part of its present. She therefore urged delegates to take ownership of the National Youth Confab and translate their deliberations into practical recommendations, stronger partnerships and measurable commitments.\n\nShe reaffirmed the Ministry’s commitment to working with relevant stakeholders to ensure that the outcomes of the Conference translate into concrete actions that promote youth inclusion, national unity, accountability and active participation in governance.\n\nThe UNFPA Country Representative, Muriel Mafico, commended the Honourable Minister for his commitment to youth development, describing the National Youth Confab as an important opportunity for young people to take ownership of their future and contribute to shaping Nigeria, Africa and the world.\n\nShe underscored the importance of listening to the concerns of young people, particularly on issues relating to unemployment, the rising cost of living, poverty, education, skills development and mental health. She reaffirmed UNFPA’s commitment to supporting platforms that promote youth participation, amplify young people’s voices and ensure that their priorities are translated into practical solutions, sustainable development initiatives and meaningful outcomes.\n\nThe Chairman of the Senate Committee on Youth Development and Community Engagement, Senator Yemi Adaramodu, represented by the Clerk of the Committee, Dr. Ijeoma Chikwem, commended the organisers of the 2026 National Youth Confab for providing a platform for young Nigerians to exchange ideas, strengthen their leadership capacities and contribute to national development.\n\nHe emphasised the importance of youth empowerment, skills acquisition and employment creation, urging young people to embrace entrepreneurship, innovation, technology and responsible citizenship. He also called on the government, private sector, civil society organisations and community leaders to collaborate in creating an enabling environment for young people to thrive and contribute meaningfully to nation-building.\n\nIn his remarks, the Managing Director/Chief Executive Officer of the Niger Delta Development Commission (NDDC), Dr. Samuel Ogbuku, applauded the Honourable Minister of Youth Development for championing the inclusion of young people in national decision-making.\n\nHe described the 2026 National Youth Confab as a historic opportunity for Nigerian youths to contribute to shaping the country’s future. He urged delegates to embrace national unity, mutual understanding and collaboration across ethnic and regional divides.\n\nOgbuku further encouraged young people to channel their energy, creativity and passion for change towards developing practical solutions and demonstrating their readiness for leadership. He expressed confidence that the recommendations emerging from the Conference would contribute significantly to building a better Nigeria.\n\nSigned:\n\nOmolara Esan\nDirector, Information and Public Relations'
    },
    {
      id: 4,
      img: '/ym1.jpeg',
      secondaryImages: [
        '/ym2.jpeg',
        '/ym3.jpeg',
        '/ym4.jpeg',
        '/ym5.jpeg',
        '/ym6.jpeg',
        '/ym7.jpeg',
        '/ym8.jpeg',
      ],
      title: 'Youth Mental Health: FG Moves to Institutionalise Annual Youth Mental Health Week',
      hasRegisterButton: false,
      description: 'The Federal Ministry of Youth Development plans to institutionalise the National Adolescent and Youth Mental Health Week as an annual event.',
      body: 'The Federal Ministry of Youth Development has announced plans to institutionalise the National Adolescent and Youth Mental Health Week as an annual event to promote mental health awareness, strengthen support systems, and improve the well-being of young Nigerians.\n\nThe Honourable Minister of Youth Development, Comrade Ayodele Olawande, disclosed this at a Ministerial press briefing held on Saturday, 17th October, 2026, at the African University of Science and Technology (AUST), Abuja.\n\nHe said the initiative would provide a sustained platform for stakeholders to promote adolescent and youth mental health nationwide. “The Federal Ministry of Youth Development intends to institutionalise the National Adolescent and Youth Mental Health Week as an annual event,” he stated.\n\nThe Minister emphasised that mental health is essential to education, productivity and youth development. He also stressed the importance of involving young people in decisions concerning their well-being, noting that “they must be active participants in shaping the solutions that affect their lives.”\n\nThe programme is being organised in partnership with the Initiative for Self Esteem Education and Advocacy (ISEEA) and 23 civil society and non-governmental organisations. Activities include school engagements, community outreach, media sensitisation and a National Action Forum. The week will conclude with a gala dinner and the Creative Minds Awards, which will recognise creative contributions to mental health advocacy.\n\nAs part of efforts to sustain the initiative, the Ministry plans to encourage its adoption across the 36 states of the Federation and the Federal Capital Territory (FCT). The Minister also commended AUST for providing its hall for the National Action Forum at no cost, as well as Nuges Media for sponsoring awards for the three best creative minds whose artistic works address mental health challenges.\n\nRepresenting the Minister at the briefing, the Acting Permanent Secretary and Director of Human Resources, Akin Olanipekun, called on government agencies, development partners, the media, families, and young people to work together to tackle stigma and improve access to mental health support. He urged stakeholders to translate awareness into concrete action, stating: “It is time to move from conversation to commitment and from awareness to action.”\n\nIn his welcome address, the President of AUST, Professor Azikiwe Peter Onwualu, described mental health as an essential component of overall well-being. He noted that young people experiencing emotional challenges deserve understanding, respect and access to appropriate support.\n\nProfessor Onwualu called on families, schools, communities, and the government to work collectively to address stigma and improve access to mental health services. He emphasized that “seeking help is a strength, and no young person should have to face a mental health challenge alone.”\n\nSimilarly, the Founder and Executive Director of ISEEA, Rosemary Ochiwu, called for greater attention to the emotional well-being of young people, stressing that mental health advocacy must extend beyond awareness to practical action. She noted that resilience develops when young people have supportive families, safe schools and access to appropriate mental health services. She therefore urged stakeholders to make youth mental health a shared national priority.\n\nSigned:\n\nOmolara Esan\nDirector (Information and Public Relations)\n17th October, 2026.'
    },
    {
      id: 5,
      img: '/confab1.jpeg',
      secondaryImages: [
        '/confab2.jpeg',
        '/confab3.jpeg',
        '/confab4.jpeg',
        '/confab5.jpeg',
        '/confab6.jpeg',
        '/confab7.jpeg',
        '/confab8.jpeg',
        '/confab9.jpeg',
      ],
      title: 'FG Opens National Youth Confab 2026, Tasks Young Nigerians to Turn Dialogue into Action',
      hasRegisterButton: false,
      description: 'The Confab was declared open with a call for young Nigerians to turn dialogue into practical action and measurable outcomes.',
      body: 'The Federal Government has declared the National Youth Confab 2026 open, charging young Nigerians to move beyond conversations and develop practical solutions to the challenges confronting them while contributing meaningfully to national development.\n\nDeclaring the Confab open at the National Counter Terrorism Centre (NCTC) Auditorium, Abuja, the Honourable Minister of Youth Development, Comrade Ayodele Olawande, described the gathering as more than a conference, but an important platform for young Nigerians to exchange ideas, examine opportunities and challenges, and contribute to shaping policies and programmes that affect their lives.\n\nComrade Olawande said young Nigerians remain one of the country’s greatest assets, noting their contributions to entrepreneurship, technology, the creative economy, civic engagement, innovation, and community development. While acknowledging the challenges confronting young people in areas such as employment, skills development, access to finance, education, digital inclusion, entrepreneurship, peace and security, and access to opportunities, he stressed the need for coordinated action by government and other stakeholders to address these challenges.\n\nThe Minister called on delegates to go beyond identifying problems and develop realistic recommendations, partnerships, and measurable actions capable of translating the discussions into stronger programmes, improved access to opportunities, and greater accountability.\n\nHe also urged the private sector, development partners, civil society organisations and youth-led organisations to strengthen collaboration with government in expanding opportunities for young Nigerians across the country.\n\nComrade Ayodele assured participants that the Federal Ministry of Youth Development would continue to promote platforms that enable young Nigerians to participate meaningfully in shaping policies and programmes that affect their lives. He encouraged delegates to take full ownership of the Confab by engaging, questioning, proposing, and collaborating, expressing confidence that the deliberations would produce outcomes capable of being translated into meaningful action.\n\nThe Permanent Secretary, Federal Ministry of Youth Development, Dr. Maryam Ismaila Keshinro, emphasised the importance of meaningful youth participation in national development, noting that the Confab provides an opportunity for young Nigerians to shape conversations and policies on leadership, governance, jobs, entrepreneurship, education, digital skills, peacebuilding and national unity. She urged participants to move beyond discussions and translate their ideas into practical and measurable actions.\n\nThe Director-General of the National Youth Service Corps (NYSC), Brigadier General Olakunle Olaseye Nafiu, commended the Federal Government for convening the Confab, describing it as a timely platform for harnessing the ideas, energy, and potential of Nigeria’s young population. He stated that with young people constituting a significant proportion of the country’s population, their inclusion in national conversations and decision-making processes remains critical to Nigeria’s development.\n\nThe Director-General of the National Information Technology Development Agency (NITDA), Kashifu Inuwa Abdullahi, CCIE, highlighted the application of technology and Artificial Intelligence (AI) in capturing, analysing and categorising the ideas and concerns of young Nigerians at the Confab. He explained that the initiative would support meaningful youth participation and provide evidence that could inform policies reflecting the aspirations and expectations of young Nigerians.\n\nDr. Hardwick Tchale, Lead Agricultural Economist for West and Central Africa at the World Bank, described young people as a national asset, stressing the importance of engaging them in national development and harnessing their skills and potential to contribute meaningfully to Nigeria’s progress. He wished the Ministry and other stakeholders successful deliberations at the Confab.\n\nProf. Magdalene Igbolo, Director, Centre for Gender Studies and Youth Advancement, University of Abuja, highlighted the importance of the revived Commonwealth Youth Programme in building the capacity of youth development professionals. She added that the postgraduate programme is designed to equip practitioners with the knowledge and skills required to effectively engage young people and strengthen the professionalisation of the youth development sector.\n\nThe Speaker of the Nigerian Youth Parliament, Hon. Aliyu Idris Zakari, called for meaningful and sustained youth participation in governance and decision-making, stressing that young Nigerians should be recognised not merely as leaders of tomorrow, but as active partners and contributors to national development today.\n\nThe President of the National Association of Nigerian Students (NANS), Dist. Comr. Akinteye Babatunde Afeez, GCNS, stressed the need for young Nigerians to be recognised as active partners in national development, calling for greater attention to education, employment, skills development, digital innovation, entrepreneurship, and meaningful participation in governance. He urged that the outcomes of the Confab should translate into policies and programmes that improve the lives of young people.\n\nOmolara Esan\nDirector, Information and Public Relations'
    },
    {
      id: 6,
      img: '/lau1.jpeg',
      secondaryImages: ['/lau2.jpeg', '/lau3.jpeg', '/lau4.jpeg'],
      title: 'FG Launches National Youth Data Bank to Drive Evidence-Based Youth Development',
      hasRegisterButton: false,
      description: 'The Federal Government has launched the National Youth Data Bank to improve youth planning and targeted programme delivery.',
      body: 'The Federal Government, through the Federal Ministry of Youth Development, has launched the National Youth Data Bank (NYDB), a strategic initiative designed to strengthen evidence-based planning and improve policy formulation and enhance the delivery of targeted youth development programmes and interventions across Nigeria.\n\nSpeaking at the launch, the Honourable Minister of Youth Development, Comrade Ayodele Olawande, emphasised that the success of the National Youth Data Bank would depend on sustained collaboration among Ministries, Departments, and Agencies (MDAs) of government, state governments, educational institutions, development partners, the private sector, civil society organisations, and youth organisations.\n\nHe explained that the initiative goes beyond the collection and storage of data, noting that its broader objective is to improve the identification of young Nigerians and connect them with relevant opportunities in skills development, employment, entrepreneurship, internships, digital programmes and other youth-focused interventions.\n\nComrade Olawande stressed the importance of inclusion, privacy, and responsible data management, noting that Nigerian youths have diverse circumstances shaped by geography, gender, educational background, economic status, disability, location, and access to infrastructure.\n\nHe explained that the Data Bank is expected to improve the visibility of young people who may be underrepresented in existing datasets, particularly those in rural and underserved communities, while ensuring robust safeguards for data protection, accuracy, and the responsible use of information entrusted to the system.\n\nThe launch marks the beginning of a long-term effort to translate reliable youth data into meaningful opportunities and measurable development outcomes, with the vision to “Know the Youth, Understand the Youth, Connect the Youth, and Empower the Youth” in support of a stronger and more inclusive Nigeria,” he stated.\n\nThe Minister explained that the initiative forms part of the Federal Government’s broader youth development agenda, particularly in the areas of youth empowerment, job creation, skills development, digital transformation, and human capital development.\n\nHe added that the Data Bank would strengthen the government’s capacity to identify emerging needs, design targeted interventions, and connect young Nigerians with opportunities that are relevant to their skills, aspirations, and circumstances.\n\nIn her welcome address, the Permanent Secretary, Dr. Maryam Ismaila Keshinro, who was represented by the Director, Human Resources, Olaniepekun Akinwumi Adebayo, described the National Youth Data Bank as a significant milestone in strengthening youth development planning and ensuring that government interventions are guided by accurate, reliable, and relevant information.\n\nShe noted that credible data on the educational and skills profiles, employment status, entrepreneurial interests, locations, aspirations, and vulnerabilities of young Nigerians would be critical to effectively harnessing the potential of Nigeria’s youthful population.\n\nDr. Keshinro further noted that the Data Bank would provide an important platform for evidence-based policymaking, effective targeting of programmes, monitoring and evaluation, and improved coordination of youth development initiatives.\n\nAccording to her, the platform would also support government institutions, development partners, the private sector, and researchers in designing and implementing interventions that respond more effectively to the realities and aspirations of young Nigerians.\n\nThe Chairman, Senate Committee on Youth Development, Senator Adeyemi Raphael Adaramodu, who was represented by Dr. Ijeoma Chilean, Clerk of the Senate Committee, hailed the National Youth Data Bank as a remarkable accomplishment towards advancing a more responsive, inclusive, and evidence-based approach to youth development in Nigeria.\n\nHe noted that the initiative would provide reliable information on the country’s young population and support effective legislation, policy formulation, resource allocation, and the design of targeted interventions.\n\nSenator Adaramodu commended the Federal Ministry of Youth Development, POGMA Nigeria Limited, and other stakeholders for their commitment to the development and implementation of the initiative.\n\nThe National Youth Data Bank is expected to serve as a central and structured platform for youth-related data, providing stakeholders with better insights into the demographic characteristics, skills, aspirations, needs, and opportunities of young Nigerians, while supporting more coordinated and targeted youth development interventions.\n\nOmolara Esan\nDirector, Information and Public Relations'
    },
  ];

  const upcomingPrograms = [
    "LOCAL YOUTH EXCHANGE PROGRAMME",
    "TRAINING AND EMPOWERMENT OF YOUTH ON WASTE TO WEALTH MANAGEMENT, RECYCLING AND REUSE IN EACH OF THE 6 GEO-POLITICAL ZONES",
    "YOUTH MENTAL HEALTH AND PSYCHOSOCIAL SUPPORT (MHPS) PROGRAMME NATION-WIDE",
    "REVIEW AND IMPLEMENTATION OF NIGERIA YOUTH EMPLOYMENT ACTION PLAN (NIYEAP)",
    "ESTABLISHMENT OF TECH/SOCIAL HUBS IN THE NATIONAL YOUTH DEVELOPMENT CENTRES IN TWO ZONES SOUTH AND NORTH",
    "YOUTH ENTREPRENEURSHIP DEVELOPMENT PROGRAM FOR SUSTAINABLE GROWTH",
    "DIGITAL SKILLS TRAINING FOR RURAL YOUTH EMPOWERMENT",
    "AGRICULTURAL INNOVATION AND MODERNIZATION FOR YOUTH FARMERS",
    "CREATIVE ARTS AND CULTURAL HERITAGE PRESERVATION INITIATIVE",
  ];

  return (
    <section className="flex flex-col w-full items-center justify-center px-4 sm:px-10 bg-white">
      {/* UPDATES Section */}
      <div className="my-8 flex flex-col items-center">
        <h3 className="text-center text-xl text-black font-semibold tracking-widest uppercase">
          UPDATES
        </h3>
        <span className="mt-3 h-1 w-16 rounded-full bg-[#277B12]" aria-hidden="true" />
      </div>

      <div className="w-full bg-white mb-14 border-b-[1px] border-green-500 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {updates.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="overflow-hidden h-56 relative">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-1 items-center text-center">
                <h4 className="text-lg font-bold text-gray-800 mb-2 uppercase tracking-tight">
                  {item.title}
                </h4>
                <p className="text-base text-black mb-6 leading-relaxed flex-1 font-normal">
                  {item.description}
                </p>
                <div className="mt-auto flex w-full items-center justify-center gap-3 pt-2">
                  {item.hasRegisterButton ? (
                    <>
                      <a
                        href={item.readMoreLink ?? 'https://nydb.ng/'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-[#277B12] border border-[#277B12] text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-emerald-50 transition-colors shadow-sm"
                      >
                        Read more
                      </a>
                      <Link
                        href={item.registerLink ?? `/register?program=${item.slug}`}
                        className="bg-[#277B12] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedUpdate({
                        id: item.id,
                        title: item.title,
                        body: item.body ?? item.description,
                        secondaryImages: item.secondaryImages,
                      })}
                      className="bg-white text-[#277B12] border border-[#277B12] text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-emerald-50 transition-colors shadow-sm"
                    >
                      Read more
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Programs Section */}
      <div className="w-full flex flex-col items-center mb-16">
        <div className="mb-8 flex flex-col items-center">
          <h3 className="text-center text-xl text-black font-semibold">
            Upcoming Programs
          </h3>
          <span className="mt-3 h-1 w-16 rounded-full bg-[#277B12]" aria-hidden="true" />
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingPrograms.map((program, index) => (
            <div
              key={index}
              className="min-h-[240px] p-6 flex flex-col justify-between items-center shadow-lg border border-gray-50 rounded-xl hover:shadow-2xl transition-shadow duration-300 bg-white"
            >
              <p className="text-center text-sm font-bold text-gray-800 uppercase leading-relaxed mt-2">
                {program}
              </p>
              <button
                onClick={() => setUpcomingModalProgram(program)}
                className="mt-6 flex items-center justify-center rounded-lg bg-[#277B12] hover:bg-emerald-700 py-2 px-6 transition-all duration-150 shadow-sm cursor-pointer hover:scale-105"
              >
                <span className="text-white text-xs font-semibold">Read More</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Update Detail Pop-up Modal */}
      {selectedUpdate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedUpdate(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-7 relative border border-gray-100 animate-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedUpdate(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 rounded-full p-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#277B12] flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#277B12]">
              Update
            </span>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mt-1 mb-4 leading-snug">
              {selectedUpdate.title}
            </h4>
            {selectedUpdate.secondaryImages && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                {selectedUpdate.secondaryImages.map((image, index) => (
                  <div key={image} className="relative h-40 overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`Additional photo ${index + 1} for ${selectedUpdate.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedUpdate.body}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedUpdate(null)}
                className="bg-[#277B12] hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Program Pop-up Modal */}
      {upcomingModalProgram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          onClick={() => setUpcomingModalProgram(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-7 relative border border-gray-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setUpcomingModalProgram(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 rounded-full p-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge Icon */}
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#277B12] flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>

            {/* Content */}
            <span className="text-xs font-bold uppercase tracking-wider text-[#277B12]">
              Upcoming Programme
            </span>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mt-1 mb-2.5 leading-snug">
              {upcomingModalProgram}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Information and registration details for this programme will be published soon. Please check back later!
            </p>

            {/* Action Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setUpcomingModalProgram(null)}
                className="bg-[#277B12] hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
              >
                Got it, I&apos;ll check back later
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero3;
