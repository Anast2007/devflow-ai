import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import NewTask from "./components/NewTask";
import TaskHistory from "./components/TaskHistory";
import Settings from "./components/Settings";
import { checkHealth } from "./api/agent";

const STORAGE_KEY = "devagent_tasks";

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // localStorage may be unavailable (e.g. private browsing) — fail silently
  }
}

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [tasks, setTasks] = useState(loadTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    checkHealth().then(setHealth);
  }, []);

  function handleTaskComplete(result) {
    const task = { ...result, id: `task_${Date.now()}`, createdAt: new Date().toISOString() };
    const updated = [task, ...tasks];
    setTasks(updated);
    saveTasks(updated);
  }

  function handleClearHistory() {
    setTasks([]);
    saveTasks([]);
    setSelectedTask(null);
  }

  return (
    <div className="flex h-screen">
      <Sidebar activeView={activeView} onNavigate={setActiveView} liveMode={health?.liveMode} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {activeView === "dashboard" && (
            <Dashboard tasks={tasks} health={health} onNavigate={setActiveView} />
          )}
          {activeView === "new-task" && <NewTask onTaskComplete={handleTaskComplete} />}
          {activeView === "history" && (
            <TaskHistory
              tasks={tasks}
              selectedTask={selectedTask}
              onSelect={setSelectedTask}
              onClear={handleClearHistory}
            />
          )}
          {activeView === "settings" && <Settings health={health} />}
        </div>
      </main>
    </div>
  );
}
