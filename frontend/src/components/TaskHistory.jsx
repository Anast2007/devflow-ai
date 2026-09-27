import ResultView from "./ResultView";

export default function TaskHistory({ tasks, selectedTask, onSelect, onClear }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Task History</h2>
          {tasks.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-muted hover:text-danger transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {tasks.length === 0 ? (
          <div className="text-sm text-muted bg-panel border border-line rounded-lg p-5">
            No tasks yet. Build something from "New Task" and it will show up here.
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => onSelect(task)}
                className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                  selectedTask?.id === task.id
                    ? "border-accent2 bg-panel2"
                    : "border-line bg-panel hover:border-accent2/50"
                }`}
              >
                <div className="text-sm text-white line-clamp-2">{task.requirement}</div>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted">
                  <span className="font-mono">{task.language}</span>
                  <span>·</span>
                  <span>{new Date(task.createdAt).toLocaleString()}</span>
                  {task.demoMode && (
                    <span className="text-warn">· demo</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="col-span-8">
        {selectedTask ? (
          <ResultView result={selectedTask} />
        ) : (
          <div className="text-sm text-muted bg-panel border border-line rounded-lg p-5 h-full flex items-center justify-center">
            Select a task on the left to view its full result.
          </div>
        )}
      </div>
    </div>
  );
}
