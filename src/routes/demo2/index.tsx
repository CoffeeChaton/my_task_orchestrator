// src/routes/demo2/index.tsx
import { useState } from "react";
import { useWorkflow } from "./useWorkflow";
import { TaskList } from "./TaskList";
import { LogConsole } from "./LogConsole";
import { ControlButtons } from "./ControlButtons";
import { type TaskInstance } from "./types";
import { TaskDetailSlot } from "./TaskDetailSlot";

export default function Demo2Page() {
  const { status, payload: tasks, setPayload: setTasks, sendSignal, run } = useWorkflow([
    { id: "1", type: "DISCOUNT_FIXED", enabled: true, label: "滿額現折配置", payload: { threshold: 1000, discount: 100 } },
    { id: "2", type: "DISCOUNT_PERCENT", enabled: true, label: "季節折扣計算", payload: { rate: 0.9, stackable: false } }
  ]);
  const [selectedId, setSelectedId] = useState<unknown>(null);
  const activeTask = tasks.find(t => t.id === selectedId);

  // 狀態判定：是否正在執行
  const isRunning = status === "RUNNING";

  const handleToggleTask = (id: string, enabled: boolean) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, enabled } : t));
  };


  const handleAddTask = (type: string) => {
    const newTask: TaskInstance = {
      id: crypto.randomUUID(),
      type,
      enabled: true,
      label: type === "DISCOUNT_FIXED" ? "新滿額任務" : "新比例折扣",
      payload: type === "DISCOUNT_FIXED" ? { threshold: 0, discount: 0 } : { rate: 1, stackable: false }
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleStartStop = () => {
    if (isRunning) {
      sendSignal({ type: "STOP_WORKFLOW" });
      // 這裡假設 sendSignal 會處理狀態回歸 IDLE，或手動介入
    } else {
      run(); // 開始執行
    }
  };

  return (
    <main id="orchestrator-root" className="flex h-screen w-full bg-[#f4f7f9] p-6 gap-6 font-sans text-slate-800">

      {/* 左側：任務調度區 (ID: sidebar-task-manager) */}
      <section id="sidebar-task-manager" className="w-80 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200">
        <header className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-700">任務序列</h2>
          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">{status}</span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <TaskList
            tasks={tasks}
            onReorder={setTasks}
            onSelect={setSelectedId}
            onToggle={handleToggleTask} // 傳入勾選回調
            activeId={selectedId}
          />
        </div>

        <footer className="p-4 bg-slate-50 border-t space-y-3">
          {/* 修復點 3: 開始/停止按鈕合併 */}
          <div id="execution-controls">
            <button
              onClick={handleStartStop}
              className={`w-full py-2.5 rounded-lg font-bold transition-all shadow-sm ${isRunning
                ? "bg-white text-red-600 border border-red-200 hover:bg-red-50"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              {isRunning ? "■ 停止執行" : "▶ 開始任務"}
            </button>

            <ControlButtons tasks={tasks} onImport={setTasks} onAddTask={handleAddTask} />
          </div>
        </footer>
      </section>

      {/* 中間：配置插槽區 (ID: task-config-panel) */}
      <section id="task-config-panel" className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
        <header className="p-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-700">
            {activeTask ? `編輯：${activeTask.label}` : "尚未選取任務"}
          </h2>
        </header>
        <div className="flex-1 p-8">
          {activeTask ? (
            <TaskDetailSlot
              task={activeTask}
              onChange={(newPayload) => {
                setTasks(prev => prev.map(t => t.id === activeTask.id ? { ...t, payload: newPayload } : t));
              }}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <div className="mb-4 text-4xl">📋</div>
              <p>請從左側序列選擇一個任務進行細節配置</p>
            </div>
          )}
        </div>
      </section>

      {/* 右側：日誌區 (ID: system-log-console) */}
      <section id="system-log-console" className="w-96 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <LogConsole />
      </section>
    </main>
  );
}
