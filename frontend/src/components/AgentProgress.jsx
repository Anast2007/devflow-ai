const STAGES = [
  { key: "planning", label: "Planning" },
  { key: "development", label: "Development" },
  { key: "review", label: "Code Review" },
  { key: "testing", label: "Testing" },
  { key: "completed", label: "Completed" },
];

// currentStage: one of STAGES[].key, or "idle"
export default function AgentProgress({ currentStage }) {
  const currentIndex = STAGES.findIndex((s) => s.key === currentStage);

  return (
    <div className="bg-panel border border-line rounded-lg p-5">
      <div className="flex items-center justify-between">
        {STAGES.map((stage, idx) => {
          const isDone = currentIndex > idx || currentStage === "completed" && idx <= currentIndex;
          const isActive = idx === currentIndex && currentStage !== "completed";
          const isCompleted = currentStage === "completed" || idx < currentIndex;

          return (
            <div key={stage.key} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2 min-w-[84px]">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border text-xs font-mono transition-colors ${
                    isCompleted
                      ? "bg-accent/20 border-accent text-accent"
                      : isActive
                      ? "bg-accent2/20 border-accent2 text-accent2 animate-pulse"
                      : "bg-panel2 border-line text-muted"
                  }`}
                >
                  {isCompleted ? "✓" : idx + 1}
                </div>
                <span
                  className={`text-xs whitespace-nowrap ${
                    isCompleted || isActive ? "text-white" : "text-muted"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
              {idx < STAGES.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 ${
                    isCompleted ? "bg-accent" : "bg-line"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
