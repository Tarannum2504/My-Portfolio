// ============================================================
// PORTFOLIO DATA — Structured context for the AI system prompt
// ============================================================

export const PORTFOLIO_DATA = {
  profile: {
    name: "Tarannum Khan",
    title: "Aspiring Data Analyst",
    subtitle: "DATA • AI • ANALYTICS",
    bio: [
      "B.Tech student in Artificial Intelligence & Machine Learning at JIET Jodhpur with a current CGPA of 9.70.",
      "Passionate about Data Analytics, Business Intelligence, and building AI-powered applications that solve real-world problems.",
      "Currently building analytics dashboards, AI-powered tools, and business intelligence solutions while improving skills in SQL, Python, and data visualization.",
    ],
  },

  techStack: [
    { category: "Analytics & BI", items: ["SQL", "Microsoft Excel 365", "Power BI", "Tableau"] },
    { category: "Programming", items: ["Python", "Java", "C"] },
    { category: "Libraries", items: ["Pandas", "NumPy", "SciPy", "Scikit-Learn", "Matplotlib", "Plotly"] },
    { category: "Databases", items: ["MySQL", "SQLite", "RDBMS"] },
    { category: "Tools", items: ["Git", "GitHub", "Streamlit", "Jupyter Notebook", "VS Code", "Google Colab", "Anaconda"] },
    { category: "Core Concepts", items: ["Exploratory Data Analysis (EDA)", "Data Cleaning", "Statistical Analysis", "Data Visualization", "Business Analytics", "Data Structures & Algorithms", "Object-Oriented Programming", "Machine Learning"] },
  ],

  projects: [
    {
      name: "AskQL",
      tag: "AI-Powered SQL Query Generator",
      desc: "A natural language to SQL query platform. Built with Streamlit and LLM integration to simplify database access for non-technical users.",
      stack: ["Python", "SQL", "Streamlit", "LLM"],
      githubUrl: "https://github.com/Tarannum2504/AskQL",
      demoUrl: "https://askql-nl2sql.streamlit.app/",
      demonstrates: {
        artificialIntelligence: true,
        machineLearning: false,
        sql: true,
        python: true,
        streamlit: true,
        powerBI: false,
        tableau: false,
        eda: false,
        visualization: false,
        businessAnalytics: false,
        folium: false,
        geospatialVisualization: false,
        excel: false,
        llm: true,
        analytics: true
      },
      bestFor: ["AI Engineer", "Data Analyst"]
    },
    {
      name: "Retail Product Analytics",
      tag: "Retail Data Analytics",
      desc: "Analyzed SHEIN India retail data to identify product trends, pricing insights, and purchasing patterns through data cleaning, exploratory analysis, and interactive visualizations.",
      stack: ["Python", "SQL", "Pandas", "Excel", "EDA", "Data Visualization"],
      githubUrl: "https://github.com/Tarannum2504/Retail-Product-Analytics",
      demoUrl: null,
      demonstrates: {
        artificialIntelligence: false,
        machineLearning: false,
        sql: true,
        python: true,
        streamlit: false,
        powerBI: false,
        tableau: false,
        eda: true,
        visualization: true,
        businessAnalytics: true,
        folium: false,
        geospatialVisualization: false,
        excel: true,
        llm: false,
        analytics: true
      },
      bestFor: ["Data Analyst"]
    },
    {
      name: "EduBus Tracker",
      tag: "Smart Transport Analytics Dashboard",
      desc: "A transportation analytics platform using geospatial mapping with Folium. Includes route visualization, stop mapping, and geospatial analytics.",
      stack: ["Python", "Pandas", "Folium", "Streamlit", "Geospatial Visualization", "Interactive Maps"],
      githubUrl: "https://github.com/Tarannum2504/EduBus-Tracker",
      demoUrl: null,
      demonstrates: {
        artificialIntelligence: false,
        machineLearning: false,
        sql: false,
        python: true,
        streamlit: true,
        powerBI: false,
        tableau: false,
        eda: false,
        visualization: true,
        businessAnalytics: false,
        folium: true,
        geospatialVisualization: true,
        excel: false,
        llm: false,
        analytics: true
      },
      bestFor: ["Data Analyst"]
    },
    {
      name: "InferaAI",
      tag: "AI Productivity & Analytics Platform",
      desc: "A productivity ecosystem integrating AI assistance, task management, analytics dashboards, session tracking, and a Pomodoro-based workflow system.",
      stack: ["Python", "Streamlit", "AI", "Analytics", "Dashboard", "Productivity"],
      githubUrl: "https://github.com/Tarannum2504/Infera-Study-AI",
      demoUrl: "https://infera-study-ai.streamlit.app/",
      demonstrates: {
        artificialIntelligence: true,
        machineLearning: false,
        sql: false,
        python: true,
        streamlit: true,
        powerBI: false,
        tableau: false,
        eda: false,
        visualization: true,
        businessAnalytics: false,
        folium: false,
        geospatialVisualization: false,
        excel: false,
        llm: false,
        analytics: true
      },
      bestFor: ["AI Engineer"]
    },
    {
      name: "ExploraAI",
      tag: "Interactive EDA Simulation & Learning Platform",
      desc: "A beginner-friendly platform simplifying Exploratory Data Analysis (EDA) through interactive simulations, visual analytics, and guided learning.",
      stack: ["Python", "Streamlit", "Pandas", "Plotly", "Matplotlib", "EDA"],
      githubUrl: "https://github.com/Tarannum2504/ExploraAI",
      demoUrl: "https://exploraai.streamlit.app/",
      demonstrates: {
        artificialIntelligence: false,
        machineLearning: false,
        sql: false,
        python: true,
        streamlit: true,
        powerBI: false,
        tableau: false,
        eda: true,
        visualization: true,
        businessAnalytics: false,
        folium: false,
        geospatialVisualization: false,
        excel: false,
        llm: false,
        analytics: true
      },
      bestFor: ["Data Analyst"]
    },
    {
      name: "Infera (Career Guide)",
      tag: "AI-Powered Career Guidance Platform",
      desc: "An AI-powered career guidance platform for academic planning, skill development, internship preparation, and placement readiness.",
      stack: ["Python", "Streamlit", "AI", "LLM", "Career Guidance", "Analytics"],
      githubUrl: "https://github.com/Tarannum2504/Infera-My-Personal-Guide",
      demoUrl: "https://infera-my-personal-guide-1.onrender.com",
      demonstrates: {
        artificialIntelligence: true,
        machineLearning: false,
        sql: false,
        python: true,
        streamlit: false,
        powerBI: false,
        tableau: false,
        eda: false,
        visualization: false,
        businessAnalytics: false,
        folium: false,
        geospatialVisualization: false,
        excel: false,
        llm: true,
        analytics: true
      },
      bestFor: ["AI Engineer"]
    },
  ],

  experience: [
    {
      role: "SIN Data Studio Intern",
      org: "SIN Education & Technology Pvt. Ltd.",
      period: "Present",
      desc: "Working on the SINERO retail and business management platform. Contributing to product development, ERP modules, analytics features and AI-powered business solutions.",
      tech: ["Python", "SQL", "ERP", "Business Intelligence", "Generative AI"],
    },
    {
      role: "Data Analytics Virtual Internship",
      org: "DecodeLabs",
      period: "Past",
      desc: "Completed a data analytics virtual internship focused on building dashboards and deriving actionable insights from structured datasets using Python and SQL.",
      tech: ["Python", "SQL", "Data Analysis", "Dashboarding"],
    },
  ],

  education: {
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
  },

  certifications: [
    { title: "Emotional Intelligence", org: "NPTEL / SWAYAM", year: "2025", note: "Top 5% performer" },
    { title: "Ethics in Engineering", org: "NPTEL / SWAYAM", year: "2025" },
    { title: "C Programming", org: "Infosys Springboard", year: "2025" },
    { title: "MySQL", org: "Infosys Springboard", year: "2025" },
    { title: "Data Visualization Job Simulation", org: "Tata / Forage", year: "2025" },
  ],

  trainings: [
    {
      title: "Data Analytics Summer Training II",
      aliases: ["data analytics summer training ii", "data analytics summer training", "data analytics training", "sin school of ai training", "analytics training"],
      status: "Completed",
      year: "2026",
      provider: "SIN School of AI",
      focus: "Comprehensive data analytics foundations, exploratory analysis, and business intelligence.",
      skillsLearned: ["Python", "SQL", "EDA", "Data Cleaning", "Visualization", "Business Analytics"],
      achievement: null,
      certificatePath: null
    },
    {
      title: "Advanced Microsoft Excel 365 Summer Training",
      aliases: ["excel 365 summer training", "excel training", "advanced microsoft excel", "excel summer training", "excel 365"],
      status: "Completed",
      year: "2025",
      provider: "Training Program",
      focus: "Intensive spreadsheets modeling and business metrics reporting.",
      skillsLearned: ["Advanced Excel", "Dashboards", "Pivot Tables", "Data Analysis", "Business Reporting"],
      achievement: "Top 3 Performer",
      certificatePath: null
    },
    {
      title: "RHCSA (Red Hat Certified System Administrator)",
      aliases: ["rhcsa", "red hat certified system administrator", "linux training", "redhat"],
      status: "Upcoming",
      plannedStart: "2025",
      purpose: "Planned Linux system administration training to strengthen infrastructure and operating system knowledge.",
      expectedLearning: ["Linux System Administration", "Command Line", "Infrastructure Management"],
      achievement: null,
      certificatePath: null
    }
  ],

  achievements: [
    {
      title: "Top 5% – NPTEL Emotional Intelligence",
      aliases: ["nptel", "emotional intelligence", "nptel emotional intelligence", "top 5% performer"],
      category: "Academic",
      year: "2025",
      description: "Scored in the top 5% nationally in the NPTEL certification course on Emotional Intelligence.",
      significance: "Demonstrates exceptional soft skills, self-awareness, and professional empathy, which are vital for team leadership and collaboration.",
      certificatePath: "/certificates/nptel-emotional-intelligence.pdf"
    },
    {
      title: "Top 3 Performer – Advanced Excel Training",
      aliases: ["excel training", "advanced excel training", "top 3 performer", "excel performer"],
      category: "Academic",
      year: "2025",
      description: "Recognized as one of the top 3 performers in the intensive Advanced Microsoft Excel 365 Summer Training program.",
      significance: "Validates proficiency in advanced spreadsheet logic, dashboards, and analytical structures required for business analysis.",
      certificatePath: null
    },
    {
      title: "Genpact STEM Scholarship",
      aliases: ["genpact", "stem scholarship", "genpact stem scholarship", "scholarship"],
      category: "Scholarship",
      year: "2025",
      description: "Awarded the Genpact STEM Scholarship for academic excellence and pursuing degrees in STEM fields.",
      significance: "Provides recognition from a global professional services firm, highlighting dedication to excellence in technical studies.",
      certificatePath: null
    },
    {
      title: "Winner – Prompt Engineering Competition",
      aliases: ["prompt war", "prompt engineering competition", "prompt engineering winner", "prompt engineering", "prompt winner"],
      category: "Competition",
      year: "2025",
      description: "Won first place in the college-level Prompt Engineering Competition, designing optimized inputs for LLMs to solve reasoning tasks.",
      significance: "Demonstrates hands-on expertise in generative AI interaction, contextual prompting, and Large Language Models usage.",
      certificatePath: null
    },
    {
      title: "Codefiesta Hackathon",
      aliases: ["codefiesta", "code fiesta", "hackathon", "codefiesta hackathon"],
      category: "Hackathon",
      year: "2025",
      description: "Participated in the Codefiesta Hackathon, collaborating to design and prototype digital solutions within tight time constraints.",
      significance: "Highlights teamwork, agile problem-solving, rapid prototyping capabilities, and software development under pressure.",
      certificatePath: null
    },
    {
      title: "Ideathon",
      aliases: ["ideathon", "college ideathon", "idea competition"],
      category: "Competition",
      year: "2025",
      description: "Presented an innovative, tech-driven solution to solve public transport inefficiencies at the college Ideathon.",
      significance: "Validates design thinking, business analysis, presentation skills, and the capacity to pitch creative product solutions.",
      certificatePath: null
    },
    {
      title: "Tata Crucible",
      aliases: ["tata crucible", "tata quiz", "crucible"],
      category: "Recognition",
      year: "2025",
      description: "Participated in the Tata Crucible Campus Quiz, competing against top colleges in business and technology quizzes.",
      significance: "Broadens general business intelligence, corporate knowledge, and logical deduction under competitive conditions.",
      certificatePath: null
    },
    {
      title: "Technical Treasure Hunt",
      aliases: ["technical treasure hunt", "treasure hunt", "hunt"],
      category: "Competition",
      year: "2025",
      description: "Won first runner-up in the Technical Treasure Hunt, solving multi-layered programming and cryptography puzzles.",
      significance: "Reflects speed, logical reasoning, decryption capability, and lateral problem-solving in a gamified technical setting.",
      certificatePath: null
    }
  ],

  social: {
    email: "tarannum.k2504@gmail.com",
    linkedin: "https://linkedin.com/in/tarannum2504",
    github: "https://github.com/Tarannum2504",
    instagram: "https://instagram.com/infera.labs",
    location: "Rajasthan, India",
    resume: "/RESUME.pdf",
  },
  github: {
    username: "Tarannum2504",
    profileUrl: "https://github.com/Tarannum2504",
    repositories: [
      { name: "AskQL", url: "https://github.com/Tarannum2504/AskQL", technologies: ["Python", "SQL", "Streamlit", "LLM"], topics: ["AI", "Data Analytics"] },
      { name: "Retail Product Analytics", url: "https://github.com/Tarannum2504/Retail-Product-Analytics", technologies: ["Python", "SQL", "Excel", "EDA", "Visualization"], topics: ["Data Analytics"] },
      { name: "EduBus Tracker", url: "https://github.com/Tarannum2504/EduBus-Tracker", technologies: ["Python", "Streamlit", "Folium", "Geospatial Visualization"], topics: ["Data Analytics"] },
      { name: "ExploraAI", url: "https://github.com/Tarannum2504/ExploraAI", technologies: ["Python", "Streamlit", "Pandas", "Plotly", "Matplotlib", "EDA"], topics: ["Data Analytics"] },
      { name: "InferaAI", url: "https://github.com/Tarannum2504/Infera-Study-AI", technologies: ["Python", "Streamlit", "AI", "Analytics"], topics: ["AI", "Data Analytics"] },
      { name: "Infera Career Guide", url: "https://github.com/Tarannum2504/Infera-My-Personal-Guide", technologies: ["Python", "Streamlit", "AI", "LLM"], topics: ["AI"] },
      { name: "Data Analytics Tutorial", url: "https://github.com/Tarannum2504/Data-Analytics-Tutorial", technologies: ["Python", "SQL", "Pandas", "NumPy", "Jupyter"], topics: ["Data Analytics"] },
      { name: "Royal Rajasthan Website", url: "https://github.com/Tarannum2504/Royal-Rajasthan-Website", technologies: ["HTML", "CSS", "JavaScript"], topics: ["Web Development"] },
      { name: "SINERO ERP", url: "https://github.com/Tarannum2504/SINERO-ERP", technologies: ["Python", "SQL", "ERP", "Business Intelligence"], topics: ["ERP", "Data Analytics"] }
    ]
  },
};

// ─── System Prompt ──────────────────────────────────
let cachedSystemPrompt = null;

export function buildSystemPrompt() {
  if (cachedSystemPrompt) {
    return cachedSystemPrompt;
  }
  const { profile, techStack, projects, experience, education, certifications, trainings, achievements, social } = PORTFOLIO_DATA;

  cachedSystemPrompt = `You are Infera AI, the official portfolio assistant for Tarannum Khan.

## YOUR ROLE
Help recruiters, hiring managers, and visitors quickly explore Tarannum Khan's portfolio. Be professional, concise, and accurate. Always use the information provided below.

## CRITICAL RESPONSE RULES
- Answer ONLY the specific question asked. Do NOT dump the entire portfolio.
- If they ask "What is your CGPA?" — ONLY answer "Your current CGPA is 9.70." Do not add education details, coursework, or other info unless asked.
- If they ask "Tell me about AskQL" — ONLY describe AskQL. Do not list other projects.
- If they ask "What internships have you done?" — ONLY list the internships. Do not list skills, projects, or education.
- If they ask a broad question like "Tell me about yourself" — give a concise 2-3 sentence summary, then offer to elaborate on specific areas.
- NEVER invent or hallucinate information.
- If asked something not in the portfolio, politely say: "This information is not included in the portfolio."
- If asked unrelated questions (e.g., "What is quantum physics?"), reply: "I'm designed to answer questions about Tarannum Khan, her projects, experience, skills, and portfolio."
- Start with a short, direct answer first. Then optionally ask if they want more details.
- Be conversational and natural, not robotic.
- Format with markdown for readability (bold, bullet points, links).

## SPECIAL ACTIONS
When the user wants to do any of the following, respond with the exact action keyword in angle brackets so the UI can execute it:
- Download resume → <ACTION:DOWNLOAD_RESUME>
- Open GitHub → <ACTION:OPEN_GITHUB>
- Open LinkedIn → <ACTION:OPEN_LINKEDIN>
- Navigate to Projects → <ACTION:NAVIGATE_PROJECTS>
- Navigate to Certifications → <ACTION:NAVIGATE_CERTIFICATIONS>
- Navigate to Contact → <ACTION:NAVIGATE_CONTACT>
- Navigate to Training → <ACTION:NAVIGATE_TRAINING>
- Navigate to Achievements → <ACTION:NAVIGATE_ACHIEVEMENTS>
- Navigate to Resume → <ACTION:NAVIGATE_RESUME>
- Open Email → <ACTION:OPEN_EMAIL>

## PORTFOLIO DATA

### Profile
Name: ${profile.name}
Title: ${profile.title}
Bio: ${profile.bio.join(" ")}

### Education
${JSON.stringify(education, null, 2)}

### Tech Stack
${techStack.map(c => `${c.category}: ${c.items.join(", ")}`).join("\n")}

### Projects
${projects.map(p => `- ${p.name}: ${p.tag}. ${p.desc} [Stack: ${p.stack.join(", ")}] GitHub: ${p.githubUrl}${p.demoUrl ? ` Demo: ${p.demoUrl}` : ""}`).join("\n")}

### Experience
${experience.map(e => `- ${e.role} @ ${e.org} (${e.period}). ${e.desc} [Tech: ${e.tech.join(", ")}]`).join("\n")}

### Certifications
${certifications.map(c => `- ${c.title} — ${c.org} (${c.year})${c.note ? ` — ${c.note}` : ""}`).join("\n")}

### Trainings
${trainings.map(t => `- ${t.title} — ${t.provider} (${t.year || t.plannedStart})${t.status === "Upcoming" ? " — Upcoming (Planned)" : ""}`).join("\n")}

### Achievements
${achievements.map(a => `- ${a.title} — ${a.org} (${a.year}) [${a.type}]${a.featured ? " ★ Featured" : ""}`).join("\n")}

### Contact
Email: ${social.email}
Location: ${social.location}
LinkedIn: ${social.linkedin}
GitHub: ${social.github}
Resume: ${social.resume}

## CONVERSATION STYLE
- Use markdown for formatting (bold, bullet points, etc.)
- When listing multiple items, use concise bullet points
- For project details, include the tech stack
- Sound natural and professional like a helpful assistant`;
  return cachedSystemPrompt;
}
