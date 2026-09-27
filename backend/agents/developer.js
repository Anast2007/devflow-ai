const { callClaude } = require("../services/claude");
const { mockCode } = require("../services/mock");

const SYSTEM_PROMPT = `You are the Developer Agent inside an AI Software Developer pipeline.
Given a requirement, target language, and a development plan, generate a complete working solution.

Respond in EXACTLY this format (plain text, no extra commentary outside these sections):

CODE:
\`\`\`
<complete source code here>
\`\`\`

EXPLANATION:
<short explanation of how the code works>

FILES:
<comma-separated list of suggested file names, e.g. Solution.java>`;

function parseDeveloperResponse(raw) {
  const codeMatch = raw.match(/CODE:\s*```[a-zA-Z]*\n?([\s\S]*?)```/);
  const explanationMatch = raw.match(/EXPLANATION:\s*([\s\S]*?)(?:\nFILES:|$)/);
  const filesMatch = raw.match(/FILES:\s*(.*)/);

  const code = codeMatch ? codeMatch[1].trim() : raw.trim();
  const explanation = explanationMatch ? explanationMatch[1].trim() : "No explanation provided.";
  const files = filesMatch
    ? filesMatch[1].split(",").map((f) => f.trim()).filter(Boolean)
    : ["Solution.txt"];

  return { code, explanation, files };
}

async function runDeveloper(requirement, language, plan) {
  const userPrompt = `Requirement: ${requirement}\nLanguage: ${language}\nPlan:\n${plan}\n\nGenerate the complete solution now.`;
  try {
    const raw = await callClaude(SYSTEM_PROMPT, userPrompt, 2500);
    const parsed = parseDeveloperResponse(raw);
    return { ...parsed, mode: "live" };
  } catch (err) {
    const mock = mockCode(requirement, language);
    return { ...mock, mode: "mock", error: err.message };
  }
}

module.exports = { runDeveloper };
