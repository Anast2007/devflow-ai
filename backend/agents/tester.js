const { callClaude } = require("../services/claude");
const { mockTests } = require("../services/mock");

const SYSTEM_PROMPT = `You are the Tester Agent inside an AI Software Developer pipeline.
Given the requirement, language, and code, generate a Markdown list of test cases.
For each test case include: Input, Expected Output, and a short Description (note when it's an edge case).
Cover at least: a normal case, an edge case, and a boundary/invalid case.`;

async function runTester(requirement, language, code) {
  const userPrompt = `Requirement: ${requirement}\nLanguage: ${language}\nCode:\n${code}\n\nGenerate test cases.`;
  try {
    const tests = await callClaude(SYSTEM_PROMPT, userPrompt, 1200);
    return { tests, mode: "live" };
  } catch (err) {
    return { tests: mockTests(language), mode: "mock", error: err.message };
  }
}

module.exports = { runTester };
