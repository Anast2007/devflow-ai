const { callClaude } = require("../services/claude");
const { mockPlan } = require("../services/mock");

const SYSTEM_PROMPT = `You are the Planner Agent inside an AI Software Developer pipeline.
Given a software requirement and target language, produce a clear plan with these sections:
## Problem Understanding
## Development Steps
## Algorithm / Approach
## Required Components
Keep it concise, practical, and specific to the requirement. Use Markdown.`;

async function runPlanner(requirement, language) {
  const userPrompt = `Requirement: ${requirement}\nLanguage: ${language}\n\nCreate the development plan.`;
  try {
    const plan = await callClaude(SYSTEM_PROMPT, userPrompt, 1200);
    return { plan, mode: "live" };
  } catch (err) {
    return { plan: mockPlan(requirement, language), mode: "mock", error: err.message };
  }
}

module.exports = { runPlanner };
