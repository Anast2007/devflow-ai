import { useState } from "react";
import AgentProgress from "./AgentProgress";
import ResultView from "./ResultView";
import { runAgentPipeline } from "../api/agent";

const LANGUAGES = ["Java", "JavaScript", "Python", "C++"];

const EXAMPLES = [
  {
    label: "Second largest in array",
    requirement: "Create a Java program to find the second largest element in an array.",
    language: "Java",
  },
  {
    label: "Student REST API",
    requirement: "Create a Java REST API for student management.",
    language: "Java",
  },
  {
    label: "Palindrome checker",
    requirement: "Create a Java program to check whether a string is a palindrome.",
    language: "Java",
  },
];

export default function NewTask({ onTaskComplete }) {
  const [requirement, setRequirement] = useState("");
  const [language, setLanguage] = useState("Java");
  const [stage, setStage] = useState("idle"); // idle | planning | development | review | testing | completed
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const isRunning = stage !== "idle" && stage !== "completed";

  async function handleBuild() {
    if (!requirement.trim() || isRunning) return;

    setError(null);
    setResult(null);
    setStage("planning");

    // Simulate visible progress through stages while the single backend
    // call runs the full planner -> developer -> reviewer -> tester pipeline.
    const stageTimers = [
      setTimeout(() => setStage("development"), 700),
      setTimeout(() => setStage("review"), 1600),
      setTimeout(() => setStage("testing"), 2500),
    ];

    try {
      const data = await runAgentPipeline(requirement, language);

      stageTimers.forEach(clearTimeout);
      setStage("completed");
      setResult(data);
      onTaskComplete?.(data);
    } catch (err) {
      stageTimers.forEach(clearTimeout);
      setStage("idle");
      setError(err.message || "Something went wrong while running the agent pipeline.");
    }
  }

  function applyExample(example) {
    setRequirement(example.requirement);
    setLanguage(example.language);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">New Task</h2>
        <p className="text-sm text-muted mt-1">
          Describe what you want built. DevAgent will plan, code, review and test it.
        </p>
      </div>

      <div className="bg-panel border border-line rounded-lg p-5 space-y-4">
        <div>
          <label className="text-xs text-muted block mb-2">Try an example</label>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => applyExample(ex)}
                className="text-xs px-3 py-1.5 rounded-md border border-line text-muted hover:text-white hover:border-accent2/50 transition-colors"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-muted block mb-2">Requirement</label>
          <textarea
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            rows={5}
            placeholder="e.g. Create a Java program to find the second largest element in an array."
            className="w-full bg-ink border border-line rounded-md px-3 py-2 text-sm text-white placeholder-muted/60 focus:outline-none focus:border-accent2 resize-none"
          />
        </div>

        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="text-xs text-muted block mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-ink border border-line rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-accent2"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleBuild}
            disabled={isRunning || !requirement.trim()}
            className="px-5 py-2 rounded-md bg-accent text-ink text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition"
          >
            {isRunning ? "Building…" : "Build Solution"}
          </button>
        </div>

        {error && (
          <div className="text-sm text-danger bg-danger/10 border border-danger/30 rounded-md px-3 py-2">
            {error} — you can still retry; DevAgent will fall back to demo mode automatically if the
            Claude API is unavailable.
          </div>
        )}
      </div>

      {stage !== "idle" && <AgentProgress currentStage={stage} />}

      {result && <ResultView result={result} />}
    </div>
  );
}
