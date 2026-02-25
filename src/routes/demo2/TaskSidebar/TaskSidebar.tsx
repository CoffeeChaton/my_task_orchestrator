// src/routes/demo2/TaskSidebar/TaskSidebar.tsx
import { useState } from "react";
import { TaskList } from "./TaskList";
import { type TTaskConfig, type TaskInstance } from "../types";

interface TaskSidebarProps {
  config: TTaskConfig;
  setConfig: (updater: (prev: TTaskConfig) => TTaskConfig) => void;
  onSelect: (id: number | null) => void;
}

export const TaskSidebar = ({ config, setConfig, onSelect }: TaskSidebarProps) => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const { body: tasks, head } = config;

  // 模擬狀態，實際應從 workflow context 取得
  const status = "IDLE";
  const isRunning = status === "RUNNING";

  // 新增任務：確保 ID 是基於當前長度自增
  const handleAddTask = (type: string, label: string) => {
    const newTask: TaskInstance<unknown> = {
      id: tasks.length + 1,
      type,
      enabled: true,
      label,
      payload: {}
    };

    setConfig(prev => ({
      ...prev,
      body: [...prev.body, newTask]
    }));
    setShowAddMenu(false);
    onSelect(newTask.id); // 自動選中新任務
  };

  // 刪除任務：重新排序所有 ID
  const handleRemove = (id: number) => {
    setConfig(prev => {
      const filtered = prev.body.filter(t => t.id !== id);
      const reIndexed = filtered.map((t, i) => ({ ...t, id: i + 1 }));
      return { ...prev, body: reIndexed };
    });
  };

  // 清空任務
  const handleClear = () => {
    if (window.confirm("確定清空所有任務嗎？")) {
      setConfig(prev => ({ ...prev, body: [] }));
      onSelect(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
      <header className="p-4 border-b flex justify-between items-center shrink-0 bg-slate-50/50">
        <div>
          <h2 className="text-sm font-bold text-slate-700">任務序列</h2>
          <p className="text-[10px] text-slate-400 font-mono">
            Last: {head.lastUpdated.split('T')[1].split('.')[0]}
          </p>
        </div>
        <span className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 text-slate-500 rounded font-mono uppercase shadow-sm">
          {status}
        </span>
      </header>

      {/* 任務列表區域：在行動端我們希望它能撐開，不鎖死高度 */}
      <div className="flex-1 overflow-y-auto p-3 min-h-[250px] bg-white custom-scrollbar">
        {tasks.length > 0 ? (

          <TaskList
            tasks={tasks}
            activeId={head.activeTask}
            onSelect={onSelect}
            onReorder={(newTasks: TaskInstance[], nextActiveId: number) => {
              setConfig(prev => ({
                ...prev,
                head: { ...prev.head, activeTask: nextActiveId }, // 同步更新選中的 ID
                body: newTasks
              }));
            }}
            onRemove={handleRemove}
            onToggle={(id: number, enabled: boolean) => {
              setConfig(prev => ({
                ...prev,
                body: prev.body.map(t => t.id === id ? { ...t, enabled } : t)
              }));
            }}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 py-10">
            <p className="text-xs">尚未加入任何任務</p>
          </div>
        )}
      </div>

      {/* 底部控制區：優化 iPhone 觸控體驗 */}
      <div className="p-4 border-t bg-slate-50/30 shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all font-bold text-sm"
            >
              <span>+</span>
              <span>新增任務</span>
            </button>

            {/* 新增菜單 */}
            {showAddMenu && (
              <div className="absolute bottom-12 left-0 w-full bg-white border border-slate-200 shadow-xl rounded-xl py-1 z-50 animate-in fade-in slide-in-from-bottom-2">
                <button onClick={() => handleAddTask("REWARD", "領取獎勵")} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 flex items-center gap-2">🎁 領取獎勵</button>
                <button onClick={() => handleAddTask("DISCOUNT_FIXED", "滿額現折")} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 flex items-center gap-2">💰 滿額現折</button>
                <button onClick={() => handleAddTask("DISCOUNT_PERCENT", "比例折扣")} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 flex items-center gap-2">📈 比例折扣</button>
              </div>
            )}
          </div>

          <button
            onClick={handleClear}
            className="px-3 h-10 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="清空"
          >
            🗑️
          </button>
        </div>

        <button
          onClick={() => console.log("Execute Workflow")}
          className={`w-full py-3.5 rounded-xl font-bold transition-all active:scale-[0.98] shadow-md ${isRunning
              ? "bg-red-500 text-white shadow-red-200"
              : "bg-blue-600 text-white shadow-blue-200"
            }`}
        >
          {isRunning ? "STOP PROCESS" : "Link Start!"}
        </button>
      </div>
    </div>
  );
};
