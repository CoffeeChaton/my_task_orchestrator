// src/routes/demo2/TaskSidebar.tsx
import { ControlButtons } from "../ConfigPanel/ControlButtons";
import { TaskList } from "./TaskList";

export function TaskSidebar({ workflow, selectedId, onSelect }: any) {
  const { status, payload: tasks, setPayload, run, sendSignal } = workflow;
  const isRunning = status === "RUNNING";

  const handleToggle = (id: string, enabled: boolean) => {
    setPayload((prev: any) => prev.map((t: any) => t.id === id ? { ...t, enabled } : t));
  };

  const handleAddTask = (type: string) => {
    setPayload((prev: any) => [...prev, {
      id: crypto.randomUUID(),
      type,
      enabled: true,
      label: `新 ${type} 任務`,
      payload: {}
    }]);
  };

  return (
    <section id="sidebar-task-manager" className="w-80 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200">
      <header className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">任務序列</h2>
        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">{status}</span>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <TaskList 
          tasks={tasks} 
          onReorder={setPayload} 
          onSelect={onSelect} 
          onToggle={handleToggle} 
          activeId={selectedId} 
        />
      </div>

      <footer className="p-4 bg-slate-50 border-t space-y-3">
        <button 
          onClick={() => isRunning ? sendSignal("STOP") : run()}
          className={`w-full py-2.5 rounded-lg font-bold transition-all ${
            isRunning ? "bg-white text-red-600 border border-red-200" : "bg-blue-600 text-white"
          }`}
        >
          {isRunning ? "■ 停止執行" : "▶ 開始任務"}
        </button>
        <ControlButtons tasks={tasks} onImport={setPayload} onAddTask={handleAddTask} />
      </footer>
    </section>
  );
}
