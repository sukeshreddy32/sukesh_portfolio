import { Project, SkillItem, EducationItem, CertificationItem } from '../types';

export const PERSONAL_INFO = {
  name: "JANGA SUKESH",
  preferredName: "Sukesh",
  tagline: "Software Developer | AI & Technology Enthusiast",
  subTagline: "Building intelligent digital experiences & scalable computational systems.",
  objective: "To obtain a challenging position in a reputed organization where I can utilize my programming, problem-solving, and analytical abilities to develop efficient and scalable solutions. Skilled in Python, HTML, CSS, and basic data analysis techniques. Eager to apply my knowledge to real-world projects and grow in the IT industry.",
  status: "Emerging Software Developer (~Fresher)",
  statusBadge: "AVAILABLE FOR INTERNSHIPS & TECH ROLES",
  currentDegree: "B.Tech — Computer Science & Engineering (Data Science)",
  college: "Ellenki College of Engineering and Technology",
  location: "Hyderabad / Telangana, India",
  coordinates: "17.5236° N, 78.2325° E",
  email: "sukeshreddy32@gmail.com",
  phone: "+91 6304738450",
  github: "https://github.com/sukeshreddy32",
  linkedin: "https://www.linkedin.com/in/jangasukesh/",
  portfolioUrl: "https://question-paper-hub.vercel.app/",
  portraitUrl: "/assets/sukesh_portrait.jpg",
  resumeOriginalUrl: "/assets/sukesh_resume_original.jpg",
  yearEstablished: "2036 DIGITAL NEXUS",
  languages: [
    { name: "English", level: "Professional Working Proficiency" },
    { name: "Telugu", level: "Native / Bilingual" },
    { name: "Hindi", level: "Conversational" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "question-paper-hub",
    title: "QUESTION PAPER HUB",
    subtitle: "Online Examination Resource Platform",
    category: "Full-Stack & Web",
    highlight: "Deployed live platform democratizing academic materials across branches & semesters",
    description: "An online examination resource platform engineered to allow engineering students to seamlessly view, download, and upload B.Tech examination question papers organized hierarchically by branch, year, semester, and subject.",
    features: [
      "Hierarchical catalog filtering: Branch → Year → Semester → Subject",
      "Fast PDF document viewer & streamlined upload/download infrastructure",
      "Intuitive academic resource indexing designed for zero student friction",
      "Responsive layout optimized across desktop, tablet, and mobile devices",
      "Deployed and actively hosted on Vercel"
    ],
    liveUrl: "https://question-paper-hub.vercel.app/",
    githubUrl: "https://github.com/sukeshreddy32",
    tags: ["React / Next.js", "TypeScript", "Tailwind CSS", "PDF Processing", "Vercel"],
    architecture: [
      "Client UI Layer: Modern responsive component hierarchy",
      "Catalog Engine: Structured branch-semester taxonomies",
      "Document Delivery: Optimized edge-cached PDF streaming",
      "Deployment: Continuous delivery on Vercel"
    ],
    metrics: [
      { label: "Deployment", value: "Live on Vercel" },
      { label: "Accessibility", value: "100% Free" },
      { label: "Architecture", value: "Hierarchical Index" }
    ],
    gradient: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20"
  },
  {
    id: "agrilink-ai",
    title: "AGRILINK AI",
    subtitle: "AI-Powered Agriculture Supply Chain Platform",
    category: "AI & Data Science",
    highlight: "Autonomous multi-stakeholder ecosystem connecting Farmers, Buyers & Smart Logistics",
    description: "An intelligent agriculture supply chain infrastructure designed to connect farmers, verified buyers, and logistics transporters directly. Eliminates predatory intermediaries through computer vision crop assessment and predictive market modeling.",
    features: [
      "AI Crop Quality Assessment: Image-based grading & defect detection",
      "Agricultural Price Prediction: Time-series forecasting based on market arrivals",
      "Demand & Supply Forecasting: Regional agricultural yield analytics",
      "Smart Logistics & Routing: Direct dispatch between farms and verified buyers",
      "Transparent Digital Procurement: Fair value assurance for rural producers"
    ],
    githubUrl: "https://github.com/sukeshreddy32",
    tags: ["Python", "AI / Machine Learning", "Data Analytics", "Supply Chain", "Computer Vision"],
    architecture: [
      "Perception Engine: Computer vision inference for crop quality",
      "Predictive Core: Price forecasting via historical agricultural datasets",
      "Dispatch Mesh: Algorithmic matching for transporters & buyers",
      "Interface Portal: Accessible mobile-first procurement interface"
    ],
    metrics: [
      { label: "Pipeline", value: "5-Stage Link" },
      { label: "Core Model", value: "Vision + Forecasting" },
      { label: "Target Impact", value: "Direct Farmer Fair-Trade" }
    ],
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20"
  }
];

export const SKILLS: SkillItem[] = [
  // Programming
  {
    name: "Python",
    category: "Programming",
    levelDescription: "Core Language & AI Workhorse",
    description: "Primary language for data manipulation, algorithmic logic, computer vision models, and backend scripting.",
    iconName: "Terminal",
    color: "#38bdf8",
    coordinates: [-2.5, 1.8, 0],
    tags: ["OOP", "Data Analysis", "AI/ML", "Automation"]
  },
  {
    name: "JavaScript",
    category: "Programming",
    levelDescription: "Modern Web Execution",
    description: "Dynamic DOM scripting, event-driven architectures, asynchronous asynchronous network requests, and ES6+ standards.",
    iconName: "Code2",
    color: "#fbbf24",
    coordinates: [-1.2, 2.4, 0.5],
    tags: ["ES6+", "Async/Await", "DOM", "SPA"]
  },
  {
    name: "TypeScript",
    category: "Programming",
    levelDescription: "Type-Safe System Engineering",
    description: "Strong typing, interface contract design, generics, and compile-time correctness across modern applications.",
    iconName: "FileCode",
    color: "#60a5fa",
    coordinates: [1.2, 2.4, -0.5],
    tags: ["Static Typing", "Generics", "Interfaces", "Strict Mode"]
  },
  {
    name: "C++",
    category: "Programming",
    levelDescription: "High-Performance Computing",
    description: "Memory management, efficient pointer semantics, competitive coding, and performance-critical algorithms.",
    iconName: "Cpu",
    color: "#a855f7",
    coordinates: [2.5, 1.8, 0],
    tags: ["STL", "Memory Management", "Speed", "Competitive Programming"]
  },

  // Database
  {
    name: "SQL",
    category: "Database",
    levelDescription: "Relational Data Management",
    description: "Relational database schema normalization, complex JOIN operations, indexing, and transactional integrity.",
    iconName: "Database",
    color: "#f43f5e",
    coordinates: [-2.0, -0.4, 0.8],
    tags: ["RDBMS", "Queries", "Joins", "Data Modeling"]
  },

  // Web Technologies
  {
    name: "HTML5",
    category: "Web Technologies",
    levelDescription: "Semantic Document Structure",
    description: "Accessible, semantic web page layouts, SEO standards, and modern web application markup.",
    iconName: "Layout",
    color: "#f97316",
    coordinates: [-1.0, -1.8, 0.2],
    tags: ["Semantic HTML", "Accessibility", "SEO", "DOM Tree"]
  },
  {
    name: "CSS3",
    category: "Web Technologies",
    levelDescription: "Visual Design & Responsive Systems",
    description: "Flexbox, Grid architectures, custom animations, transitions, and modern responsive breakpoints.",
    iconName: "Palette",
    color: "#06b6d4",
    coordinates: [1.0, -1.8, -0.2],
    tags: ["Flexbox", "CSS Grid", "Animations", "Tailwind CSS"]
  },

  // Computing & AI
  {
    name: "Data Structures & Algorithms",
    category: "Computing & AI",
    levelDescription: "Foundational Problem Solving",
    description: "Arrays, linked lists, trees, graphs, sorting, searching, recursion, and Big-O computational time complexity.",
    iconName: "Binary",
    color: "#10b981",
    coordinates: [2.0, -0.4, -0.8],
    tags: ["Trees & Graphs", "Dynamic Programming", "Big-O", "Search/Sort"]
  },
  {
    name: "Data Analytics",
    category: "Computing & AI",
    levelDescription: "Data Insights & Processing",
    description: "Extracting patterns from raw numerical datasets, statistical evaluation, and structured exploratory analysis.",
    iconName: "BarChart3",
    color: "#ec4899",
    coordinates: [0, 0.5, 1.8],
    tags: ["Exploratory Analysis", "Statistics", "Metrics", "Data Wrangling"]
  },
  {
    name: "AI & Machine Learning",
    category: "Computing & AI",
    levelDescription: "Intelligent Algorithms",
    description: "Understanding predictive modeling, feature engineering, classification, neural patterns, and computer vision workflows.",
    iconName: "Sparkles",
    color: "#8b5cf6",
    coordinates: [0, -0.5, -1.8],
    tags: ["Predictive Models", "Supervised Learning", "Vision", "Neural Concepts"]
  }
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    degree: "Bachelor of Technology in CSE (Data Science)",
    institution: "Ellenki College of Engineering and Technology",
    location: "Patelguda, Hyderabad, Telangana",
    period: "2024 — 2028",
    scoreLabel: "CGPA",
    score: "8.7",
    status: "CURRENT",
    description: "Pursuing in-depth academic and practical curriculum in Computer Science with specialization in Data Science, advanced algorithmic structures, mathematical computing, and software development methodologies.",
    highlights: [
      "Maintaining an 8.7 CGPA across academic terms",
      "Specialized coursework in Data Science, Algorithms & Python",
      "Active participant in technical programs and coding initiatives"
    ]
  },
  {
    degree: "Intermediate (MPC — Mathematics, Physics, Chemistry)",
    institution: "Trinity Junior College",
    location: "Karimnagar, Telangana",
    period: "2022 — 2024",
    scoreLabel: "Percentage",
    score: "94%",
    status: "COMPLETED",
    description: "Intensive training in higher mathematics, analytical physics, and chemistry laying rigorous quantitative and logical foundations for engineering.",
    highlights: [
      "Achieved a 94% overall academic score",
      "Strong foundation in differential calculus, linear algebra & physics"
    ]
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "ZPHS Bandalingampally",
    location: "Bandalingampally, Telangana",
    period: "2021 — 2022",
    scoreLabel: "CGPA",
    score: "8.8",
    status: "COMPLETED",
    description: "Completed secondary education with distinction across all core academic disciplines.",
    highlights: [
      "Earned 8.8 CGPA with distinction in mathematics and sciences"
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "code-unnati",
    title: "Code Unnati — Foundation Course Certificate",
    issuer: "Edunet Foundation",
    partner: "Supported by SAP",
    period: "2025 — 2026",
    topics: [
      "Python Programming",
      "Object-Oriented Programming (OOP)",
      "Data Analytics & Interpretation",
      "Database Management Systems (DBMS)",
      "Data Structures & Algorithms",
      "Competitive Coding Practices"
    ],
    description: "Industry-aligned foundational technical certification program delivered by Edunet Foundation in collaboration with SAP. Provides rigorous, hands-on exposure to practical software development, real-world data analysis, relational database design, and algorithmic optimization.",
    badge: "FOUNDATION EXCELLENCE",
    verified: true
  }
];

export const AI_KNOWLEDGE_BASE = [
  {
    keywords: ["who is", "who are you", "tell me about sukesh", "introduce", "biography", "background"],
    answer: "Janga Sukesh is an ambitious Software Developer and AI Enthusiast currently pursuing his B.Tech in Computer Science and Engineering (Data Science) at Ellenki College of Engineering and Technology (2024–2028) with an 8.7 CGPA. He specializes in Python, TypeScript, modern web engineering, and applied machine learning systems."
  },
  {
    keywords: ["skills", "languages", "tech stack", "technologies", "what do you know"],
    answer: "Sukesh's core technical toolkit includes: Programming in Python, JavaScript, TypeScript, and C++; Databases with SQL; Web Technologies with HTML5, CSS3, and modern reactive frameworks; and Computing foundations in Data Structures & Algorithms, Data Analytics, and AI/Machine Learning."
  },
  {
    keywords: ["projects", "what did you build", "question paper hub", "agrilink"],
    answer: "Sukesh has engineered two flagship platforms:\n1. 'Question Paper Hub' (Live at https://question-paper-hub.vercel.app/) — an online examination platform organizing engineering papers by branch, year, semester & subject.\n2. 'AgriLink AI' — an intelligent agricultural supply chain system combining crop quality assessment, price prediction, demand forecasting, and smart logistics to empower farmers."
  },
  {
    keywords: ["agrilink", "agriculture", "farmer", "crop"],
    answer: "AgriLink AI is an innovative platform connecting farmers directly to verified buyers and transporters. Key features include AI crop quality grading via computer vision, agricultural price forecasting, demand modeling, and fair digital procurement without predatory middlemen."
  },
  {
    keywords: ["question paper", "exam", "education", "paper hub"],
    answer: "Question Paper Hub is Sukesh's deployed online examination resource platform. It enables students to view, download, and upload B.Tech past question papers organized cleanly by branch, year, semester, and subject. You can test it live at https://question-paper-hub.vercel.app/."
  },
  {
    keywords: ["education", "college", "school", "cgpa", "grades", "qualification"],
    answer: "Sukesh's academic milestones:\n• B.Tech in CSE (Data Science) at Ellenki College of Engineering and Technology (2024–2028) with 8.7 CGPA.\n• Intermediate (MPC) at Trinity Junior College, Karimnagar (2022–2024) with 94%.\n• SSC at ZPHS Bandalingampally (2021–2022) with 8.8 CGPA."
  },
  {
    keywords: ["certificate", "certification", "code unnati", "sap", "edunet"],
    answer: "Sukesh holds the prestigious 'Code Unnati Foundation Course Certificate' (2025–2026), issued by Edunet Foundation and supported by SAP. The certification encompasses training in Python, OOP, Data Analytics, DBMS, Data Structures & Algorithms, and Competitive Coding."
  },
  {
    keywords: ["contact", "email", "phone", "hire", "reach", "message", "call", "location"],
    answer: "You can reach Sukesh directly via:\n• Email: sukeshreddy32@gmail.com\n• Phone: +91 6304738450\n• GitHub: https://github.com/sukeshreddy32\n• LinkedIn: https://www.linkedin.com/in/jangasukesh/\n• Location: Hyderabad / Telangana, India."
  },
  {
    keywords: ["resume", "cv", "download resume"],
    answer: "You can view and download Sukesh's full verified resume right here on this portfolio by clicking the 'Download Resume' or 'View Resume' button, which opens the interactive digital career document with the original resume attachment."
  }
];
