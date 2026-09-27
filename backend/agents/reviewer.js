const { callClaude } = require("../services/claude");
const { mockReview } = require("../services/mock");

const SYSTEM_PROMPT = `You are the Reviewer Agent inside an AI Software Developer pipeline.
Review the given code and produce a structured Markdown review with these sections:
## Syntax Issues
## Logical Errors
## Edge Cases
## Code Quality
## Suggested Improvements
Be specific and reference the actual code where relevant. If the code is solid, say so briefly in each section rather than inventing problems.`;

async function runReviewer(requirement, language, code) {
  const userPrompt = `Requirement: ${requirement}\nLanguage: ${language}\nCode:\n${code}\n\nReview this code.`;
  try {
    const review = await callClaude(SYSTEM_PROMPT, userPrompt, 1500);
    return { review, mode: "live" };
  } catch (err) {
    return { review: mockReview(), mode: "mock", error: err.message };
  }
}

module.exports = { runReviewer };
