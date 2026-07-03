// Navigo Nepal - High-Fidelity Data CMS
// Encapsulates all content, text, metrics, and visual structures in a single data-driven structure.

const NAVIGO_CMS = {
  organizationName: "Navigo Nepal",
  tagline: "Where Conventionality Ends and Practicality Starts",
  description: "A youth-led, non-profit organization dedicated to empowering junior high and high school students across Nepal to confidently navigate their future by bridging the gap between academic learning and real-world skills.",
  
  hero: {
    title: "Where Conventionality Ends and Practicality Starts",
    subtitle: "Navigo Nepal is a non-profit helping students navigate their path after the 10th grade. We provide career guidance and personality development, giving this generation the real-world mentorship and opportunities that the previous one missed.",
    ctaPrimary: "Join Navigo",
    ctaSecondary: "Partner With Us"
  },

  impactMetrics: [
    { id: "schools", label: "Schools Connected", value: 20, suffix: "+", icon: "school", color: "#6366f1", gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", desc: "Connecting public, private, and community schools with practical workshops and counseling." },
    { id: "students", label: "Students Reached", value: 1600, suffix: "+", icon: "users", color: "#a855f7", gradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", desc: "Empowered through SEE/12th grade counseling, leadership training, and climate awareness." },
    { id: "districts", label: "Districts Covered", value: 11, suffix: "+", icon: "map", color: "#ec4899", gradient: "linear-gradient(135deg, #ec4899 0%, #c026d3 100%)", desc: "Conducted programs and mapped coordinator networks across various geographical regions." },
    { id: "clubs", label: "Clubs Created", value: 29, suffix: "+", icon: "award", color: "#f97316", gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", desc: "Active, student-led circles (Eco Clubs, interest groups) fostering peer collaboration." },
    { id: "workshops", label: "Workshops Conducted", value: 35, suffix: "+", icon: "activity", color: "#f59e0b", gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", desc: "Interactive sessions on career streams, environment protection, and digital literacy." },
    { id: "volunteers", label: "Volunteer Network", value: 50, suffix: "+", icon: "globe", color: "#10b981", gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)", desc: "Passionate collegiate coordinators and local district ambassadors ('Navigers')." }
  ],

  story: {
    mission: "To empower students across Nepal by transforming their educational experience from a narrow academic focus to a holistic journey encompassing personal development, leadership cultivation, and practical problem-solving — equipping every learner with the agency to navigate their own future with confidence.",
    vision: "A Nepal where every student — regardless of geography or background — possesses the knowledge, practical skills, and resources to make informed decisions about their education and career, unlocking their full potential as leaders, innovators, and changemakers.",
    values: [
      { title: "Empowerment", desc: "Fostering youth agency by placing students at the helm of their own school clubs, initiatives, and leadership journeys — building confidence through ownership, not instruction." },
      { title: "Practicality", desc: "Replacing passive rote learning with active, experiential education — interactive games, real-world debates, and collaborative problem-solving that mirror life beyond the classroom." },
      { title: "Inclusivity", desc: "Extending program infrastructure and trained coordinator networks to the most underserved rural schools, ensuring no student is left behind due to geography or circumstance." },
      { title: "Environmental Stewardship", desc: "Inspiring the next generation to champion climate action through hands-on conservation campaigns, SDG-driven awareness, and partnerships with global organizations like UNICEF and USAID." }
    ],
    timeline: [
      { year: "Jan 2024", title: "Research & Assessment", desc: "Conducted qualitative and quantitative needs surveys with 100+ students to map local educational gaps and extracurricular needs." },
      { year: "Apr 2024", title: "First Counseling Campaigns", desc: "Launched our pilot 'What's Next?' projects at Shree Chandra Jyoti School in Nuwakot and Dhading, counseling 140+ students." },
      { year: "May 2024", title: "Leadership Development", desc: "Conducted personality and leadership workshops for 180+ Scout and general students at Gyanodaya and Padmodaya schools." },
      { year: "Jun 2024", title: "UNICEF & USAID Green Action", desc: "Collaborated on World Environment Day for plastic bottle gardening and environmental awareness, featured on global agency pages. Formally announced our partnership with Gurubaa." },
      { year: "Jul 2024", title: "AIESEC Partnerships & Scale", desc: "Teamed with AIESEC Nepal for the SDG 13 Climate Action campaign in schools, training hundreds of students across multiple Kathmandu classrooms." }
    ],
    foundingStory: "Navigo Nepal was founded in early 2024 by Anupam Neupane, Biyog Man Dangol, and Prajwal Dhungana. Realizing that the school system left SEE (grade 10) graduates unprepared and anxious about stream and career transitions, they established Navigo—Latin for 'Navigate'—to build a practical learning bridge. Starting with grass-roots workshops in Nuwakot, Navigo Nepal has rapidly expanded into a youth-led movement. The co-founders are supported by a strategic partnership with Gurubaa, Nepal's largest educational content creator, and a growing cohort of local student leaders, district ambassadors ('Navigers'), and volunteers.",
    leadershipMessage: {
      quote: "We started Navigo Nepal because we lived through the same gap every SEE graduate faces — the silence after the results, the confusion before choosing a stream, the absence of anyone who could show us what comes next. Our mission is to end the conventionality of our education system and replace passive textbook recitation with active, hands-on problem-solving. We want every student to walk out of our sessions not just informed, but equipped — with the clarity, confidence, and tools to figure out exactly what they want to become and how to get there.",
      author: "Anupam Neupane, Biyog Man Dangol, & Prajwal Dhungana",
      role: "Co-Founders, Navigo Nepal",
      avatar: "assets/169567052.jpg"
    },
    futureGoals: [
      {
        title: "Nation-wide Expansion (15+ Districts)",
        desc: "Scaling our programs from the initial pilot areas to over 15 districts through localized resource transmission.",
        icon: "target",
        progress: 45
      },
      {
        title: "District Ambassador Network",
        desc: "Orienting regional 'Navigers'—exceptional student leaders who track local needs and manage newly established clubs.",
        icon: "globe",
        progress: 60
      },
      {
        title: "Eco Clubs & Waste Projects",
        desc: "Scaling environment conservation projects like plastic gardening and trash management models across partner schools.",
        icon: "flask",
        progress: 30
      },
      {
        title: "Reviving Extracurriculars with Tech",
        desc: "Deploying hands-on tools (computers, VR) to help high school students retain their creative passions alongside SEE/12th academic pressure.",
        icon: "monitor",
        progress: 15
      }
    ]
  },

  programs: [
    {
      id: "whatsnext",
      title: "What's Next? Campaign",
      shortDesc: "SEE and grade 12 stream and career counseling.",
      fullDesc: "Helping students navigate academic streams (+2, A-Levels, CTEVT), colleges, and course selections through need assessment surveys, diagnostic tests, stream comparisons, and interactive guidance.",
      icon: "compass",
      color: "blue"
    },
    {
      id: "leadership",
      title: "Leadership & Personality Development",
      shortDesc: "Teamwork and critical thinking training.",
      fullDesc: "Interactive workshops for Scouts and general students using games (Balloon Game, puzzle challenges) to demonstrate real-time leadership, cooperation, and community problem-solving.",
      icon: "users",
      color: "green"
    },
    {
      id: "clubs",
      title: "School Clubs & ECAs Support",
      shortDesc: "Establishing student-led interest circles.",
      fullDesc: "Fostering practical student responsibility by helping schools structure, elect, and run active extracurricular clubs (such as Eco Clubs or sports circles) with curriculum templates.",
      icon: "shapes",
      color: "blue"
    },
    {
      id: "environment",
      title: "Environmental Stewardship",
      shortDesc: "Climate action campaigns and SDG awareness.",
      fullDesc: "World Environment Day events, bottle gardening, face painting, street rallies, and SDG 13 (Climate Action) lessons, executed in partnership with UNICEF, USAID Clean Air, and AIESEC.",
      icon: "globe",
      color: "green"
    },
    {
      id: "techveda",
      title: "Connect Tech to Veda",
      shortDesc: "Integrating computer education with Vedic traditions.",
      fullDesc: "A research initiative piloted at Brahmeshwor Gurukul. We provide computer literacy, explore artificial intelligence applications, and connect modern technology with traditional Sanskrit and spiritual studies.",
      icon: "cpu",
      color: "blue"
    }
  ],

  provinces: [
    {
      id: "bagmati",
      name: "Bagmati Province",
      schools: 15,
      students: 1200,
      clubs: 20,
      leadProgram: "What's Next? counseling, Scout leadership workshops, and UNICEF green projects.",
      milestone: "Run pilot campaigns in Nuwakot (Chandrajyoti), Dhading, Sindhupalchowk, and Kathmandu schools."
    },
    {
      id: "gandaki",
      name: "Gandaki Province",
      schools: 4,
      students: 160,
      clubs: 4,
      leadProgram: "What's Next? stream guidance and student-led clubs.",
      milestone: "Established clubs and held workshops in Pokhara, Baglung, and Parbat."
    },
    {
      id: "lumbini",
      name: "Lumbini Province",
      schools: 3,
      students: 120,
      clubs: 3,
      leadProgram: "What's Next? counseling and local volunteer setups.",
      milestone: "Delivered What's Next workshops in Banke and Rupandehi (Butwal)."
    },
    {
      id: "koshi",
      name: "Koshi Province",
      schools: 0,
      students: 0,
      clubs: 0,
      leadProgram: "Future Resource Transmission & Navigers Program",
      milestone: "Mapping regional schools and recruiting local collegiate coordinators for workshops."
    },
    {
      id: "madhesh",
      name: "Madhesh Province",
      schools: 0,
      students: 0,
      clubs: 0,
      leadProgram: "Future counseling kit distribution",
      milestone: "Preparing print guides and translating materials for student clubs in Birgunj and Janakpur."
    },
    {
      id: "karnali",
      name: "Karnali Province",
      schools: 0,
      students: 0,
      clubs: 0,
      leadProgram: "Remote school outreach",
      milestone: "Adapting counseling materials for remote areas where physical visits are limited."
    },
    {
      id: "sudurpashchim",
      name: "Sudurpashchim Province",
      schools: 0,
      students: 0,
      clubs: 0,
      leadProgram: "Regional coordinator training",
      milestone: "Designing onboarding guides to empower local youth leaders to run workshops."
    }
  ],

  successStories: [
    {
      name: "Aayush Bhandari",
      location: "Kathmandu",
      role: "Scout Leader, Gyanodaya School",
      image: "assets/success_aayush.jpg",
      quote: "Before the Navigo workshop, most of our Scout members viewed leadership as just a title. Through their interactive Balloon and focus games, we immediately saw how personal growth goes hand-in-hand with academic focus and communication. It broke the ice, transforming quiet students into active team leaders who are now launching our first school Eco Club.",
      highlight: "Gyanodaya Scout Lead"
    },
    {
      name: "Chandrajyoti Student",
      location: "Nuwakot",
      role: "What's Next Participant",
      image: "assets/success_pooja.jpg",
      quote: "We were completely blank on what streams to choose after grade 10. The What's Next presentation explained the streams, colleges, and scholarships clearly, giving us much-needed confidence.",
      highlight: "SEE Graduate"
    },
    {
      name: "Everest School Student",
      location: "Thaiba",
      role: "SDG 13 Participant",
      image: "assets/success_samir.jpg",
      quote: "We discussed climate action through drawings and interactive group activities. The ideas like making plastic baskets and small changes at home showed us that we can all make a difference.",
      highlight: "Climate Advocate"
    }
  ],

  team: [
    {
      name: "Anupam Neupane",
      role: "Co-Founder & Content Director",
      bio: "Designs interactive, game-based learning modules, Scout leadership sessions, and counsels students on SEE streams.",
      image: "assets/team_binaya.jpg",
      linkedin: "https://linkedin.com/in/anupam-neupane"
    },
    {
      name: "Prajwal Dhungana",
      role: "Co-Founder & Operations Lead",
      bio: "Coordinates nationwide school outreach, volunteer orientations, and project logistics in partner districts.",
      image: "assets/team_sneha.jpg",
      linkedin: "https://linkedin.com/in/prajwal-dhungana"
    },
    {
      name: "Biyog Man Dangol",
      role: "Co-Founder & Technology Lead",
      bio: "Manages technical support, computer literacy programs, and leads research on the Connect Tech to Veda project.",
      image: "assets/team_samikshya.jpg",
      linkedin: "https://linkedin.com/in/biyog-dangol"
    },
    {
      name: "Krishav Jung Shahi",
      role: "Event & Volunteer Coordinator",
      bio: "Runs volunteer selection interviews, coordinates local school events, and acts as a contact for regional ambassadors.",
      image: "assets/team_rajesh.jpg",
      linkedin: "https://linkedin.com/in/krishav-shahi"
    }
  ],

  partners: [
    { name: "Gurubaa", logoText: "Gurubaa", type: "Strategic Partner" },
    { name: "UNICEF Nepal", logoText: "UNICEF", type: "Collaborator" },
    { name: "USAID Clean Air", logoText: "USAID", type: "Collaborator" },
    { name: "AIESEC Nepal", logoText: "AIESEC", type: "Collaborator" }
  ],

  resources: [
    {
      title: "What's Next? Post-SEE Stream Guide",
      category: "Academic",
      desc: "Detailed reference guide covering streams (Science, Management, Humanities, CTEVT), college parameters, and scholarship opportunities in Nepal.",
      fileSize: "3.8 MB",
      format: "PDF"
    },
    {
      title: "Establishing a Student Club Guide",
      category: "School Kit",
      desc: "A step-by-step framework to help students structure, elect officers, and run active extracurricular clubs like Eco Clubs.",
      fileSize: "4.5 MB",
      format: "PDF"
    },
    {
      title: "Climate Action (SDG 13) Activity Kit",
      category: "Environment",
      desc: "Interactive lessons, drawing ideas, and group activities to teach environmental stewardship at school and home.",
      fileSize: "2.9 MB",
      format: "PDF"
    }
  ],

  blog: [
    {
      title: "Bridging the Post-SEE Transition: The Story Behind What's Next",
      date: "May 28, 2024",
      author: "Anupam Neupane",
      excerpt: "We reflected on the academic pressure and lack of exposure we faced after SEE. Here is why stream counseling is critical for every student...",
      image: "assets/blog_stem.jpg"
    },
    {
      title: "Veda and Tech: Computing at Brahmeshwor Gurukul",
      date: "June 10, 2024",
      author: "Biyog Man Dangol",
      excerpt: "Bridging centuries-old spiritual heritage with Artificial Intelligence and computer literacy. An insight into our pilot research connecting Vedic studies with technology...",
      image: "assets/blog_olympiad.jpg"
    }
  ],

  volunteerPositions: [
    {
      id: "counselor",
      title: "What's Next? Counselor",
      type: "Field",
      commitment: "4 hours / week",
      location: "Kathmandu & regional districts",
      desc: "Facilitate interactive stream selection and college counseling workshops for secondary school students."
    },
    {
      id: "ambassador",
      title: "District Ambassador ('Naviger')",
      type: "Remote",
      commitment: "3 hours / week",
      location: "Your local district",
      desc: "Serve as the main liaison for your district. Track local school needs, coordinate resources, and help launch local clubs."
    },
    {
      id: "green-volunteer",
      title: "Environmental Program Helper",
      type: "Field",
      commitment: "4 hours / week",
      location: "Kathmandu Metropolitan",
      desc: "Lead bottle gardening, environmental rallies, and SDG 13 drawing sessions in collaboration with local community schools."
    }
  ],

  donations: [
    {
      title: "Sponsor a Counselor",
      amount: "3,500",
      period: "monthly",
      desc: "Helps print Post-SEE guides, cover travel logistics for workshops in remote districts like Nuwakot and Dhading.",
      features: [
        "Monthly progress report from the field",
        "Direct feedback from schools and principal interviews",
        "Sponsor mention in workshop materials"
      ]
    },
    {
      title: "Sponsor a Student Club Kit",
      amount: "15,000",
      period: "annually",
      desc: "Provides seed resources, training materials, and coordinator support to establish a self-sustaining student club.",
      features: [
        "Name listed on the club's startup guidebook",
        "Quarterly update on club activities and eco projects",
        "Virtual invite to student club demo sessions"
      ]
    }
  ]
};

// Export to window object for browser access
window.NAVIGO_CMS = NAVIGO_CMS;
