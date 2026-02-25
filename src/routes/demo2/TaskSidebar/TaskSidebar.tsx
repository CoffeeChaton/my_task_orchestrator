// src/routes/demo2/TaskSidebar/TaskSidebar.tsx
import { useState, useCallback } from "react";
import { TaskList } from "./TaskList";
import { validateTaskConfig, type TTaskConfig } from "./schema-validator";
import { type TaskInstance } from "../types";

interface TaskSidebarProps {
  config: TTaskConfig;
  setConfig: (updater: (prev: TTaskConfig) => TTaskConfig) => void;
  onSelect: (id: number | null) => void;
}

export const TaskSidebar = ({ config, setConfig, onSelect }: TaskSidebarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [importValue, setImportValue] = useState("");
  const [showAddMenu, setShowAddMenu] = useState(false);

  const { body: tasks, head } = config;
  const status = "IDLE";

  // --- 任務操作邏輯 ---

  const handleAddTask = (type: TaskInstance["type"], label: string) => {
    const defaultPayloads: Record<TaskInstance["type"], TaskInstance["payload"]> = {
      REWARD: { items: [] },
      DISCOUNT_FIXED: { threshold: 0, discount: 0 },
      DISCOUNT_PERCENT: { rate: 0.5, stackable: false }, // 修正後的類型
      // 💡 新增：停車場策略初始值
      PARKING_STRATEGY: {
        mode: 'HOURLY',
        baseRate: 30,
        freeMinutes: 15,
        maxDailyCharge: 150,
        thresholds: { offlineMinutes: 10, lowBattery: 20 },
        specialRates: { isElectricVehicle: true, isSharedBike: false }
      }
    };

    const newTask: TaskInstance = {
      id: tasks.length + 1,
      type,
      label,
      enabled: true,
      payload: defaultPayloads[type]
    } as TaskInstance;

    setConfig(prev => ({ ...prev, body: [...prev.body, newTask] }));
    setShowAddMenu(false);
    onSelect(newTask.id);
  };

  const handleRemove = useCallback((id: number) => {
    setConfig(prev => ({
      ...prev,
      body: prev.body.filter(t => t.id !== id)
    }));
    onSelect(null);
  }, [setConfig, onSelect]);

  const handleToggle = useCallback((id: number, enabled: boolean) => {
    setConfig(prev => ({
      ...prev,
      body: prev.body.map(t => t.id === id ? { ...t, enabled } : t)
    }));
  }, [setConfig]);

  const handleClear = () => {
    if (window.confirm("確定清空所有任務嗎？")) {
      setConfig(prev => ({ ...prev, body: [] }));
      onSelect(null);
    }
  };

  // --- JSON 匯入/導出邏輯 ---

  const handleImport = () => {
    try {
      const rawData: unknown = JSON.parse(importValue);
      const parsed = validateTaskConfig(rawData);

      if (parsed) {
        // 匯入時不更新時間戳，交由 setConfig 內部的校準邏輯判斷
        setConfig(() => ({
          ...parsed,
          head: { ...parsed.head, activeTask: null }
        }));
        setIsModalOpen(false);
        setImportValue("");
        alert("✅ 配置匯入成功");
      } else {
        alert("❌ 格式驗證失敗：請檢查 JSON 結構是否符合規範");
      }
    } catch {
      alert("❌ 無效的 JSON 格式");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative scroll-container">
      {/* Header */}
      <header className="p-4 border-b flex justify-between items-center shrink-0 bg-slate-50/50">
        <div>
          <h2 className="text-sm font-bold text-slate-700 tracking-tight">任務序列</h2>
          <p className="text-[10px] text-slate-400 font-mono">
            V.{head.lastUpdated.split('T')[1].split('.')[0]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 text-slate-500 rounded font-mono uppercase shadow-sm">
            {status}
          </span>
        </div>
      </header>

      {/* Task List Area */}
      <div className="flex-1 overflow-y-auto p-3 min-h-50 custom-scrollbar">
        <TaskList
          tasks={tasks}
          activeId={head.activeTask}
          onSelect={onSelect}
          onRemove={handleRemove}
          onToggle={handleToggle}
          onReorder={(newTasks: TaskInstance[], nextActiveId: number | null) => {
            setConfig(prev => ({
              ...prev,
              head: { ...prev.head, activeTask: nextActiveId },
              body: newTasks
            }));
          }}
        />

        {tasks.length === 0 && (
          <div className="py-10 text-center text-slate-300 text-xs">尚無任務</div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t bg-slate-50/30 shrink-0 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white text-blue-600 hover:bg-blue-50 transition-all font-bold text-sm shadow-sm"
            >
              <span className="text-lg">+</span> 新增任務
            </button>

            {showAddMenu && (
              <div className="absolute bottom-full mb-2 left-0 w-full bg-white border border-slate-200 shadow-xl rounded-2xl py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                <button onClick={() => handleAddTask("REWARD", "領取獎勵")} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors">🎁 <span className="font-medium text-slate-600">領取獎勵</span></button>
                <button onClick={() => handleAddTask("DISCOUNT_FIXED", "滿額現折")} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors">💰 <span className="font-medium text-slate-600">滿額現折</span></button>
                <button onClick={() => handleAddTask("DISCOUNT_FIXED", "折扣比例")} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors">💰 <span className="font-medium text-slate-600">折扣比例</span></button>
                {/* 💡 新增：智慧停車任務 */}
                <button
                  onClick={() => handleAddTask("PARKING_STRATEGY", "停車計費與監控")}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 flex items-center gap-3 transition-colors border-t border-slate-50"
                >
                  🅿️ <span className="font-medium text-blue-700">停車計費與監控</span>
                </button>
                <button onClick={() => handleClear()} className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 text-red-500 flex items-center gap-3 border-t border-slate-50 mt-1">🗑️ <span className="font-medium">清空所有</span></button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 h-11 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center"
            title="JSON 配置"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </button>
        </div>

        <button
          onClick={() => alert("DEMO 無後端 server")}
          className="w-full py-4 rounded-2xl font-black bg-blue-600 text-white shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-[0.97] transition-all tracking-wider text-sm"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          發佈並提交
        </button>
      </div>

      {/* ---發佈與匯入彈窗 (Modal) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <header className="p-5 border-b flex justify-between items-center bg-white shrink-0">
              <h3 className="font-bold text-slate-800">配置同步管理</h3>
              <button onClick={() => setIsModalOpen(false)} className="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors">✕</button>
            </header>

            <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
              <section>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">當前 JSON 數據</label>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(config, null, 2));
                      alert("已複製到剪貼簿");
                    }}
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    複製全部
                  </button>
                </div>
                <pre className="p-4 bg-slate-900 rounded-2xl text-[10px] font-mono text-blue-300 overflow-x-auto border border-slate-800 shadow-inner">
                  {JSON.stringify(config, null, 2)}
                </pre>
              </section>

              <section>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">快速匯入配置</label>
                <textarea
                  value={importValue}
                  onChange={(e) => setImportValue(e.target.value)}
                  placeholder="在此貼上舊配置的 JSON..."
                  className="w-full h-32 p-4 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-[10px] font-mono transition-all"
                />
              </section>
            </div>

            <footer className="p-5 border-t bg-slate-50 flex gap-3 shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-white border border-slate-200 transition-colors">取消</button>
              <button
                onClick={handleImport}
                disabled={!importValue}
                className="flex-1 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-md shadow-blue-100 disabled:opacity-30 disabled:grayscale transition-all"
              >
                確認匯入並更新
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};
