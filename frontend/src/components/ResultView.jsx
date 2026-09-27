import { useState } from "react";

const TABS = [
  { key: "plan", label: "Plan" },
  { key: "code", label: "Code" },
  { key: "review", label: "Review" },
  { key: "tests", label: "Tests" },
  { key: "final", label: "Final Solution" },
];

function CodeBlock({ content }) {
  return (
    <pre className="bg-ink border border-line rounded-md p-4 text-sm text-accent overflow-x-auto whitespace-pre-wrap leading-relaxed">
      <code>{content}</code>
    </pre>
  );
}

function TextBlock({ content }) {
  return (
    <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
      {content}
    </div>
  );
}

export default function ResultView({ result }) {
  const [activeTab, setActiveTab] = useState("plan");

  if (!result) return null;

  return (
    <div className="bg-panel border border-line rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4 border-b border-line">
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-2 text-sm rounded-t-md border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-accent text-white"
                  : "border-transparent text-muted hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {result.demoMode && (
          <span className="text-xs px-2 py-1 rounded bg-warn/15 text-warn border border-warn/30 mb-2">
            Demo mode
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="mb-4 text-xs text-muted font-mono">
          {result.language} · {result.requirement}
        </div>

        {activeTab === "plan" && <TextBlock content={result.plan} />}
        {activeTab === "code" && (
          <div className="space-y-3">
            {result.files?.length > 0 && (
              <div className="text-xs text-muted">
                Files: <span className="text-white">{result.files.join(", ")}</span>
              </div>
            )}
            <CodeBlock content={result.code} />
            {result.explanation && (
              <div>
                <h4 className="text-sm font-medium text-white mb-1">Explanation</h4>
                <TextBlock content={result.explanation} />
              </div>
            )}
          </div>
        )}
        {activeTab === "review" && <TextBlock content={result.review} />}
        {activeTab === "tests" && <TextBlock content={result.tests} />}
        {activeTab === "final" && <TextBlock content={result.finalSolution} />}
      </div>
    </div>
  );
}
