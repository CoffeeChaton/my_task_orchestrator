// src/routes/demo2/ConfigPanel.tsx
import { TaskDetailSlot } from "./TaskDetailSlot";
import { type TaskInstance } from "./types";

interface ConfigPanelProps {
  activeTask: TaskInstance | undefined;
  onUpdateTask: (updated: TaskInstance) => void;
}

export function ConfigPanel({ activeTask, onUpdateTask }: ConfigPanelProps) {
  return (
    <section id="task-config-panel" className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
      <header className="p-4 border-b border-slate-100 bg-slate-50/50">
        <h2 className="font-semibold text-slate-700">
          {activeTask ? `配置：${activeTask.label}` : "配置面板"}
        </h2>
      </header>
      
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTask ? (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">任務名稱</label>
              <input 
                type="text" 
                value={activeTask.label}
                onChange={(e) => onUpdateTask({ ...activeTask, label: e.target.value })}
                className="w-full mt-2 text-xl font-semibold border-b border-slate-100 focus:border-blue-500 outline-none pb-2 transition-colors"
              />
            </div>

            {/* 核心插槽區域 */}
            <TaskDetailSlot 
              task={activeTask} 
              onChange={(newPayload: unknown) => {
                onUpdateTask({ ...activeTask, payload: newPayload });
              }} 
            />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <div className="mb-4 text-5xl">⚙️</div>
            <p className="text-lg">選取左側任務以開始調整參數</p>
          </div>
        )}
      </div>
    </section>
  );
}
