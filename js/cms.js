// Navigo Nepal - High-Fidelity Data CMS
// Encapsulates all content, text, metrics, and visual structures in a single data-driven structure.

const NAVIGO_CMS = {
  organizationName: "Navigo Nepal",
  tagline: "Empowering Nepal's Next Generation of Leaders and Innovators",
  description: "A youth-led educational empowerment organization transforming the future of Nepal through student exposure, leadership development, STEM education, Olympiad awareness, mentorship, and community impact.",
  
  hero: {
    title: "Empowering Nepal's Future Leaders, Innovators, and Changemakers",
    subtitle: "Building opportunities, leadership, and impact for students across Nepal.",
    ctaPrimary: "Join Navigo",
    ctaSecondary: "Become a Partner"
  },

  impactMetrics: [
    { id: "schools", label: "Schools Connected", value: 120, suffix: "+", icon: "school" },
    { id: "students", label: "Students Reached", value: 25000, suffix: "+", icon: "users" },
    { id: "districts", label: "Districts Covered", value: 35, suffix: "+", icon: "map" },
    { id: "clubs", label: "Clubs Created", value: 45, suffix: "", icon: "award" },
    { id: "workshops", label: "Workshops Conducted", value: 280, suffix: "+", icon: "activity" },
    { id: "volunteers", label: "Volunteer Network", value: 500, suffix: "+", icon: "globe" }
  ],

  story: {
    mission: "To ignite curiosity, build critical thinking, and unlock paths of global competitiveness for every student in Nepal, regardless of geographical or socioeconomic limits.",
    vision: "An equitable Nepal where youth lead tech innovation, excel in international forums, and drive sustainable development through education and leadership.",
    values: [
      { title: "Empowerment", desc: "Placing youth at the steering wheel of community advancement." },
      { title: "Innovation", desc: "Pioneering STEM, interactive classrooms, and advanced problem-solving." },
      { title: "Inclusivity", desc: "Ensuring deep rural areas receive the same world-class mentorship as capital hubs." },
      { title: "Integrity", desc: "Unwavering commitment to quality education, accountability, and student safety." }
    ],
    timeline: [
      { year: "2022", title: "The Spark", desc: "Founded by a group of passionate students. Conducted the first STEM & Practical Robotics camp for 500 students across 10 public schools in Bagmati Province." },
      { year: "2023", title: "Olympiad Push", desc: "Launched Nepal's first youth-led Olympiad Awareness Campaign, distributing resources to 20+ remote districts. Initiated 15 Navigo School Clubs." },
      { year: "2024", title: "Mentorship & Scale", desc: "Established the Mentorship Network, matching 100+ rural students with mentors from top global universities. Expanded operations to Koshi and Gandaki." },
      { year: "2025", title: "Innovation Incubation", desc: "Created the Student Entrepreneurship Camp and Financial Literacy course, turning high-school ideas into community-funded prototypes." },
      { year: "2026", title: "Nationwide Horizons", desc: "Scaling across all 7 provinces, targeting 50,000+ students, establishing regional STEM labs, and aiming for international Olympiad honors." }
    ],
    foundingStory: "Navigo Nepal was born in 2022 from a simple yet powerful observation — thousands of talented students across Nepal's public schools had the potential to compete on global stages, but lacked the exposure, mentorship, and resources to do so. A group of passionate university students, who themselves had struggled through the same gaps in Nepal's educational system, decided to bridge this divide. What started as a weekend robotics camp in a single Bagmati Province school has grown into a nationwide movement touching all 7 provinces, empowering over 25,000 students, and building a volunteer network of 500+ mentors. Our journey is fueled by the belief that geography and socioeconomic background should never determine a student's ceiling.",
    leadershipMessage: {
      quote: "Every student in Nepal deserves access to the same quality of mentorship, resources, and opportunities that students in the world's best institutions receive. That's not just our mission — it's our responsibility as young Nepalis who have been fortunate enough to access those resources ourselves.",
      author: "Binaya Shrestha",
      role: "Co-Founder & Executive Director"
    },
    futureGoals: [
      {
        title: "50,000+ Students by 2027",
        desc: "Scaling our reach to touch 50,000 students across every district in Nepal through expanded school clubs and digital mentorship platforms.",
        icon: "target",
        progress: 50
      },
      {
        title: "Regional STEM Labs",
        desc: "Establishing permanent STEM innovation labs in each of Nepal's 7 provinces, equipped with advanced hardware and mentorship infrastructure.",
        icon: "flask",
        progress: 28
      },
      {
        title: "International Olympiad Honors",
        desc: "Training and supporting Nepal's brightest public school students to represent the nation at International Mathematics, Physics, and Chemistry Olympiads.",
        icon: "trophy",
        progress: 35
      },
      {
        title: "Digital Learning Platform",
        desc: "Building an open-access, bilingual (English/Nepali) digital platform with courses, mentorship matching, and scholarship discovery tools.",
        icon: "monitor",
        progress: 15
      }
    ]
  },

  programs: [
    {
      id: "stem",
      title: "STEM Exposure",
      shortDesc: "Igniting technical potential through interactive experimentation.",
      fullDesc: "Hands-on workshops in robotics, computer programming, physics design, and digital literacy. We provide schools with physical micro-controllers, sensors, and basic kits to convert passive classrooms into active innovation labs.",
      icon: "cpu",
      color: "blue"
    },
    {
      id: "olympiad",
      title: "Olympiad Awareness",
      shortDesc: "Equipping minds to compete in international academic arenas.",
      fullDesc: "Demystifying math, physics, biology, and chemistry Olympiads. We distribute comprehensive reference books, run intensive problem-solving bootcamps, and mentor selected prodigies to qualify for global contests.",
      icon: "binary",
      color: "green"
    },
    {
      id: "leadership",
      title: "Leadership Pipelines",
      shortDesc: "Cultivating responsible change-makers for local communities.",
      fullDesc: "Public speaking training, design thinking workshops, and community impact design. We guide students to identify local problems—ranging from trash management to tech access—and execute real solutions.",
      icon: "compass",
      color: "blue"
    },
    {
      id: "career",
      title: "Career Exploration",
      shortDesc: "Exposing young minds to contemporary vocational frontiers.",
      fullDesc: "Connecting high-schoolers with leading professionals in software engineering, bioscience, renewable energy, civil services, and creative arts. Expanding horizons beyond typical standard paths.",
      icon: "briefcase",
      color: "green"
    },
    {
      id: "clubs",
      title: "Navigo School Clubs",
      shortDesc: "Establishing self-sustaining hubs of interactive learning.",
      fullDesc: "Helping schools set up student-led weekly clubs focused on science, tech, debate, and social activism. We provide structured curriculum templates and support student-elected cabinet officers.",
      icon: "shapes",
      color: "blue"
    },
    {
      id: "mentorship",
      title: "Global Mentorship",
      shortDesc: "Direct bridges between local students and global experts.",
      fullDesc: "A 1-on-1 virtual network linking talented Nepali high school students with university students and working professionals from institutions like Harvard, MIT, IoE, and Kathmandu University.",
      icon: "heart-handshake",
      color: "green"
    },
    {
      id: "entrepreneurship",
      title: "Youth Incubation",
      shortDesc: "Turning raw, creative concepts into local enterprises.",
      fullDesc: "Equipping young students with basic startup frameworks: defining problem statements, customer discovery, minimal prototype assembly, and pitch presentations. Selected ideas receive seed micro-funding.",
      icon: "lightbulb",
      color: "blue"
    },
    {
      id: "finance",
      title: "Financial Literacy",
      shortDesc: "Essential fiscal skills for long-term youth independence.",
      fullDesc: "Interactive gamified modules on personal budgeting, the power of compound interest, basic banking in Nepal, micro-investments, and digital transactions (e-sewa, Khalti, mobile banking safety).",
      icon: "wallet",
      color: "green"
    }
  ],

  provinces: [
    {
      id: "koshi",
      name: "Koshi Province",
      schools: 22,
      students: 4500,
      clubs: 8,
      leadProgram: "STEM Outreach & Robotics Camps",
      milestone: "Established three regional high school science labs in Biratnagar and Dharan."
    },
    {
      id: "madhesh",
      name: "Madhesh Province",
      schools: 15,
      students: 3200,
      clubs: 5,
      leadProgram: "Financial Literacy & Olympiad Awareness",
      milestone: "Conducted extensive multi-school Math Bootcamps in Janakpur and Birgunj."
    },
    {
      id: "bagmati",
      name: "Bagmati Province",
      schools: 42,
      students: 9800,
      clubs: 18,
      leadProgram: "Leadership Pipelines & Innovation Hubs",
      milestone: "Hosted the annual Navigo Youth Leadership Summit in Kathmandu for 400+ delegates."
    },
    {
      id: "gandaki",
      name: "Gandaki Province",
      schools: 18,
      students: 3600,
      clubs: 7,
      leadProgram: "Career Exploration & Tech Workshops",
      milestone: "Equipped schools in Pokhara and Baglung with advanced Arduino programming kits."
    },
    {
      id: "lumbini",
      name: "Lumbini Province",
      schools: 14,
      students: 2800,
      clubs: 4,
      leadProgram: "STEM Exposure & Public Speaking",
      milestone: "Conducted public speaking tours across schools in Butwal and Bhairahawa."
    },
    {
      id: "karnali",
      name: "Karnali Province",
      schools: 5,
      students: 800,
      clubs: 1,
      leadProgram: "Remote Scholarship Guides & Mentorship",
      milestone: "Distributed physical paper books and guides to high schoolers in Surkhet and Jumla."
    },
    {
      id: "sudurpashchim",
      name: "Sudurpashchim Province",
      schools: 6,
      students: 1100,
      clubs: 2,
      leadProgram: "STEM Camps & Olympiad Bootcamps",
      milestone: "Deployed hybrid mentorship structures for students in Dhangadhi."
    }
  ],

  successStories: [
    {
      name: "Aayush Shrestha",
      location: "Biratnagar",
      role: "Navigo Mentorship Alumnus",
      image: "assets/success_aayush.jpg",
      quote: "Navigo completely changed my perspective on what's possible. Coming from a school in Biratnagar, I had no guidance on pursuing computer science. My mentor from Navigo matched with me, helped me build code projects, guided me through study applications, and today I have a fully funded education program.",
      highlight: "Scholarship Recipient"
    },
    {
      name: "Pooja Karki",
      location: "Pokhara",
      role: "Navigo School Club Lead",
      image: "assets/success_pooja.jpg",
      quote: "Before Navigo introduced Olympiad preparation materials in our school, we didn't even know these competitions existed. We thought they were only for elite capital-city students. The math camps pushed my limits, and last year I was proud to qualify for national physics selections.",
      highlight: "National Olympiad Contender"
    },
    {
      name: "Samir Magar",
      location: "Lalitpur",
      role: "Navigo Entrepreneurship Winner",
      image: "assets/success_samir.jpg",
      quote: "At the Navigo Entrepreneurship incubation workshop, we drafted a proposal for localized waste segregation. They taught us how to pitch and run spreadsheets, and helped us test our first prototype. Now our high-school club successfully recycles paper and plastic across our district.",
      highlight: "Community Eco-Founder"
    }
  ],

  team: [
    {
      name: "Binaya Shrestha",
      role: "Co-Founder & Executive Director",
      bio: "An advocate for democratizing education, Binaya drives the vision and international partnerships of Navigo. He is an alumnus of global youth networking fellowships.",
      image: "assets/team_binaya.jpg",
      linkedin: "https://linkedin.com/in/binaya-navigo"
    },
    {
      name: "Samikshya Adhikari",
      role: "Co-Founder & Program Director",
      bio: "A roboticist and teacher, Samikshya oversees curriculum design for Navigo's STEM outreach and coordinates regional trainers across rural districts.",
      image: "assets/team_samikshya.jpg",
      linkedin: "https://linkedin.com/in/samikshya-navigo"
    },
    {
      name: "Rajesh Thapa",
      role: "Academic Coordinator & Olympiad Lead",
      bio: "Gold medalist in physics contests, Rajesh designs the Olympiad awareness guides and coordinates free academic prep classes for public students.",
      image: "assets/team_rajesh.jpg",
      linkedin: "https://linkedin.com/in/rajesh-navigo"
    },
    {
      name: "Sneha Giri",
      role: "Volunteer Network Manager",
      bio: "Sneha coordinates Navigo's 500+ volunteer team, managing school assignments, scheduling mentorship pairs, and evaluating district impacts.",
      image: "assets/team_sneha.jpg",
      linkedin: "https://linkedin.com/in/sneha-navigo"
    }
  ],

  partners: [
    { name: "Tribhuvan University", logoText: "TU", type: "University" },
    { name: "Kathmandu University", logoText: "KU", type: "University" },
    { name: "Nepal STEM Alliance", logoText: "NSA", type: "NGO" },
    { name: "Youth Education Trust", logoText: "YET", type: "NGO" },
    { name: "Everest Tech Academy", logoText: "ETA", type: "Sponsor" },
    { name: "Himalayan Bank Foundation", logoText: "HBF", type: "Sponsor" }
  ],

  resources: [
    {
      title: "Cracking the Math Olympiad",
      category: "Academic",
      desc: "Our introductory guide featuring structural problem solving, key formulas, and past selection papers from Nepal National Mathematics Olympiad.",
      fileSize: "4.2 MB",
      format: "PDF"
    },
    {
      title: "High School Career Roadmap",
      category: "Mentorship",
      desc: "A comprehensive roadmap outlining modern vocations: from software development to research, renewable energy, and creative pathways in Nepal.",
      fileSize: "2.8 MB",
      format: "PDF"
    },
    {
      title: "Establishing a STEM Club",
      category: "School Kit",
      desc: "A hands-on, week-by-week guide for school teachers and student cabinet members to run interactive robotics and programming circles.",
      fileSize: "5.1 MB",
      format: "PDF"
    }
  ],

  blog: [
    {
      title: "Why STEM Education is the Key to Nepal's Future",
      date: "May 24, 2026",
      author: "Samikshya Adhikari",
      excerpt: "Passive textbook recitation is holding back Nepal's innovators. By integrating active labs and critical coding into public secondary schools, we can unlock a digital economy...",
      image: "assets/blog_stem.jpg"
    },
    {
      title: "Democratizing Academic Olympiads Outside Kathmandu",
      date: "April 15, 2026",
      author: "Rajesh Thapa",
      excerpt: "For years, international science teams were representing only high-end capital schools. In this article, we map the results of our district-level bootcamps and show the untapped genius in public sectors...",
      image: "assets/blog_olympiad.jpg"
    }
  ],

  volunteerPositions: [
    {
      id: "stem-mentor",
      title: "STEM Workshop Trainer",
      type: "Hybrid / Field",
      commitment: "4 hours / week",
      location: "Bagmati, Koshi, or Gandaki",
      desc: "Lead weekend robotics, programming, or physics experiment setups at our school hubs. Materials and curriculums are pre-provided."
    },
    {
      id: "olympiad-tutor",
      title: "Olympiad Academic Tutor",
      type: "Remote",
      commitment: "2 hours / week",
      location: "Online",
      desc: "Facilitate specialized problem-solving zoom sessions for bright public school students preparing for the National Mathematics Olympiad."
    },
    {
      id: "club-coordinator",
      title: "School Club Coordinator",
      type: "Field",
      commitment: "3 hours / week",
      location: "Local (Your own district)",
      desc: "Serve as a supportive supervisor for 2 or 3 local school clubs, ensuring cabinet officers run interactive sessions weekly."
    }
  ],

  donations: [
    {
      title: "Sponsor a Student",
      amount: "5,000",
      period: "monthly",
      desc: "Provides a talented public school student with textbook packages, specialized STEM kits, weekly mentorship, and academic exam entries.",
      features: [
        "1-on-1 progress report every term",
        "Personal letters from your student",
        "Access to student's STEM project builds"
      ]
    },
    {
      title: "Sponsor a School Club",
      amount: "25,000",
      period: "annually",
      desc: "Establishes a fully functioning STEM and Olympiad cell inside a community high school, complete with 10 physical hardware micro-controllers and teacher training workshops.",
      features: [
        "Your name listed on the club shield",
        "Quarterly live virtual demo with students",
        "Direct updates on club innovation prototypes"
      ]
    }
  ]
};

// Export to window object for browser access
window.NAVIGO_CMS = NAVIGO_CMS;
