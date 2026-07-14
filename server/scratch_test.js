import dotenv from 'dotenv';
import handler from './api/chat.js';

dotenv.config();

// We will build history sequentially to test progressive disclosure with state memory
const history = [];

async function runStep(stepName, query) {
  console.log(`\n==================================================`);
  console.log(`STEP: ${stepName}`);
  console.log(`Query: "${query}"`);
  console.log(`==================================================`);

  let jsonResult = null;
  const mockReq = {
    method: 'POST',
    body: {
      message: query,
      history: [...history]
    }
  };

  const mockRes = {
    json: (data) => {
      jsonResult = data;
      return mockRes;
    },
    status: (code) => {
      return mockRes;
    }
  };

  try {
    await handler(mockReq, mockRes);
    console.log("Response Reply:\n" + jsonResult.reply);
    console.log("Response Actions:", jsonResult.actions);
    
    // Add to history for subsequent steps
    history.push({ role: "user", content: query });
    history.push({ role: "assistant", content: jsonResult.reply });
    
    return jsonResult.reply;
  } catch (error) {
    console.error("Test error:", error.message);
    throw error;
  }
}

async function run() {
  try {
    // 1. Initial Inquiry
    const desc = await runStep("1. Initial ExploraAI inquiry", "Tell me about ExploraAI.");
    if (!desc.toLowerCase().includes("exploraai") && !desc.toLowerCase().includes("beginner-friendly")) {
      throw new Error("Failed step 1: Expected ExploraAI project details");
    }

    // 2. Tech Stack Follow-up
    const stack = await runStep("2. Technologies followup", "What technologies does it use?");
    const expectedStackLines = ["Python", "Streamlit", "Pandas", "Plotly", "Matplotlib", "EDA"];
    const hasOnlyStack = expectedStackLines.every(tech => stack.includes(tech)) && !stack.includes("https://github.com");
    if (!hasOnlyStack) {
      throw new Error("Failed step 2: Expected ONLY tech stack list");
    }

    // 3. GitHub Link Follow-up
    const gitHub = await runStep("3. GitHub Link followup", "Give its GitHub.");
    const expectedGitHub = "GitHub Repository:\nhttps://github.com/Tarannum2504/ExploraAI";
    if (gitHub.trim() !== expectedGitHub) {
      throw new Error(`Failed step 3: Expected exact format "${expectedGitHub}", got "${gitHub}"`);
    }

    // 4. Live Demo Link Follow-up
    const demo = await runStep("4. Live Demo followup", "Give its live demo.");
    const expectedDemo = "Live Demo:\nhttps://exploraai.streamlit.app/";
    if (demo.trim() !== expectedDemo) {
      throw new Error(`Failed step 4: Expected exact format "${expectedDemo}", got "${demo}"`);
    }

    // 5. Problem Solved Follow-up
    const problem = await runStep("5. Problem Solved followup", "What problem does it solve?");
    const expectedProblem = "A beginner-friendly platform simplifying Exploratory Data Analysis (EDA) through interactive simulations, visual analytics, and guided learning.";
    if (problem.trim() !== expectedProblem) {
      throw new Error(`Failed step 5: Expected exact problem statement "${expectedProblem}", got "${problem}"`);
    }

    console.log("\n==================================================");
    console.log("ALL TESTS COMPLETED SUCCESSFULLY AND PASSED!");
    console.log("==================================================");
  } catch (err) {
    console.error("\nTEST SUITE FAILED:", err.message);
    process.exit(1);
  }
}

run();
