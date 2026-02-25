// src/routes/demo2/index.tsx
import { useWorkflow } from "./useWorkflow";
import { TaskSidebar } from "./TaskSidebar/TaskSidebar";
import { ConfigPanel } from "./ConfigPanel/ConfigPanel";
import { LogPanel } from "./LogPanel/LogPanel";
import type { TaskInstance } from "./types";

export const Demo2Page = () => {
  const { config, setConfig } = useWorkflow();

  const handleSelect = (id: number | null) => {
    setConfig(prev => ({
      ...prev,
      head: { ...prev.head, activeTask: id }
    }));
  };

  const activeTask = config.body.find(t => t.id === config.head.activeTask) || null;

  return (
    <main className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-full bg-[#f8fafc] lg:p-4 p-2 gap-4 lg:overflow-hidden">
      
      {/* 任務序列：行動端給予最小高度，不設死最大高度 */}
      <section className="w-full lg:w-80 flex flex-col shrink-0 min-h-87.5">
        <TaskSidebar 
          config={config} 
          setConfig={setConfig} 
          onSelect={handleSelect} 
        />
      </section>

      {/* 配置面板：行動端隨內容撐開高度 */}
      <section className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 min-h-100 lg:overflow-hidden">
        <ConfigPanel 
          activeTask={activeTask} 
          onUpdate={(updatedTask: TaskInstance) => {
            setConfig(prev => ({
              ...prev,
              body: prev.body.map(t => t.id === updatedTask.id ? updatedTask : t)
            }));
          }} 
        />
      </section>

      {/* 桌面端日誌 */}
      <aside className="hidden lg:block w-80 shrink-0 h-full">
        <LogPanel />
      </aside>
    </main>
  );
};
