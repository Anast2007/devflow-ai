export default function Settings({ health }) {
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Settings</h2>
        <p className="text-sm text-muted mt-1">
          DevAgent reads its configuration from the backend's environment variables.
        </p>
      </div>

      <div className="bg-panel border border-line rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-200">Backend connection</span>
          <span
            className={`text-xs px-2 py-1 rounded border ${
              health?.status === "ok"
                ? "text-accent border-accent/40 bg-accent/10"
                : "text-danger border-danger/40 bg-danger/10"
            }`}
          >
            {health?.status === "ok" ? "Connected" : "Unreachable"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-200">Claude API mode</span>
          <span
            className={`text-xs px-2 py-1 rounded border ${
              health?.liveMode
                ? "text-accent border-accent/40 bg-accent/10"
                : "text-warn border-warn/40 bg-warn/10"
            }`}
          >
            {health?.liveMode ? "Live" : "Demo / Mock"}
          </span>
        </div>

        <div className="border-t border-line pt-4 text-sm text-muted leading-relaxed">
          To enable live mode, set <code className="text-accent2">ANTHROPIC_API_KEY</code> in{" "}
          <code className="text-accent2">backend/.env</code> and restart the backend server. See
          the README for full setup instructions.
        </div>
      </div>
    </div>
  );
}
