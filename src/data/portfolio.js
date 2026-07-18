// ====================================================
// CENTRALIZED PORTFOLIO DATA — Single Source of Truth
// ====================================================

// ─── Social Links ──────────────────────────────────
export const socialLinks = {
  email: "tarannum.k2504@gmail.com",
  linkedin: "https://linkedin.com/in/tarannum2504",
  github: "https://github.com/Tarannum2504",
  instagram: "https://instagram.com/infera.labs",
  location: "Rajasthan, India",
  resume: "/RESUME.pdf",
};

// ─── Profile ───────────────────────────────────────
export const profile = {
  name: "Tarannum Khan",
  avatar: "/portrait.png",
  title: "Aspiring Data Analyst",
  subtitle: "DATA • AI • ANALYTICS",
  bio: [
    "B.Tech student in Artificial Intelligence & Machine Learning at JIET Jodhpur with a current CGPA of 9.70.",
    "Passionate about Data Analytics, Business Intelligence, and building AI-powered applications that solve real-world problems.",
    "Currently building analytics dashboards, AI-powered tools, and business intelligence solutions while improving skills in SQL, Python, and data visualization.",
  ],
};

// ─── Tech Stack ────────────────────────────────────
export const techStack = [
  {
    category: "Analytics & BI",
    items: ["SQL", "Microsoft Excel 365", "Power BI", "Tableau"],
  },
  {
    category: "Programming",
    items: ["Python", "Java", "C"],
  },
  {
    category: "Libraries",
    items: ["Pandas", "NumPy", "SciPy", "Scikit-Learn", "Matplotlib", "Plotly"],
  },
  {
    category: "Databases",
    items: ["MySQL", "SQLite", "RDBMS"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Streamlit", "Jupyter Notebook", "VS Code", "Google Colab", "Anaconda"],
  },
  {
    category: "Core Concepts",
    items: [
      "Exploratory Data Analysis (EDA)",
      "Data Cleaning",
      "Statistical Analysis",
      "Data Visualization",
      "Business Analytics",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Machine Learning",
    ],
  },
];

// ─── Projects ──────────────────────────────────────
export const projects = [
  {
    id: "askql",
    name: "AskQL",
    tag: "AI-Powered SQL Query Generator",
    desc: "A natural language to SQL query platform that enables users to query databases using plain English. Built with Streamlit and LLM integration to simplify database access for non-technical users.",
    stack: ["Python", "SQL", "Streamlit", "LLM"],
    thumbnail: "/AskQL.png",
    githubUrl: "https://github.com/Tarannum2504/AskQL",
    demoUrl: "https://askql-nl2sql.streamlit.app/",
    featured: true,
  },
  {
    id: "retail-analytics",
    name: "Retail Product Analytics",
    tag: "Retail Data Analytics",
    desc: "Analyzed SHEIN India retail data to identify product trends, pricing insights, and purchasing patterns through data cleaning, exploratory analysis, and interactive visualizations using Python, SQL, and Pandas.",
    stack: ["Python", "SQL", "Pandas", "Excel", "EDA", "Data Visualization"],
    thumbnail: "/retail-product-data-analysis.png",
    githubUrl: "https://github.com/Tarannum2504/Retail-Product-Analytics",
    demoUrl: null,
    featured: true,
  },
  {
    id: "edubus-tracker",
    name: "EduBus Tracker",
    tag: "Smart Transport Analytics Dashboard",
    desc: "A transportation analytics platform that visualizes bus routes, stops, and travel information using geospatial mapping with Folium. Includes route visualization, stop mapping, geospatial analytics, and route monitoring features.",
    stack: ["Python", "Pandas", "Folium", "Streamlit", "Geospatial Visualization", "Interactive Maps"],
    thumbnail: "/Edubus-tracker.png",
    githubUrl: "https://github.com/Tarannum2504/EduBus-Tracker",
    demoUrl: null,
    featured: false,
  },
  {
    id: "infera-ai",
    name: "Infera Study AI",
    tag: "AI Productivity & Analytics Platform",
    desc: "Designed and developed a productivity ecosystem integrating AI assistance, task management, analytics dashboards, session tracking, and a Pomodoro-based workflow system. Focused on improving productivity through intelligent automation and data-driven insights.",
    stack: ["Python", "Streamlit", "AI", "Analytics", "Dashboard", "Productivity"],
    thumbnail: "/infera study ai .png",
    githubUrl: "https://github.com/Tarannum2504/Infera-Study-AI",
    demoUrl: "https://infera-study-ai.streamlit.app/",
    featured: true,
  },
  {
    id: "explora-ai",
    name: "ExploraAI",
    tag: "Interactive EDA Simulation & Learning Platform",
    desc: "A beginner-friendly educational platform that simplifies Exploratory Data Analysis (EDA) through interactive simulations, visual analytics, and guided learning. Users can explore data cleaning, missing value handling, outlier detection, correlation analysis, and data visualization.",
    stack: ["Python", "Streamlit", "Pandas", "Plotly", "Matplotlib", "EDA"],
    thumbnail: "/ExploraAI.png",
    githubUrl: "https://github.com/Tarannum2504/ExploraAI",
    demoUrl: "https://exploraai.streamlit.app/",
    featured: true,
  },
  {
    id: "infera-guide",
    name: "Infera: My Personal Guide",
    tag: "AI-Powered Career Guidance Platform",
    desc: "An AI-powered career guidance platform that helps students with academic planning, skill development, internship preparation, and placement readiness. Provides personalized recommendations and structured learning paths tailored to individual career goals.",
    stack: ["Python", "Streamlit", "AI", "LLM", "Career Guidance", "Analytics"],
    thumbnail: "/Infera-my-personal-guide.png",
    githubUrl: "https://github.com/Tarannum2504/Infera-My-Personal-Guide",
    demoUrl: "https://infera-my-personal-guide-1.onrender.com",
    featured: true,
  },
  {
    id: "student-performance-dashboard",
    name: "Student Performance and Engagement Analysis",
    tag: "PowerBI Analytics Dashboard",
    desc: "A comprehensive PowerBI dashboard for analyzing student academic performance, attendance, and placement eligibility. It features interactive visualizations to track engagement metrics and performance across different engineering branches.",
    stack: ["Power BI", "Data Analytics", "Data Visualization"],
    thumbnail: "/PowerBI Dashboard.png",
    githubUrl: null,
    demoUrl: null,
    featured: true,
  },
];

// ─── Experience ────────────────────────────────────
export const experience = [
  {
    id: "sin-data-studio",
    role: "SIN Data Studio Intern",
    org: "SIN Education & Technology Pvt. Ltd.",
    period: "Present",
    desc: "Working on the SINERO retail and business management platform. Contributing to product development, ERP modules, analytics features and AI-powered business solutions.",
    tech: ["Python", "SQL", "ERP", "Business Intelligence", "Generative AI"],
    responsibilities: [
      "Developed and maintained ERP modules for the SINERO platform",
      "Built analytics dashboards for retail business intelligence",
      "Integrated AI-powered solutions into business workflows",
      "Collaborated on product development and feature implementation",
    ],
    projects_worked: ["SINERO ERP Platform", "Analytics Dashboards", "AI Business Solutions"],
    documents: [
      { label: "Offer Letter", file: "/SIN DATA STUDIO OFFER LETTER.jpeg" },
      { label: "Completion Certificate", file: "/DA_Summer_training.jpg" },
    ],
  },
  {
    id: "decodelabs",
    role: "Data Analytics Virtual Internship",
    org: "DecodeLabs",
    period: "Past",
    desc: "Completed a data analytics virtual internship focused on building dashboards and deriving actionable insights from structured datasets using Python and SQL.",
    tech: ["Python", "SQL", "Data Analysis", "Dashboarding"],
    responsibilities: [
      "Analyzed structured datasets to extract business insights",
      "Built data dashboards for performance tracking",
      "Cleaned and preprocessed raw data for analysis",
    ],
    projects_worked: ["Data Analysis Dashboards", "Business Insights Reports"],
    documents: [
      { label: "Offer Letter", file: "/Decodelab_offerLetter.jpeg" },
      { label: "Completion Certificate", file: "/Decodelabs_certification.jpeg" },
    ],
  },
];

// ─── Education ─────────────────────────────────────
export const education = {
  institution: "JIET Jodhpur",
  degree: "Bachelor of Technology",
  field: "Artificial Intelligence & Machine Learning",
  period: "2024 – 2028",
  cgpa: "9.70",
  year: "Third Year",
  coursework: [
    "Data Structures & Algorithms",
    "Object Oriented Programming",
    "Database Management Systems",
    "Machine Learning",
    "Artificial Intelligence",
    "Data Analytics",
    "Operating Systems",
  ],
};

// ─── Trainings ─────────────────────────────────────
export const trainings = [
  {
    id: "data-analytics-summer-training",
    title: "Data Analytics Summer Training",
    org: "SIN School of AI",
    year: "2025",
    duration: "6 Weeks",
    description: "Comprehensive summer training program covering data analytics fundamentals, Python, SQL, and business intelligence tools.",
    skills: ["Python", "SQL", "Data Analysis", "Business Intelligence", "Statistical Analysis"],
    image: "/DA_Summer_training.jpg",
    pdf: null,
  },
  {
    id: "advanced-excel-training",
    title: "Advanced Microsoft Excel 365 Summer Training",
    org: "Training Program",
    year: "2025",
    duration: "4 Weeks",
    description: "Advanced training in Microsoft Excel 365 covering data analysis, formulas, pivot tables, and visualization techniques.",
    skills: ["Advanced Excel", "Data Analysis", "Pivot Tables", "Data Visualization"],
    image: "/MS_Excel365.png",
    pdf: null,
  },
  {
    id: "rhcsa-training",
    title: "RHCSA Training",
    org: "Training Program",
    year: "2025",
    duration: "Upcoming Training",
    description: "Planned Red Hat Certified System Administrator (RHCSA) training focused on Linux system administration, command-line operations, shell scripting, and system configuration.",
    skills: ["Linux Administration", "Command Line", "System Configuration", "Shell Scripting"],
    image: null,
    pdf: null,
    status: "upcoming",
  },
];

// ─── Achievements ──────────────────────────────────
export const achievements = [
  // Academic
  {
    id: "nptel-top5",
    title: "Top 5% – NPTEL Emotional Intelligence",
    org: "NPTEL / SWAYAM",
    year: "2025",
    type: "Academic",
    description: "Secured a position in the Top 5% of candidates in the NPTEL Emotional Intelligence course.",
    image: null,
    thumbnail: "/Emotional Intelligence result.png",
    pdf: "/Emotional Intelligence result.pdf",
    featured: true,
  },
  {
    id: "advanced-excel-top3",
    title: "Top 3 Performer – Advanced Excel Training",
    org: "Training Program",
    year: "2025",
    type: "Academic",
    description: "Secured Top 3 position in Advanced Excel Training.",
    image: "/MS_Excel365.png",
    pdf: null,
    featured: false,
  },

  // Scholarships
  {
    id: "genpact-stem-scholarship",
    title: "Genpact STEM Scholarship",
    org: "Genpact",
    year: "2025",
    type: "Scholarship",
    description: "Awarded the Genpact STEM Scholarship for academic excellence in STEM fields.",
    image: "/Genpact.jpeg",
    pdf: null,
    featured: true,
  },

  // Competitions
  {
    id: "prompt-war-winner",
    title: "Winner – Prompt Engineering Competition",
    org: "College Event",
    year: "2025",
    type: "Competition",
    description: "First place winner in the Prompt Engineering competition.",
    image: "/Prompt war winner .jpeg",
    pdf: null,
    featured: true,
  },
  {
    id: "codefiesta-hackathon",
    title: "Codefiesta Hackathon",
    org: "College Event",
    year: "2025",
    type: "Competition",
    description: "Participated and achieved recognition in the Codefiesta Hackathon.",
    image: "/codefiesta hackathon.jpeg",
    pdf: null,
    featured: false,
  },
  {
    id: "ideathon",
    title: "Ideathon",
    org: "College Event",
    year: "2025",
    type: "Competition",
    description: "Participated in the Ideathon competition with innovative project ideas.",
    image: "/Ideathon.jpeg",
    pdf: null,
    featured: false,
  },
  {
    id: "tata-crucible",
    title: "Tata Crucible",
    org: "Tata",
    year: "2025",
    type: "Competition",
    description: "Participated in the Tata Crucible business quiz competition.",
    image: "/tata crucible.jpeg",
    pdf: null,
    featured: false,
  },
  {
    id: "treasure-hunt",
    title: "Technical Treasure Hunt",
    org: "College Event",
    year: "2025",
    type: "Competition",
    description: "Participated in the Technical Treasure Hunt event.",
    image: "/treasure hunt.jpeg",
    pdf: null,
    featured: false,
  },
];

// ─── Certifications ────────────────────────────────
export const certifications = [
  {
    id: "nptel-emotional-intelligence",
    title: "Emotional Intelligence",
    org: "NPTEL / SWAYAM",
    year: "2025",
    subcategory: "NPTEL",
    description: "NPTEL certification in Emotional Intelligence — secured Top 5% in the course.",
    image: null,
    thumbnail: "/Emotional Intelligence result.png",
    pdf: "/Emotional Intelligence result.pdf",
  },
  {
    id: "nptel-ethics-engineering",
    title: "Ethics in Engineering",
    org: "NPTEL / SWAYAM",
    year: "2025",
    subcategory: "NPTEL",
    description: "NPTEL certification in Ethics in Engineering.",
    image: null,
    thumbnail: "/Ethics in engineering.png",
    pdf: "/Ethics in engineering.pdf",
  },
  {
    id: "infosys-c-programming",
    title: "C Programming",
    org: "Infosys Springboard",
    year: "2025",
    subcategory: "Infosys",
    description: "Infosys certification in C Programming.",
    image: null,
    thumbnail: "/infosys certificate c prog..png",
    pdf: "/infosys certificate c prog..pdf",
  },
  {
    id: "infosys-mysql",
    title: "MySQL",
    org: "Infosys Springboard",
    year: "2025",
    subcategory: "Infosys",
    description: "Infosys certification in MySQL database management.",
    image: "/MYSQL.png",
    pdf: "/My SQL certificate .pdf",
  },
  {
    id: "tata-forage",
    title: "Data Visualization Job Simulation",
    org: "Tata / Forage",
    year: "2025",
    subcategory: "Forage",
    description: "Tata Data Visualization job simulation on Forage.",
    image: null,
    thumbnail: "/tata_forage_certificate.png",
    pdf: "/tata_forage_certificate.pdf",
  },
];

// ─── Featured IDs ──────────────────────────────────
export const featuredAchievementIds = [
  "nptel-top5",
  "prompt-war-winner",
  "genpact-stem-scholarship",
];
