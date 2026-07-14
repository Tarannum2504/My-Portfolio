// ============================================================
// FALLBACK RESPONSE ENGINE
// Used when the Hugging Face API is unavailable
// Replicates the portfolio data-aware responses
// ============================================================

import { profile, socialLinks, education, experience, projects, techStack, achievements, certifications, trainings } from "../../data/portfolio";

function formatProjectList() {
  return projects
    .map((p) => `• **${p.name}** — ${p.tag}\n  ${p.desc}\n  Stack: ${p.stack.join(", ")}`)
    .join("\n\n");
}

function formatExpList() {
  return experience
    .map(
      (e) =>
        `• **${e.role}** @ ${e.org} (${e.period})\n  ${e.desc}\n  Tech: ${e.tech.join(", ")}`
    )
    .join("\n\n");
}

function formatCertList() {
  return certifications
    .map((c) => `• **${c.title}** — ${c.org} (${c.year})`)
    .join("\n");
}

function formatTrainingList() {
  return trainings
    .map(
      (t) =>
        `• **${t.title}** — ${t.org} (${t.duration}${t.status === "pursuing" ? " — In Progress" : ""})`
    )
    .join("\n");
}

function formatAchievementList() {
  return achievements
    .map((a) => `• **${a.title}** — ${a.org} (${a.year})`)
    .join("\n");
}

function formatTechStack() {
  return techStack
    .map((cat) => `**${cat.category}**: ${cat.items.join(", ")}`)
    .join("\n");
}

/**
 * Parse <ACTION:...> tags from text and return { text, actions }
 */
function extractActions(text) {
  const actions = [];
  const actionRegex = /<ACTION:(\w+)>/g;
  let match;
  while ((match = actionRegex.exec(text)) !== null) {
    actions.push(match[1]);
  }
  const cleaned = text.replace(/<ACTION:\w+>/g, "").trim();
  return { reply: cleaned, actions };
}

export function generateResponse(query) {
  const q = query.toLowerCase().trim();

  // Greetings
  if (["hello", "hi", "hey", "hi there", "hello there", "good morning", "good evening"].includes(q)) {
    return {
      reply: `Hello! I'm **Infera AI**, your portfolio assistant for **Tarannum Khan**. Ask me anything about her projects, experience, skills, education, or achievements.`,
      actions: [],
    };
  }

  // Specific project lookup
  for (const p of projects) {
    if (q.includes(p.name.toLowerCase().replace(/[^a-z0-9]/g, ""))) {
      return {
        reply: `**${p.name}** — ${p.tag}\n\n${p.desc}\n\nStack: ${p.stack.join(", ")}`,
        actions: [],
      };
    }
  }

  // Resume / Download
  if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
    return extractActions(
      `<ACTION:DOWNLOAD_RESUME>\n\nYou can download Tarannum's resume directly!`
    );
  }

  // Education
  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("degree") || q.includes("b.tech") || q.includes("jiet") || q.includes("study") || q.includes("academic")) {
    return {
      reply: `**${education.degree}** in **${education.field}**\n🏛️ ${education.institution}\n📅 ${education.period} (${education.year})\n📊 CGPA: ${education.cgpa}\n\n**Relevant Coursework:**\n${education.coursework.map((c) => `• ${c}`).join("\n")}`,
      actions: [],
    };
  }

  // Skills / Tech Stack
  if (q.includes("skill") || q.includes("tech stack") || q.includes("technolog") || q.includes("tools") || q.includes("programming") || q.includes("languag") || q.includes("know") || q.includes("expertise")) {
    return {
      reply: `Here's Tarannum's tech stack:\n\n${formatTechStack()}`,
      actions: [],
    };
  }

  // Experience / Internships
  if (q.includes("experience") || q.includes("internship") || q.includes("work") || q.includes("job") || q.includes("professional")) {
    return {
      reply: `Here are Tarannum's internship experiences:\n\n${formatExpList()}`,
      actions: [],
    };
  }

  // Projects
  if (q.includes("project") || q.includes("built") || q.includes("build") || q.includes("developed") || q.includes("create") || q.includes("portfolio") || q.includes("application")) {
    return {
      reply: `Here are Tarannum's projects:\n\n${formatProjectList()}`,
      actions: [{ action: "NAVIGATE_PROJECTS", label: "View All Projects" }],
    };
  }

  // About / Overview
  if (q.includes("who is") || q.includes("introduce") || q.includes("overview") || q.includes("about") || (q.includes("tarannum") && !q.includes("project") && !q.includes("skill") && !q.includes("experience") && !q.includes("internship") && !q.includes("education"))) {
    return {
      reply: `${profile.name} is a ${profile.title}. ${profile.bio.join(" ")}\n\nYou can view the full resume or reach out via the Contact page for more details.`,
      actions: [],
    };
  }

  // Certifications
  if (q.includes("certification") || q.includes("certificate") || q.includes("nptel") || q.includes("infosys") || q.includes("forage")) {
    return {
      reply: `Here are Tarannum's certifications:\n\n${formatCertList()}`,
      actions: [{ action: "NAVIGATE_CERTIFICATIONS", label: "View All" }],
    };
  }

  // Training
  if (q.includes("training") || q.includes("workshop") || q.includes("bootcamp") || q.includes("course")) {
    return {
      reply: `Here are Tarannum's trainings:\n\n${formatTrainingList()}`,
      actions: [{ action: "NAVIGATE_TRAINING", label: "View All" }],
    };
  }

  // Achievements
  if (q.includes("achievement") || q.includes("award") || q.includes("honor") || q.includes("scholarship") || q.includes("competition") || q.includes("winner")) {
    return {
      reply: `Here are Tarannum's achievements:\n\n${formatAchievementList()}`,
      actions: [{ action: "NAVIGATE_ACHIEVEMENTS", label: "View All" }],
    };
  }

  // GitHub
  if (q.includes("github")) {
    return extractActions(
      `<ACTION:OPEN_GITHUB>\n\nCheck out Tarannum's GitHub profile for all her open-source work!`
    );
  }

  // LinkedIn
  if (q.includes("linkedin")) {
    return extractActions(
      `<ACTION:OPEN_LINKEDIN>\n\nConnect with Tarannum on LinkedIn!`
    );
  }

  // Phone privacy check
  if (q.includes("phone") || q.includes("call") || q.includes("number")) {
    return {
      reply: `I prefer to be contacted through email or LinkedIn.

📧 Email: ${socialLinks.email}
💼 LinkedIn: ${socialLinks.linkedin}`,
      actions: []
    };
  }

  // Contact
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    return {
      reply: `You can reach Tarannum via:\n📧 Email: ${socialLinks.email}\n📍 Location: ${socialLinks.location}\n\nOr connect on professional networks:`,
      actions: [],
    };
  }

  // Help / Default
  return {
    reply: `I can answer questions about:\n\n• **Overview** — Who is Tarannum?\n• **Education** — Degree, college, coursework\n• **Skills** — Tech stack, tools, languages\n• **Experience** — Internships, work history\n• **Projects** — Built applications\n• **Certifications** — NPTEL, Infosys, Forage\n• **Training** — Workshops, bootcamps\n• **Achievements** — Awards, scholarships\n• **Resume** — Download CV\n• **Contact** — Email, LinkedIn, GitHub\n\nTry one of the suggested prompts above!`,
    actions: [],
  };
}
