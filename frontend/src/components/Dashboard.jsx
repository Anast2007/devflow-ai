export default function Dashboard({ tasks, health, onNavigate }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.finalSolution).length;
  const demoTasks = tasks.filter((t) => t.demoMode).length;
  const languages = [...new Set(tasks.map((t) => t.language))];

  const stats = [
    { label: "Total Tasks", value: totalTasks },
    { label: "Completed", value: completedTasks },
    { label: "Languages Used", value: languages.length },
    { label: "Demo Mode Runs", value: demoTasks },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Dashboard</h2>
        <p className="text-sm text-muted mt-1">
          Overview of your AI software developer pipeline.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-panel border border-line rounded-lg p-4">
            <div className="text-2xl font-semibold text-white font-mono">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-panel border border-line rounded-lg p-5">
        <h3 className="text-sm font-medium text-white mb-3">Pipeline</h3>
        <div className="flex items-center gap-2 text-xs text-muted font-mono flex-wrap">
          <span className="px-2 py-1 rounded bg-panel2 border border-line">Requirement</span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-panel2 border border-line">Planner</span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-panel2 border border-line">Developer</span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-panel2 border border-line">Reviewer</span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-panel2 border border-line">Tester</span>
          <span>→</span>
          <span className="px-2 py-1 rounded bg-accent/10 border border-accent/40 text-accent">
            Final Solution
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onNavigate("new-task")}
          className="px-4 py-2 rounded-md bg-accent text-ink text-sm font-medium hover:brightness-110 transition"
        >
          Start a new task
        </button>
        <button
          onClick={() => onNavigate("history")}
          className="px-4 py-2 rounded-md border border-line text-sm text-gray-200 hover:border-accent2/50 transition"
        >
          View task history
        </button>
      </div>

      {!health?.liveMode && (
        <div className="text-xs text-warn bg-warn/10 border border-warn/30 rounded-md px-3 py-2 inline-block">
          Running in demo mode — configure ANTHROPIC_API_KEY in backend/.env for live AI generation.
        </div>
      )}
    </div>
  );
}
