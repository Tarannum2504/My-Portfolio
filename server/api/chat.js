import dns from "dns/promises";
import axios from "axios";
import { buildSystemPrompt, PORTFOLIO_DATA } from "../portfolioData.js";

/**
 * Safely parse the Hugging Face response, handling multiple formats.
 */
function parseHFResponse(result) {
  if (Array.isArray(result)) {
    if (result[0]?.generated_text) return result[0].generated_text;
    if (typeof result[0] === "string") return result[0];
  }
  if (result?.generated_text) return result.generated_text;
  if (result?.choices?.[0]?.message?.content) return result.choices[0].message.content;
  if (result?.choices?.[0]?.text) return result.choices[0].text;
  if (typeof result === "string") return result;
  return null;
}

/**
 * Local knowledge base fallback response
 */
function getLocalFallbackSummary() {
  return `I am currently having trouble connecting to my AI server. However, I can still provide you with information about Tarannum Khan's portfolio:

* **CGPA**: 9.70 at JIET Jodhpur (B.Tech in Artificial Intelligence & Machine Learning).
* **Skills**: SQL, Python, Power BI, Excel, Tableau, Pandas, MySQL, and Machine Learning.
* **Experience**: SIN Data Studio Intern and Data Analytics Virtual Intern at DecodeLabs.
* **Projects**: AskQL (AI SQL Generator), Retail Product Analytics, EduBus Tracker, InferaAI, ExploraAI, and Infera (Career Guide).
* **Contact**: Email (tarannum.k2504@gmail.com) and LinkedIn (https://linkedin.com/in/tarannum2504).

Feel free to ask details about any of the above, and I will be happy to answer!`;
}

/**
 * Maps a technology name to the structured demonstrates metadata key.
 */
function getMetadataKey(tech) {
  const t = tech.toLowerCase().trim();
  if (t === "sql") return "sql";
  if (t === "python") return "python";
  if (t === "streamlit") return "streamlit";
  if (t === "folium") return "folium";
  if (t === "excel") return "excel";
  if (t === "llm") return "llm";
  if (t === "analytics") return "analytics";
  if (t === "power bi") return "powerBI";
  if (t === "tableau") return "tableau";
  if (t === "eda") return "eda";
  if (t === "geospatial visualization" || t === "geospatial") return "geospatialVisualization";
  if (t === "visualization") return "visualization";
  if (t === "machine learning" || t === "ml") return "machineLearning";
  if (t === "artificial intelligence" || t === "ai") return "artificialIntelligence";
  return null;
}

/**
 * Extended details mapping for generic comparison and detailed view
 */
function getProjectExtendedDetails(proj) {
  const name = proj.name.toLowerCase();
  
  const baseDetails = {
    purpose: proj.tag || "Not specified",
    problemSolved: proj.desc.split('.')[0] + ".",
    techStack: proj.stack.join(", "),
    keyFeatures: proj.desc,
    aiUsage: proj.demonstrates?.artificialIntelligence ? "Yes, integrates LLMs / NLP" : "No AI/LLM integration",
    dataAnalytics: proj.demonstrates?.analytics ? "Yes, includes data cleaning, EDA, or visualization" : "No dedicated data analytics module",
    targetAudience: "General Users / Developers",
    bestSuitedRole: proj.bestFor?.join(" / ") || "Software Engineer"
  };

  if (name.includes("askql")) {
    baseDetails.targetAudience = "Business teams, non-technical managers, SQL beginners";
  } else if (name.includes("retail product")) {
    baseDetails.targetAudience = "Retail planners, category managers, inventory teams";
  } else if (name.includes("edubus")) {
    baseDetails.targetAudience = "School administration, transport operations managers";
  } else if (name.includes("inferaai") || name === "infera") {
    baseDetails.targetAudience = "Students, remote professionals, self-learners";
  } else if (name.includes("exploraai")) {
    baseDetails.targetAudience = "Students, aspiring data analysts";
  } else if (name.includes("career guide")) {
    baseDetails.targetAudience = "College students, job seekers";
  }

  return baseDetails;
}

/**
 * Direct matching classifier for progressive disclosure local queries
 */
/**
 * Detects the active context from the chat history.
 */
function detectContextFromHistory(history) {
  if (!history || history.length === 0) return null;

  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i].content.toLowerCase();
    
    // Check projects
    for (const proj of PORTFOLIO_DATA.projects) {
      const nameLower = proj.name.toLowerCase();
      if (msg.includes(nameLower) || 
          (nameLower.includes("career guide") && msg.includes("career guide")) ||
          (nameLower.includes("retail product") && msg.includes("retail product")) ||
          (nameLower.includes("edubus") && msg.includes("edubus")) ||
          (nameLower.includes("inferaai") && msg.includes("inferaai")) ||
          (nameLower.includes("exploraai") && msg.includes("exploraai"))) {
        return { type: "project", entity: proj.name, data: proj };
      }
    }

    // Check internships
    if (/\bsin\b/i.test(msg) || msg.includes("sinero")) {
      const exp = PORTFOLIO_DATA.experience.find(e => e.org.toLowerCase().includes("sin"));
      if (exp) return { type: "internship", entity: exp.org, data: exp };
    }
    if (/\bdecodelabs\b/i.test(msg) || msg.includes("decode labs")) {
      const exp = PORTFOLIO_DATA.experience.find(e => e.org.toLowerCase().includes("decode"));
      if (exp) return { type: "internship", entity: exp.org, data: exp };
    }

    // Check training
    for (const t of PORTFOLIO_DATA.trainings) {
      const titleLower = t.title.toLowerCase();
      if (msg.includes(titleLower) || (t.aliases && t.aliases.some(alias => msg.includes(alias.toLowerCase())))) {
        return { type: "training", entity: t.title, data: t };
      }
    }

    // Check certifications
    for (const c of PORTFOLIO_DATA.certifications) {
      const titleLower = c.title.toLowerCase();
      if (msg.includes(titleLower)) {
        return { type: "certification", entity: c.title, data: c };
      }
    }

    // Check achievements
    for (const a of PORTFOLIO_DATA.achievements) {
      const titleLower = a.title.toLowerCase();
      if (msg.includes(titleLower) || (a.aliases && a.aliases.some(alias => msg.includes(alias.toLowerCase())))) {
        return { type: "achievement", entity: a.title, data: a };
      }
    }

    // Check github repos
    for (const r of PORTFOLIO_DATA.github.repositories) {
      const titleLower = r.name.toLowerCase();
      if (msg.includes(titleLower)) {
        return { type: "github", entity: r.name, data: r };
      }
    }
  }

  return null;
}

/**
 * Direct matching classifier for progressive disclosure local queries
 */
function getLocalResponse(message, history = []) {
  const normalized = message.toLowerCase().trim().replace(/[?.,!]/g, "");

  const matches = (keywords) => {
    return keywords.some(keyword => {
      const escaped = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}e?s?\\b`, 'i');
      return regex.test(normalized);
    });
  };

  // ─── Check explicit mentions first to determine if we should bypass context ───
  const explicitlyMentionedProjects = [];
  for (const proj of PORTFOLIO_DATA.projects) {
    const nameLower = proj.name.toLowerCase();
    if (normalized.includes(nameLower) || 
        (nameLower.includes("career guide") && normalized.includes("career guide")) ||
        (nameLower.includes("retail product") && normalized.includes("retail product")) ||
        (nameLower.includes("edubus") && normalized.includes("edubus")) ||
        (nameLower.includes("inferaai") && normalized.includes("inferaai")) ||
        (nameLower.includes("exploraai") && normalized.includes("exploraai"))) {
      explicitlyMentionedProjects.push(proj);
    }
  }

  const context = detectContextFromHistory(history);
  const containsPronouns = matches(["it", "its", "this", "that", "the project", "the internship", "the certificate", "the training", "the repo", "the repository", "there", "then"]);
  const hasOtherEntity = 
    matches(["sin", "decodelabs", "sinero", "rhcsa", "nptel", "infosys", "forage", "genpact", "codefiesta", "prompt", "treasure", "jiet", "cgpa", "coursework"]) ||
    explicitlyMentionedProjects.length > 0;

  // ─── 0. PRONOUN / CONTEXT RESOLVER ───
  if (!hasOtherEntity && context) {
    // Project follow-up
    if (context.type === "project") {
      const proj = context.data;
      const isProjectFollowup = containsPronouns || matches([
        "technology", "technologies", "tech stack", "stack", "use", "uses", "built with",
        "demo", "live demo", "website", "link",
        "github", "source code", "code", "repo", "repository", "github link", "git link",
        "problem", "solve", "problem solved",
        "purpose", "why", "goal",
        "audience", "built for", "target audience", "user", "who uses",
        "best role", "best suited", "role",
        "description", "features", "about", "details"
      ]);

      if (isProjectFollowup) {
        // 1. GitHub Repository (must check FIRST to avoid generic link matching)
        if (matches(["github", "source code", "repo", "repository", "github link", "git link"])) {
          return {
            intent: "Projects",
            reply: `GitHub Repository:\n${proj.githubUrl}`,
            actions: []
          };
        }
        
        // 2. Live Demo
        if (matches(["demo", "live demo", "live", "deployment", "website", "link"])) {
          return {
            intent: "Projects",
            reply: proj.demoUrl 
              ? `Live Demo:\n${proj.demoUrl}` 
              : `**${proj.name}** does not have a live demo deployment. You can check the source code on GitHub.`,
            actions: []
          };
        }

        // 3. Technologies / Tech Stack
        if (matches(["technology", "technologies", "tech stack", "stack", "use", "uses", "built with"])) {
          return {
            intent: "Projects",
            reply: proj.stack.map(s => `• ${s}`).join("\n"),
            actions: []
          };
        }

        // 4. Problem Solved
        if (matches(["problem", "solve", "problem solved"])) {
          const ext = getProjectExtendedDetails(proj);
          return {
            intent: "Projects",
            reply: ext.problemSolved,
            actions: []
          };
        }

        // 5. Purpose
        if (matches(["purpose", "why", "goal"])) {
          const ext = getProjectExtendedDetails(proj);
          return {
            intent: "Projects",
            reply: ext.purpose,
            actions: []
          };
        }

        // 6. Target Audience
        if (matches(["built for", "target audience", "audience", "user", "who uses"])) {
          const ext = getProjectExtendedDetails(proj);
          return {
            intent: "Projects",
            reply: ext.targetAudience,
            actions: []
          };
        }

        // 7. Best Role
        if (matches(["best role", "best suited", "role"])) {
          const ext = getProjectExtendedDetails(proj);
          return {
            intent: "Projects",
            reply: ext.bestSuitedRole,
            actions: []
          };
        }

        // 8. Description / Features / About
        if (matches(["description", "features", "about", "details"])) {
          return {
            intent: "Projects",
            reply: proj.desc,
            actions: []
          };
        }
      }
    }

    // Internship follow-up
    if (context.type === "internship") {
      const exp = context.data;
      const isInternshipFollowup = containsPronouns || matches(["technology", "technologies", "tech stack", "stack", "use", "uses", "role", "duration", "period", "description", "details", "do", "did", "work", "responsibility", "responsibilities"]);
      if (isInternshipFollowup) {
        if (matches(["technology", "technologies", "tech stack", "stack", "use", "uses"])) {
          return {
            intent: "Internships",
            reply: `During my internship at **${exp.org}**, I worked with:\n\n${exp.tech.map(t => `• ${t}`).join("\n")}`,
            actions: []
          };
        }
        return {
          intent: "Internships",
          reply: `**${exp.role}** @ **${exp.org}** (${exp.period}):\n\n${exp.desc}`,
          actions: []
        };
      }
    }

    // Training follow-up
    if (context.type === "training") {
      const t = context.data;
      const isTrainingFollowup = containsPronouns || matches(["status", "start", "purpose", "learning", "skills", "achievement", "provider", "details"]);
      if (isTrainingFollowup) {
        if (t.status === "Upcoming") {
          return {
            intent: "Training",
            reply: `**${t.title}** (Upcoming):\n\n* **Planned Start**: ${t.plannedStart}\n* **Purpose**: ${t.purpose}\n* **Expected Learning**: ${t.expectedLearning.join(", ")}`,
            actions: []
          };
        }
        return {
          intent: "Training",
          reply: `**${t.title}** (Completed):\n\n* **Provider**: ${t.provider}\n* **Focus**: ${t.focus}\n* **Skills Learned**: ${t.skillsLearned.join(", ")}`,
          actions: []
        };
      }
    }

    // Certification follow-up
    if (context.type === "certification") {
      const c = context.data;
      const isCertFollowup = containsPronouns || matches(["provider", "year", "details"]);
      if (isCertFollowup) {
        return {
          intent: "Certifications",
          reply: `**${c.title}**:\n\n* **Provider**: ${c.org}\n* **Year**: ${c.year}${c.note ? `\n* **Note**: ${c.note}` : ""}`,
          actions: []
        };
      }
    }

    // Achievement follow-up
    if (context.type === "achievement") {
      const a = context.data;
      const isAchFollowup = containsPronouns || matches(["category", "year", "description", "significance", "details"]);
      if (isAchFollowup) {
        return {
          intent: "Achievements",
          reply: `**${a.title}**:\n\n* **Category**: ${a.category}\n* **Year**: ${a.year}\n* **Description**: ${a.description}\n* **Significance**: ${a.significance}`,
          actions: []
        };
      }
    }
  }

  // ─── 0. RECRUITER / SECTIONS TOUR / PROBLEM SOLVING / JOURNEY / DIFFERENTIATOR ───
  if (matches(["impress a recruiter", "impress recruiter", "impress recruiters", "which project would impress", "for a recruiter", "recommendation", "recommend", "best project"])) {
    if (matches(["data analyst", "data analytics", "business intelligence", "bi"])) {
      return {
        intent: "Recruiter Recommendation",
        reply: `For a **Data Analyst** or **BI** role, I recommend exploring:

1. **Retail Product Analytics** — Demonstrates end-to-end data cleaning, SQL query modeling, exploratory data analysis (EDA), and interactive sales visualizations.
2. **AskQL** — Shows how SQL queries can be generated from natural language using LLM integration, making databases accessible to business users.

Would you like details about one of these projects?`,
        actions: []
      };
    }
    if (matches(["ai engineer", "ai engineering", "artificial intelligence", "ai"])) {
      return {
        intent: "Recruiter Recommendation",
        reply: `For an **AI Engineer** role, I recommend exploring:

1. **AskQL** — Translates natural language questions to SQL queries using LLM integration, presenting a clean Streamlit interface.
2. **InferaAI** — Implements an AI study companion with text processing and interactive features.

Would you like to know more about the AI integration in AskQL?`,
        actions: []
      };
    }
    return {
      intent: "Recruiter Recommendation",
      reply: `Depending on your focus area, I recommend:

* **For Data Analytics / BI**: Explore **Retail Product Analytics** first. It demonstrates structured sales modeling, price elasticities, and interactive data visualization.
* **For AI Engineering**: Explore **AskQL** first. It connects natural language user inputs to SQL databases using Large Language Models.

Which role is most relevant to your search?`,
      actions: []
    };
  }

  if (matches(["five minute tour", "5 minute tour", "only five minutes", "5 minutes", "five minutes", "explore first"])) {
    return {
      intent: "Five Minute Tour",
      reply: `Here is a guided 5-minute tour of my portfolio:

1. **About** — Read my background, studies, and career objectives.
2. **GitHub Activity** — Review my coding consistency and public contributions.
3. **Retail Product Analytics** — Check out my data analytics showcase.
4. **AskQL** — Explore my AI-integrated natural language SQL tool.
5. **Experience** — Look at my SIN Data Studio and DecodeLabs internships.
6. **Certifications** — Browse my NPTEL, Infosys, and Forage certifications.

Where would you like to start your tour?`,
      actions: []
    };
  }

  if (matches(["problem solving", "problem-solving", "problem solving ability", "represents your problem-solving"])) {
    return {
      intent: "Problem Solving",
      reply: `**AskQL** best represents my problem-solving ability.

* **Problem**: Non-technical team members often cannot write raw SQL queries, creating a bottleneck for business intelligence.
* **Solution**: An AI-powered translation interface that safely converts natural language inputs into valid database SQL queries.
* **Technologies**: Python, SQL, Streamlit, and Large Language Models.
* **Impact**: Eliminates SQL bottlenecks, allowing business teams to query retail tables directly in real-time.

Would you like to explore the source code or see a comparison with my other projects?`,
      actions: []
    };
  }

  if (matches(["journey", "evolved", "journey evolved"])) {
    return {
      intent: "Career Journey",
      reply: `My technical journey has evolved chronologically:

Learning Programming
↓
EDA & Analytics Projects
↓
Interactive Dashboards
↓
AI-assisted Applications
↓
Career-focused Projects

Would you like to know more about my studies at JIET Jodhpur or my internships?`,
      actions: []
    };
  }

  if (matches(["different", "portfolio different", "makes your portfolio different"])) {
    return {
      intent: "Portfolio Differentiator",
      reply: `What makes my portfolio different is the integration of:

* **Data Analytics**: End-to-end sales modeling, EDA, and dashboards.
* **Real-world projects**: Practical problem-solving tools like school bus routing and ERP integrations.
* **AI-assisted applications**: Combining LLM interactions with structured relational databases.
* **Business Intelligence**: Visualizations and data reporting.
* **Practical problem solving**: Focused solutions to clear business problems.
* **Interactive demos**: Deploying functional web interfaces so recruiters can test features live.

Would you like to compare any of my AI and analytics projects?`,
      actions: []
    };
  }

  // ─── 1. SPECIFIC PROJECT ───
  const matchedProjects = [];
  for (const proj of PORTFOLIO_DATA.projects) {
    const nameLower = proj.name.toLowerCase();
    const cleanMsg = normalized.replace(/\bcompare\b/gi, "").replace(/\bvs\b/gi, "").replace(/\bdifference\b/gi, "");
    if (cleanMsg.includes(nameLower) || 
        (nameLower.includes("career guide") && cleanMsg.includes("career guide")) ||
        (nameLower.includes("retail product") && cleanMsg.includes("retail product")) ||
        (nameLower.includes("edubus") && cleanMsg.includes("edubus")) ||
        (nameLower.includes("inferaai") && cleanMsg.includes("inferaai")) ||
        (nameLower.includes("exploraai") && cleanMsg.includes("exploraai"))) {
      matchedProjects.push(proj);
    }
  }

  if (matchedProjects.length === 0 && matches(["project", "projects"])) {
    if (matches(["aws", "gcp", "azure", "salesforce", "oracle", "angular", "vue", "django", "laravel", "spring", "c++", "c#", "rust", "go", "golang"])) {
      return {
        intent: "Projects",
        reply: "I don't currently have that information in my portfolio.",
        actions: []
      };
    }
  }

  if (matchedProjects.length === 1 && !/\b(compare|vs|difference|better)\b/i.test(normalized)) {
    const proj = matchedProjects[0];
    const demoLine = proj.demoUrl ? `\n* **Live Demo**: ${proj.demoUrl}` : "";
    return {
      intent: "Projects",
      reply: `Here are the details for **${proj.name}** (${proj.tag}):

* **Description**: ${proj.desc}
* **Tech Stack**: ${proj.stack.join(", ")}
* **GitHub**: ${proj.githubUrl}${demoLine}

Would you like to:

• View the GitHub repository
• Open the live demo
• Compare it with another project`,
      actions: []
    };
  }

  // ─── 2. PROJECT COMPARISON ───
  if (/\b(compare|vs|difference|better)\b/i.test(normalized)) {
    const compareProjects = [];
    if (context && context.type === "project") {
      compareProjects.push(context.data);
    }
    for (const proj of PORTFOLIO_DATA.projects) {
      const nameLower = proj.name.toLowerCase();
      if (normalized.includes(nameLower) || 
          (nameLower.includes("career guide") && normalized.includes("career guide")) ||
          (nameLower.includes("retail product") && normalized.includes("retail product")) ||
          (nameLower.includes("edubus") && normalized.includes("edubus")) ||
          (nameLower.includes("inferaai") && normalized.includes("infera")) ||
          (nameLower.includes("exploraai") && normalized.includes("explora"))) {
        if (!compareProjects.some(p => p.name === proj.name)) {
          compareProjects.push(proj);
        }
      }
    }
    
    if (compareProjects.length >= 2) {
      const p1 = compareProjects[0];
      const p2 = compareProjects[1];
      const ext1 = getProjectExtendedDetails(p1);
      const ext2 = getProjectExtendedDetails(p2);
      
      const table = `| Field | ${p1.name} | ${p2.name} |
| :--- | :--- | :--- |
| **Purpose** | ${ext1.purpose} | ${ext2.purpose} |
| **Problem Solved** | ${ext1.problemSolved} | ${ext2.problemSolved} |
| **Tech Stack** | ${ext1.techStack} | ${ext2.techStack} |
| **Key Features** | ${ext1.keyFeatures} | ${ext2.keyFeatures} |
| **AI Usage** | ${ext1.aiUsage} | ${ext2.aiUsage} |
| **Data Analytics** | ${ext1.dataAnalytics} | ${ext2.dataAnalytics} |
| **Target Audience** | ${ext1.targetAudience} | ${ext2.targetAudience} |
| **Best Suited Role** | ${ext1.bestSuitedRole} | ${ext2.bestSuitedRole} |
| **GitHub** | ${p1.githubUrl} | ${p2.githubUrl} |
| **Live Demo** | ${p1.demoUrl ? p1.demoUrl : "N/A"} | ${p2.demoUrl ? p2.demoUrl : "N/A"} |`;

      const aiProjects = compareProjects.filter(p => p.bestFor?.includes("AI Engineer"));
      const daProjects = compareProjects.filter(p => p.bestFor?.includes("Data Analyst"));
      
      let recSection = "\n\n**Recommendation**\n";
      if (aiProjects.length > 0) {
        const bestAI = aiProjects.find(p => p.bestFor.length === 1) || aiProjects[0];
        recSection += `\nFor AI Engineering:\n✓ ${bestAI.name}`;
      }
      if (daProjects.length > 0) {
        const bestDA = daProjects.find(p => p.bestFor.length === 1) || daProjects[0];
        recSection += `\nFor Data Analytics:\n✓ ${bestDA.name}`;
      }

      return {
        intent: "Projects",
        reply: `### Comparison: ${p1.name} vs ${p2.name}\n\n${table}${recSection}\n\nWould you like to:\n\n• Open GitHub\n• Open Live Demo\n• Compare another project`,
        actions: ["NAVIGATE_PROJECTS"]
      };
    }
  }

  // ─── 3. PROJECT RECOMMENDATION ───
  // Special ML / SQL Queries
  if (matches(["know sql", "do you know sql"])) {
    return {
      intent: "Skills",
      reply: "Yes, I know SQL. I use it extensively for data querying, analysis, and database management in my projects.",
      actions: []
    };
  }
  if (matches(["know machine learning", "do you know machine learning", "know ml", "do you know ml"])) {
    return {
      intent: "Skills",
      reply: "Yes. I have studied Machine Learning as part of my B.Tech curriculum and understand core ML concepts and models. My current portfolio primarily focuses on Data Analytics and AI-assisted applications rather than dedicated Machine Learning projects.",
      actions: []
    };
  }

  if (/\b(recommend|best|first|top|uses|demonstrates|search|find|show me|should i see|sql|python|streamlit|folium|pandas|excel|plotly|matplotlib|power bi|tableau|machine learning|ml|ai|llm|geospatial visualization)\b/i.test(normalized) && 
      /\b(project|projects)\b/i.test(normalized)) {
    
    const techRegex = /\b(geospatial visualization|machine learning|artificial intelligence|power bi|sql|python|streamlit|folium|pandas|excel|plotly|matplotlib|tableau|eda|ml|ai|llm)\b/i;
    const techMatch = normalized.match(techRegex);
    
    if (techMatch) {
      const techName = techMatch[1].toLowerCase();
      const metadataKey = getMetadataKey(techName);
      
      if (metadataKey) {
        const results = PORTFOLIO_DATA.projects.filter(proj => proj.demonstrates?.[metadataKey] === true);
        
        if (results.length > 0) {
          const list = results.map(r => `• ${r.name}`).join("\n");
          return {
            intent: "Projects",
            reply: `The project(s) demonstrating or using **${techMatch[1].toUpperCase()}** are:\n\n${list}`,
            actions: ["NAVIGATE_PROJECTS"]
          };
        } else {
          return {
            intent: "Projects",
            reply: `None of Tarannum Khan's current projects demonstrate **${techMatch[1].toUpperCase()}**. You can check her GitHub profile for other works.`,
            actions: ["OPEN_GITHUB"]
          };
        }
      }
    }
    
    if (/\b(data analyst|analytics|data analysis)\b/i.test(normalized)) {
      const results = PORTFOLIO_DATA.projects.filter(proj => proj.bestFor?.includes("Data Analyst"));
      const list = results.map(r => `• ${r.name}`).join("\n");
      return {
        intent: "Projects",
        reply: `The best projects for a **Data Analyst** role are:\n\n${list}\n\nI highly recommend starting with **Retail Product Analytics**, which focuses on retail data cleaning, exploratory analysis (EDA), and pricing visualizations.`,
        actions: ["NAVIGATE_PROJECTS"]
      };
    }
    
    if (/\b(ai|ml|machine learning|artificial intelligence|ai engineer)\b/i.test(normalized)) {
      const results = PORTFOLIO_DATA.projects.filter(proj => proj.bestFor?.includes("AI Engineer"));
      const list = results.map(r => `• ${r.name}`).join("\n");
      return {
        intent: "Projects",
        reply: `The best projects for an **AI Engineer** role are:\n\n${list}\n\nI highly recommend starting with **AskQL**, which translates natural language to database SQL using LLM integration.`,
        actions: ["NAVIGATE_PROJECTS"]
      };
    }
    
    if (/\b(first|best|top|favorite|recommend)\b/i.test(normalized)) {
      return {
        intent: "Projects",
        reply: `You should see **AskQL** first. It is my top recommendation because it connects LLM capabilities with database access, presenting a clean Streamlit interface.`,
        actions: ["NAVIGATE_PROJECTS"]
      };
    }
  }

  // ─── 4. PROJECT LIST ───
  if (matches(["projects", "what did you build", "show projects", "how many projects"])) {
    const list = PORTFOLIO_DATA.projects.map(p => `• ${p.name}`).join("\n");
    return {
      intent: "Projects",
      reply: `I have developed ${PORTFOLIO_DATA.projects.length} major projects:\n\n${list}`,
      actions: ["NAVIGATE_PROJECTS"]
    };
  }

  // ─── 5. INTERNSHIP AVAILABILITY ───
  if (matches(["looking for internship", "looking for internships", "internship availability", "seeking internship", "seeking internships", "seeking opportunities"])) {
    return {
      intent: "Internship Availability",
      reply: `I have completed my internships and am currently seeking Data Analyst internship and full-time opportunities where I can apply my skills in analytics, SQL, Python, Power BI, and business intelligence.`,
      actions: []
    };
  }

  // ─── 6. INTERNSHIP EXPERIENCE ROUTING ───
  if (matches(["intern", "internship", "work", "experience", "job", "sin", "decodelabs", "sinero"])) {
    // A. Comparison
    if (matches(["compare", "vs", "difference", "comparison"])) {
      const table = `| Field | SIN Education & Technology | DecodeLabs |
| :--- | :--- | :--- |
| **Organization** | SIN Education & Technology Pvt. Ltd. | DecodeLabs |
| **Role** | SIN Data Studio Intern | Data Analytics Virtual Intern |
| **Duration** | Present | Past |
| **Focus Area** | ERP, business solutions, and generative AI features | Data analytics, dashboard building, and business insights |
| **Technologies** | Python, SQL, ERP, Business Intelligence, Generative AI | Python, SQL, Data Analysis, Dashboarding |
| **Skills Learned** | ERP product development, enterprise analytics, GenAI modules | Data cleaning, dashboarding, structured data insights |
| **Best Career Relevance** | AI Engineer / Business Analyst / ERP Developer | Data Analyst / Business Intelligence Analyst |`;

      return {
        intent: "Internships",
        reply: `### Internship Comparison: SIN vs DecodeLabs\n\n${table}`,
        actions: []
      };
    }
    
    // B. Recommendation for Data Analyst
    if (matches(["relevant", "relevance", "recommend", "best"])) {
      if (matches(["data analyst", "data analytics"])) {
        return {
          intent: "Internships",
          reply: `DecodeLabs is more directly aligned with Data Analytics because it focused on Python, SQL, dashboarding, and analytical problem-solving.

SIN Education demonstrates ERP systems, business intelligence, and real-world product development experience.`,
          actions: []
        };
      }
    }
    
    // C. Internship Domain Questions
    if (matches(["domain", "related to", "focus on", "involved", "involve", "about", "analytics", "ai", "erp", "business intelligence"])) {
      if (matches(["data analytics", "analytics"])) {
        return {
          intent: "Internships",
          reply: `My DecodeLabs Data Analytics Virtual Internship was primarily focused on Data Analytics. I worked on Python, SQL, dashboard development, and deriving business insights from structured datasets.

My current SIN Education internship also includes analytics and business intelligence, but its primary focus is ERP product development.`,
          actions: []
        };
      }
      if (matches(["ai", "artificial intelligence", "generative ai", "genai"])) {
        return {
          intent: "Internships",
          reply: `My current SIN Education internship involved Generative AI and AI-powered business solutions. I contributed to ERP module development, ERP analytics, and AI features on the SINERO platform.`,
          actions: []
        };
      }
      if (matches(["erp"])) {
        return {
          intent: "Internships",
          reply: `My current SIN Education internship is directly related to ERP. I contribute to product development, ERP modules, analytics features, and AI-powered business solutions on the SINERO business management platform.`,
          actions: []
        };
      }
      if (matches(["business intelligence", "bi"])) {
        return {
          intent: "Internships",
          reply: `My current SIN Education internship involved Business Intelligence, where I contribute to analytics features and ERP business management solutions on the SINERO platform.`,
          actions: []
        };
      }
    }
    
    // D. Internship Technologies
    if (matches(["tech", "technology", "technologies", "stack", "tech stack", "tool", "tools"])) {
      const isSin = matches(["sin", "education & technology", "sinero"]);
      const isDecode = matches(["decodelabs", "decode labs"]);
      
      if (isSin) {
        return {
          intent: "Internships",
          reply: `During my SIN Education internship, I worked with:

• Python
• SQL
• ERP (SINERO)
• Business Intelligence
• Generative AI`,
          actions: []
        };
      }
      if (isDecode) {
        return {
          intent: "Internships",
          reply: `During my DecodeLabs internship, I worked with:

• Python
• SQL
• Data Analysis
• Dashboarding`,
          actions: []
        };
      }
      return {
        intent: "Internships",
        reply: `Across my internships, I have worked with:

* **SIN Education**: Python, SQL, ERP (SINERO), Business Intelligence, Generative AI
* **DecodeLabs**: Python, SQL, Data Analysis, Dashboarding`,
        actions: []
      };
    }
    
    // E. Internship Specific Details
    const isSin = matches(["sin", "education & technology", "sinero"]);
    const isDecode = matches(["decodelabs", "decode labs"]);
    
    if (isSin) {
      const exp = PORTFOLIO_DATA.experience.find(e => e.org.includes("SIN"));
      return {
        intent: "Internships",
        reply: `**${exp.role}** at **${exp.org}** (${exp.period}):\n\n* **Description**: ${exp.desc}\n* **Technologies**: ${exp.tech.join(", ")}`,
        actions: []
      };
    }
    
    if (isDecode) {
      const exp = PORTFOLIO_DATA.experience.find(e => e.org.includes("Decode"));
      return {
        intent: "Internships",
        reply: `**${exp.role}** at **${exp.org}** (${exp.period}):\n\n* **Description**: ${exp.desc}\n* **Technologies**: ${exp.tech.join(", ")}`,
        actions: []
      };
    }
    
    // F. General Internship List
    const list = PORTFOLIO_DATA.experience.map(e => `* **${e.role}** (${e.period})`).join("\n");
    return {
      intent: "Internships",
      reply: `Tarannum Khan has completed the following internships:\n\n${list}\n\nIf you'd like to know more about a specific internship, let me know!`,
      actions: []
    };
  }

  // ─── 7. CERTIFICATION SPECIFIC ───
  if (matches(["certification", "certificate", "credentials"])) {
    const matchedCert = PORTFOLIO_DATA.certifications.find(c => {
      const titleLower = c.title.toLowerCase();
      return normalized.includes(titleLower) || 
             (titleLower.includes("emotional intelligence") && normalized.includes("emotional")) ||
             (titleLower.includes("ethics") && normalized.includes("ethics")) ||
             (titleLower.includes("c programming") && normalized.includes("c programming")) ||
             (titleLower.includes("mysql") && normalized.includes("mysql")) ||
             (titleLower.includes("visualization") && normalized.includes("visualization"));
    });
    
    if (!matchedCert && matches(["aws", "gcp", "azure", "salesforce", "oracle", "scrum", "pmp", "ccna", "google", "microsoft"])) {
      return {
        intent: "Certifications",
        reply: "I don't currently have that information in my portfolio.",
        actions: []
      };
    }
    
    if (matchedCert) {
      const noteStr = matchedCert.note ? ` (${matchedCert.note})` : "";
      return {
        intent: "Certifications",
        reply: `**${matchedCert.title}**:\n* **Provider**: ${matchedCert.org}\n* **Year**: ${matchedCert.year}${noteStr}`,
        actions: ["NAVIGATE_CERTIFICATIONS"]
      };
    }
    
    const list = PORTFOLIO_DATA.certifications.map(c => `* ${c.title}`).join("\n");
    return {
      intent: "Certifications",
      reply: `Tarannum Khan holds the following certifications:\n\n${list}\n\nIf you'd like to know more about a specific certification, let me know!`,
      actions: ["NAVIGATE_CERTIFICATIONS"]
    };
  }

  // ─── 8. GITHUB SPECIFIC ───
  if (matches(["github", "repos", "repositories", "repository", "username", "account", "git link", "git profile", "activity", "git", "commit", "commits", "follower", "followers", "star", "stars", "contribution", "contributions"])) {
    
    // A. GitHub Activity
    if (matches(["activity"])) {
      return {
        intent: "GitHub",
        reply: `My GitHub activity is displayed through the GitHub Contribution Calendar on the portfolio homepage, showcasing my public coding consistency and contributions.

For the latest repositories, commits, and contribution history, visit:

https://github.com/Tarannum2504`,
        actions: ["OPEN_GITHUB"]
      };
    }

    // B. GitHub Username
    if (matches(["username", "account"])) {
      return {
        intent: "GitHub",
        reply: `My GitHub username is Tarannum2504.

GitHub:
https://github.com/Tarannum2504`,
        actions: ["OPEN_GITHUB"]
      };
    }

    // C. GitHub Profile
    if (matches(["profile", "git profile"])) {
      return {
        intent: "GitHub",
        reply: `GitHub Profile:
https://github.com/Tarannum2504

You can explore my repositories, contribution activity, and recent work there.`,
        actions: ["OPEN_GITHUB"]
      };
    }

    // D. Favorite Repository
    if (matches(["favorite"])) {
      return {
        intent: "GitHub",
        reply: `My favorite repository is AskQL.

Reason:
It combines AI, SQL, and Streamlit to solve a real-world problem through natural language to SQL generation and best represents my interests in Data Analytics and AI.

Would you like to know why I consider it my flagship project?`,
        actions: ["OPEN_GITHUB"]
      };
    }

    // E. GitHub Statistics
    if (matches(["commits", "stars", "followers", "contributions", "commit history"])) {
      return {
        intent: "GitHub",
        reply: `I don't maintain live GitHub statistics inside my portfolio.

For the latest commits, stars, followers, and contribution activity, please visit:

https://github.com/Tarannum2504`,
        actions: ["OPEN_GITHUB"]
      };
    }

    // F. Repository Search queries
    if (matches(["use", "uses", "related to", "show", "list", "which", "what"])) {
      if (matches(["python"])) {
        const results = PORTFOLIO_DATA.github.repositories.filter(repo => 
          repo.technologies.some(tech => tech.toLowerCase() === "python")
        );
        const list = results.map(r => `• ${r.name}`).join("\n");
        return {
          intent: "GitHub",
          reply: `The repositories using **Python** are:\n\n${list}`,
          actions: ["OPEN_GITHUB"]
        };
      }
      if (matches(["sql"])) {
        const results = PORTFOLIO_DATA.github.repositories.filter(repo => 
          repo.technologies.some(tech => tech.toLowerCase() === "sql")
        );
        const list = results.map(r => `• ${r.name}`).join("\n");
        return {
          intent: "GitHub",
          reply: `The repositories using **SQL** are:\n\n${list}`,
          actions: ["OPEN_GITHUB"]
        };
      }
      if (matches(["data analytics", "analytics"])) {
        const results = PORTFOLIO_DATA.github.repositories.filter(repo => 
          repo.topics.some(t => t.toLowerCase() === "data analytics")
        );
        const list = results.map(r => `• ${r.name}`).join("\n");
        return {
          intent: "GitHub",
          reply: `The repositories related to **Data Analytics** are:\n\n${list}`,
          actions: ["OPEN_GITHUB"]
        };
      }
    }

    // G. Repository List (Fallback general repositories query)
    const list = PORTFOLIO_DATA.github.repositories.map(r => `• ${r.name}`).join("\n");
    return {
      intent: "GitHub",
      reply: `Here are some of my repositories:

${list}

You can explore them on GitHub:
https://github.com/Tarannum2504`,
      actions: ["OPEN_GITHUB"]
    };
  }

  // ─── 9. EDUCATION SPECIFIC ───
  if (matches(["education", "college", "university", "jiet", "study", "btech", "degree", "cgpa", "coursework", "grades", "marks", "percentage", "score", "subject", "subjects", "course", "courses"])) {
    if (matches(["studying in", "which college", "which university", "where do you study", "where are you studying"])) {
      return {
        intent: "Education",
        reply: "I am currently pursuing my Bachelor of Technology in Artificial Intelligence & Machine Learning at JIET Jodhpur.",
        actions: []
      };
    }
    if (matches(["coursework", "courses", "subjects"])) {
      const list = PORTFOLIO_DATA.education.coursework.map(c => `* ${c}`).join("\n");
      return {
        intent: "Education",
        reply: `Tarannum Khan's coursework includes:\n\n${list}\n\nWould you like to know more about any specific subject?`,
        actions: []
      };
    }
    if (matches(["cgpa", "grades", "marks", "percentage", "score"])) {
      return {
        intent: "Education",
        reply: `Tarannum Khan's current CGPA is **9.70** at JIET Jodhpur.`,
        actions: []
      };
    }
    return {
      intent: "Education",
      reply: `• **Degree**: Bachelor of Technology in Artificial Intelligence & Machine Learning\n• **College**: JIET Jodhpur\n• **Current Year**: Third Year\n• **Current CGPA**: 9.70`,
      actions: []
    };
  }

  // ─── 10. SKILLS ───
  if (matches(["skills", "technologies", "tech stack", "languages", "programming", "databases", "tools", "what do you know", "what can you use", "proficient", "library", "libraries", "framework", "frameworks"])) {
    if (matches(["programming language", "programming languages", "languages do you know", "languages you know", "what languages", "which languages"])) {
      return {
        intent: "Skills",
        reply: `• Python\n• Java\n• C\n\nI also use SQL extensively for analytics and database management.`,
        actions: []
      };
    }
    if (matches(["library", "libraries", "framework", "frameworks"])) {
      return {
        intent: "Skills",
        reply: `• Pandas\n• NumPy\n• SciPy\n• Scikit-Learn\n• Plotly\n• Matplotlib`,
        actions: []
      };
    }
    if (matches(["database", "databases"])) {
      return {
        intent: "Skills",
        reply: `• MySQL\n• SQLite\n• RDBMS`,
        actions: []
      };
    }
    if (matches(["tool", "tools"])) {
      return {
        intent: "Skills",
        reply: `• SQL\n• Microsoft Excel 365\n• Power BI\n• Tableau\n• Jupyter Notebook\n• Google Colab\n• VS Code\n• Git\n• GitHub`,
        actions: []
      };
    }
    if (matches(["complete", "full", "all", "complete tech stack"])) {
      return {
        intent: "Skills",
        reply: `Here is the complete tech stack for Tarannum Khan:

* **Analytics & BI**: SQL, Microsoft Excel 365, Power BI, Tableau
* **Programming**: Python, Java, C
* **Libraries**: Pandas, NumPy, SciPy, Scikit-Learn, Matplotlib, Plotly
* **Databases**: MySQL, SQLite, RDBMS
* **Tools**: Git, GitHub, Streamlit, Jupyter Notebook, VS Code, Google Colab, Anaconda`,
        actions: []
      };
    }
    return {
      intent: "Skills",
      reply: `Tarannum Khan has skills in the following primary categories:\n\n• Analytics & BI\n• Programming\n• Databases\n\nWould you like my complete tech stack?`,
      actions: []
    };
  }

  // ─── 11. ACHIEVEMENTS ───
  if (matches(["achievements", "awards", "competition", "hackathon", "winner", "scholarship", "genpact", "codefiesta", "code fiesta", "prompt war", "prompt engineering", "treasure hunt", "ideathon", "tata crucible", "emotional intelligence", "excel training", "academic", "recognition", "award", "scholarships", "competitions", "hackathons"])) {
    // A. Category-based Filtering (checked first if not mentioning specific details/names)
    const mentionsSpecific = matches(["genpact", "prompt", "codefiesta", "code fiesta", "crucible", "treasure", "emotional", "excel", "ideathon"]);
    
    if (!mentionsSpecific) {
      if (matches(["scholarship", "scholarships"])) {
        const filtered = PORTFOLIO_DATA.achievements.filter(ach => ach.category === "Scholarship");
        const list = filtered.map(ach => `• ${ach.title}`).join("\n");
        return {
          intent: "Achievements",
          reply: `Tarannum Khan has the following scholarship(s):\n\n${list}`,
          actions: ["NAVIGATE_ACHIEVEMENTS"]
        };
      }

      if (matches(["competition", "competitions"])) {
        const filtered = PORTFOLIO_DATA.achievements.filter(ach => ach.category === "Competition");
        const list = filtered.map(ach => `• ${ach.title}`).join("\n");
        return {
          intent: "Achievements",
          reply: `Tarannum Khan has participated in the following competition(s):\n\n${list}`,
          actions: ["NAVIGATE_ACHIEVEMENTS"]
        };
      }

      if (matches(["hackathon", "hackathons"])) {
        const filtered = PORTFOLIO_DATA.achievements.filter(ach => ach.category === "Hackathon");
        const list = filtered.map(ach => `• ${ach.title}`).join("\n");
        return {
          intent: "Achievements",
          reply: `Tarannum Khan has participated in the following hackathon(s):\n\n${list}`,
          actions: ["NAVIGATE_ACHIEVEMENTS"]
        };
      }

      if (matches(["academic"])) {
        const filtered = PORTFOLIO_DATA.achievements.filter(ach => ach.category === "Academic");
        const list = filtered.map(ach => `• ${ach.title}`).join("\n");
        return {
          intent: "Achievements",
          reply: `Tarannum Khan has the following academic achievement(s):\n\n${list}`,
          actions: ["NAVIGATE_ACHIEVEMENTS"]
        };
      }

      if (matches(["award", "awards", "recognition"])) {
        const filtered = PORTFOLIO_DATA.achievements.filter(ach => ach.category === "Recognition");
        const list = filtered.map(ach => `• ${ach.title}`).join("\n");
        return {
          intent: "Achievements",
          reply: `Tarannum Khan has received the following recognition(s):\n\n${list}`,
          actions: ["NAVIGATE_ACHIEVEMENTS"]
        };
      }
    }

    // B. Specific Achievement Handler (Exact or Alias Match)
    const matchedAch = PORTFOLIO_DATA.achievements.find(ach => {
      const titleLower = ach.title.toLowerCase();
      if (normalized.includes(titleLower)) return true;
      if (ach.aliases && ach.aliases.some(alias => normalized.includes(alias.toLowerCase()))) {
        return true;
      }
      return false;
    });

    if (matchedAch) {
      return {
        intent: "Achievements",
        reply: `**Title**: ${matchedAch.title}
**Category**: ${matchedAch.category}
**Year**: ${matchedAch.year}
**Description**: ${matchedAch.description}
**Significance**: ${matchedAch.significance}

Would you like to know more about another achievement?`,
        actions: ["NAVIGATE_ACHIEVEMENTS"]
      };
    }

    // C. General fallback (What achievements do you have?) - Names only
    const list = PORTFOLIO_DATA.achievements.map(ach => `• ${ach.title}`).join("\n");
    return {
      intent: "Achievements",
      reply: `Tarannum Khan has the following achievements:\n\n${list}`,
      actions: ["NAVIGATE_ACHIEVEMENTS"]
    };
  }

  // ─── 12. TRAININGS ───
  if (matches(["trainings", "training", "summer training", "rhcsa", "excel training", "school of ai", "red hat", "redhat", "excel 365", "analytics training"])) {
    
    // A. Specific Training lookup (Exact or Alias Match)
    const matchedTraining = PORTFOLIO_DATA.trainings.find(t => {
      const titleLower = t.title.toLowerCase();
      if (normalized.includes(titleLower)) return true;
      if (t.aliases && t.aliases.some(alias => normalized.includes(alias.toLowerCase()))) {
        return true;
      }
      return false;
    });

    if (!matchedTraining && matches(["gcp", "aws", "azure", "salesforce", "oracle", "scrum", "pmp", "java", "google", "microsoft"])) {
      return {
        intent: "Training",
        reply: "I don't currently have that information in my portfolio.",
        actions: []
      };
    }

    if (matchedTraining) {
      if (matchedTraining.status === "Upcoming") {
        return {
          intent: "Training",
          reply: `**Title**: ${matchedTraining.title}
**Status**: Upcoming
**Type**: Planned Training
**Planned Start**: ${matchedTraining.plannedStart}
**Purpose**: ${matchedTraining.purpose}
**Expected Learning**: ${matchedTraining.expectedLearning.join(", ")}

Would you like to know more about another training program?`,
          actions: ["NAVIGATE_TRAINING"]
        };
      } else {
        const achievementStr = matchedTraining.achievement ? `\n**Achievement**: ${matchedTraining.achievement}` : "";
        return {
          intent: "Training",
          reply: `**Title**: ${matchedTraining.title}
**Status**: ${matchedTraining.status}
**Year**: ${matchedTraining.year}
**Provider**: ${matchedTraining.provider}
**Focus**: ${matchedTraining.focus}
**Skills Learned**: ${matchedTraining.skillsLearned.join(", ")}${achievementStr}

Would you like to view the certificate?`,
          actions: ["NAVIGATE_TRAINING"]
        };
      }
    }

    // B. General fallback - List names and status vertically
    const formattedList = PORTFOLIO_DATA.trainings.map(t => {
      let desc = "";
      if (t.status === "Completed") {
        desc = t.achievement ? `Completed – ${t.achievement}` : `Completed – ${t.year}`;
      } else {
        desc = t.status;
      }
      return `• ${t.title} (${desc})`;
    }).join("\n\n");

    return {
      intent: "Training",
      reply: `I have completed or planned the following training programs:

${formattedList}`,
      actions: ["NAVIGATE_TRAINING"]
    };
  }

  // ─── 13. RESUME ───
  if (matches(["resume", "cv", "download resume", "get resume", "resume pdf"])) {
    return {
      intent: "Resume",
      reply: `Yes.

You can download my latest resume here.

[Download Resume](/RESUME.pdf)`,
      actions: ["DOWNLOAD_RESUME"]
    };
  }

  // ─── 14. CONTACT / EMAIL / LINKEDIN / PHONE / LOCATION ───
  if (matches(["contact", "email", "phone", "mobile", "linkedin", "location", "reach out", "hire", "email address", "phone number", "where do you live", "where are you from", "where are you located", "call", "number"])) {
    if (matches(["phone", "phone number", "mobile", "call", "number"]) && !matches(["email", "linkedin", "github", "location", "resume"])) {
      return {
        intent: "Phone",
        reply: `I prefer to be contacted through email or LinkedIn.

📧 Email: tarannum.k2504@gmail.com
💼 LinkedIn: https://linkedin.com/in/tarannum2504`,
        actions: []
      };
    }
    if (matches(["email", "email address"])) {
      return {
        intent: "Email",
        reply: `Email:
tarannum.k2504@gmail.com`,
        actions: ["OPEN_EMAIL"]
      };
    }
    if (matches(["linkedin"])) {
      return {
        intent: "LinkedIn",
        reply: `LinkedIn:
https://linkedin.com/in/tarannum2504`,
        actions: ["OPEN_LINKEDIN"]
      };
    }
    if (matches(["location", "where do you live", "where are you from", "where are you located"])) {
      return {
        intent: "Location",
        reply: `Rajasthan, India`,
        actions: []
      };
    }
    return {
      intent: "Contact",
      reply: `You can contact Tarannum Khan through the following channels:

* **Email**: [tarannum.k2504@gmail.com](mailto:tarannum.k2504@gmail.com)
* **LinkedIn**: https://linkedin.com/in/tarannum2504
* **GitHub**: https://github.com/Tarannum2504
* **Location**: Rajasthan, India`,
      actions: ["NAVIGATE_CONTACT"]
    };
  }

  // ─── 15. CAREER GOALS / ROLES ───
  if (matches(["career goal", "career goals", "objective", "objectives", "aim", "future plans", "aspiring", "bio", "about her", "who is she", "about me", "who are you", "role", "roles", "interested roles", "job roles", "target roles"])) {
    if (matches(["role", "roles", "interested roles", "job roles", "target roles"])) {
      return {
        intent: "Interested Roles",
        reply: `• Data Analyst
• Business Analyst
• BI Analyst
• Junior Data Scientist (Learning Path)`,
        actions: []
      };
    }
    return {
      intent: "Career Goal",
      reply: `My goal is to build a career as a Data Analyst, leveraging SQL, Python, Power BI, Tableau, and AI-powered analytics to solve real-world business problems.`,
      actions: []
    };
  }

  return null;
}

/**
 * Classifies if a question is portfolio related.
 */
function isPortfolioRelated(message) {
  const normalized = message.toLowerCase().trim().replace(/[?.,!]/g, "");

  // Keywords representing portfolio topics
  const portfolioKeywords = [
    "tarannum", "khan", "you", "your", "she", "her", "me", "my",
    "it", "its", "this", "that", "there", "then",
    "education", "college", "university", "study", "studying", "degree", "course", "courses", "coursework", "btech", "b.tech", "cgpa", "grade", "grades", "jiet", "jodhpur", "subject", "subjects",
    "skill", "skills", "tech stack", "languages", "programming", "database", "databases", "python", "java", "c", "sql", "power bi", "excel", "tableau", "pandas", "numpy", "scipy", "scikit-learn", "matplotlib", "plotly", "mysql", "sqlite", "rdbms", "git", "github", "repo", "repos", "repository", "repositories",
    "project", "projects", "build", "built", "develop", "developed", "create", "created", "askql", "retail", "product", "analytics", "edubus", "tracker", "infera", "explora", "guide", "sinero",
    "experience", "intern", "interns", "internship", "internships", "work", "job", "jobs", "sin", "decodelabs", "decode labs", "studio",
    "cert", "certs", "certificate", "certificates", "certification", "certifications", "nptel", "infosys", "forage", "aws", "gcp", "azure", "cloud",
    "achievement", "achievements", "award", "awards", "competition", "competitions", "hackathon", "hackathons", "winner", "scholarship", "scholarships", "genpact", "codefiesta", "prompt", "treasure", "hunt", "ideathon", "tata", "crucible",
    "training", "trainings", "rhcsa", "red hat", "redhat", "workshop", "workshops",
    "journey", "evolved", "career", "goal", "goals", "objective", "objectives", "role", "roles", "interest", "interested",
    "contact", "email", "linkedin", "phone", "number", "mobile", "location", "resume", "cv",
    "technology", "technologies", "use", "uses", "tech", "stack", "link", "links", "demo", "website", "problem", "solve", "purpose", "audience", "features", "description", "details"
  ];

  // Specific general knowledge patterns that must be treated as out of scope
  const generalKnowledgePatterns = [
    /\b(explain|what is|how does)\s+(binary search|bubble sort|quick sort|merge sort|dijkstra|algorithm|data structure)\b/i,
    /\b(write|create|implement|make)\s+(a|some)?\s*(python|javascript|java|c|sql|code|program|function|script|class|algorithm)\b/i,
    /\b(capital of|population of|weather in|who won|employees does|how many employees|founded by|founder of|market cap of)\b/i
  ];

  const isGKPattern = generalKnowledgePatterns.some(pattern => pattern.test(normalized));
  if (isGKPattern) {
    return false;
  }

  // If normalized contains any portfolio keyword as a whole word boundary
  const hasWord = portfolioKeywords.some(keyword => {
    const escaped = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}e?s?\\b`, 'i');
    return regex.test(normalized);
  });

  return hasWord;
}

/**
 * POST /api/chat
 * Body: { message: string, history: Array<{role: string, content: string}> }
 * Always returns 200 with { reply: string, actions: string[] }
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.json({ reply: "Method not allowed.", actions: [] });
  }

  const { message, history = [] } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.json({ reply: "Please provide a valid message.", actions: [] });
  }

  const startTime = Date.now();
  console.log("[InferaAI] Incoming request:", { message: message.slice(0, 80) });

  // ─── Out-of-Scope Classification Check ───
  if (!isPortfolioRelated(message)) {
    const executionTime = Date.now() - startTime;
    console.log(`Intent: General Knowledge Fallback`);
    console.log(`Handler: getLocalResponse (Out of Scope)`);
    console.log(`LLM Used: None`);
    console.log(`Execution Time (ms): ${executionTime}`);
    return res.json({
      reply: `I'm a portfolio assistant designed to answer questions about Tarannum Khan, including her education, projects, internships, skills, certifications, achievements, GitHub, and career journey.

I can't reliably answer general knowledge questions.

Feel free to ask me anything about my portfolio.

You can ask me about:
• My projects
• Internships
• Technical skills
• Certifications
• GitHub`,
      actions: []
    });
  }

  // ─── Hybrid Routing: Local Intents Classifier ───
  const localMatch = getLocalResponse(message, history);
  
  console.log(`Matched Intent:\nLocal: ${localMatch ? "true" : "false"}`);

  if (localMatch) {
    const executionTime = Date.now() - startTime;
    console.log(`Intent: ${localMatch.intent || "Local Knowledge"}`);
    console.log(`Handler: getLocalResponse`);
    console.log(`LLM Used: None`);
    console.log(`Execution Time (ms): ${executionTime}`);

    const { intent, ...responseBody } = localMatch;
    return res.json(responseBody);
  }

  const apiKey = process.env.HF_API_KEY;
  if (!apiKey || apiKey === "your_huggingface_api_key_here") {
    console.error("[InferaAI] Missing or invalid HF_API_KEY in .env. Falling back locally.");
    const executionTime = Date.now() - startTime;
    console.log(`Intent: Local Fallback (No API Key)`);
    console.log(`Handler: getLocalFallbackSummary`);
    console.log(`LLM Used: None`);
    console.log(`Execution Time (ms): ${executionTime}`);
    return res.json({
      reply: getLocalFallbackSummary(),
      actions: [],
    });
  }

  const host = "router.huggingface.co";
  const model = process.env.HF_MODEL || "meta-llama/Llama-3.3-70B-Instruct";
  const url = "https://router.huggingface.co/v1/chat/completions";

  // ─── DNS lookup check with fallback ───
  try {
    await dns.lookup(host);
  } catch (dnsError) {
    console.error(`[InferaAI] DNS resolution failed for ${host}:`, dnsError.message);
    const executionTime = Date.now() - startTime;
    console.log(`Intent: Local Fallback (DNS Check Failure)`);
    console.log(`Handler: getLocalFallbackSummary`);
    console.log(`LLM Used: None`);
    console.log(`Execution Time (ms): ${executionTime}`);
    return res.json({
      reply: getLocalFallbackSummary(),
      actions: [],
    });
  }

  const systemPrompt = buildSystemPrompt();
  const systemInstruction = `${systemPrompt}\n\nYou must follow the instructions above carefully. Only answer using the portfolio data provided. Use <ACTION:...> tags when appropriate.`;

  const messages = [
    { role: "system", content: systemInstruction },
    ...history.map(msg => ({ role: msg.role, content: msg.content })),
    { role: "user", content: message }
  ];

  console.log("[InferaAI] Selected model:", model);
  console.log("[InferaAI] Endpoint URL:", url);

  // ─── Call Hugging Face with local fallback ───
  try {
    const hfResponse = await axios.post(
      url,
      {
        model: model,
        messages: messages,
        temperature: 0.3,
        top_p: 0.9,
        max_tokens: 512,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    const executionTime = Date.now() - startTime;
    console.log("[InferaAI] Hugging Face responded with status:", hfResponse.status);
    console.log("[InferaAI] Response body:", JSON.stringify(hfResponse.data).slice(0, 300) + "... [truncated]");

    const result = hfResponse.data;
    let reply = parseHFResponse(result);

    if (reply === null) {
      console.error("[InferaAI] Unknown response format from HF");
      console.log(`Intent: Local Fallback (Unknown Format)`);
      console.log(`Handler: getLocalFallbackSummary`);
      console.log(`LLM Used: None`);
      console.log(`Execution Time (ms): ${executionTime}`);
      return res.json({
        reply: getLocalFallbackSummary(),
        actions: [],
      });
    }

    reply = reply.trim();
    reply = reply.replace(/<\/s>$/g, "").trim();
    reply = reply.replace(/^\[INST\].*?\[\/INST\]/gs, "").trim();

    const actions = [];
    const actionRegex = /<ACTION:(\w+)>/g;
    let match;
    while ((match = actionRegex.exec(reply)) !== null) {
      actions.push(match[1]);
    }
    reply = reply.replace(/<ACTION:\w+>/g, "").trim();

    console.log("[InferaAI] Successfully generated reply, length:", reply.length);
    console.log(`Intent: LLM Fallback`);
    console.log(`Handler: HuggingFace API`);
    console.log(`LLM Used: ${model}`);
    console.log(`Execution Time (ms): ${executionTime}`);

    return res.json({ reply, actions });
  } catch (error) {
    const executionTime = Date.now() - startTime;
    console.error("[InferaAI] Error calling Hugging Face after", executionTime, "ms. Falling back locally.");
    console.error("  Message:", error.message);
    console.log(`Intent: Local Fallback (HF Error)`);
    console.log(`Handler: getLocalFallbackSummary`);
    console.log(`LLM Used: None`);
    console.log(`Execution Time (ms): ${executionTime}`);

    return res.json({
      reply: getLocalFallbackSummary(),
      actions: [],
    });
  }
}
