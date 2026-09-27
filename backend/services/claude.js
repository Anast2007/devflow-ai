const Anthropic = require("@anthropic-ai/sdk");

const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-4-6";
const FORCE_MOCK = String(process.env.FORCE_MOCK_MODE || "false").toLowerCase() === "true";

let client = null;
if (API_KEY && !FORCE_MOCK) {
  client = new Anthropic({ apiKey: API_KEY });
}

/**
 * Whether we currently have a usable Claude client.
 */
function isLiveModeAvailable() {
  return Boolean(client);
}

/**
 * Calls Claude with a system prompt + user prompt and returns plain text.
 * Throws an error if the call fails so the caller can decide to fall back to mock mode.
 */
async function callClaude(systemPrompt, userPrompt, maxTokens = 2000) {
  if (!client) {
    throw new Error("Claude API client not configured (missing ANTHROPIC_API_KEY or mock mode forced).");
  }

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "";
}

module.exports = { callClaude, isLiveModeAvailable };
