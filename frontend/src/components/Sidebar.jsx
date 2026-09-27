const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "◧" },
  { key: "new-task", label: "New Task", icon: "＋" },
  { key: "history", label: "Task History", icon: "☰" },
  { key: "settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar({ activeView, onNavigate, liveMode }) {
  return (
    <aside className="w-60 shrink-0 h-full bg-panel border-r border-line flex flex-col">
      <div className="px-5 py-5 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="text-accent font-mono text-lg">{"</>"}</span>
          <span className="font-semibold text-[15px] tracking-tight">DevAgent</span>
        </div>
        <p className="text-xs text-muted mt-1">AI Software Developer</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              activeView === item.key
                ? "bg-panel2 text-white border border-line"
                : "text-muted hover:text-white hover:bg-panel2/60"
            }`}
          >
            <span className="font-mono text-sm w-4 text-center">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-line">
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`w-2 h-2 rounded-full ${liveMode ? "bg-accent" : "bg-warn"}`}
          />
          <span className="text-muted">
            {liveMode ? "Claude API connected" : "Demo / mock mode"}
          </span>
        </div>
      </div>
    </aside>
  );
}
