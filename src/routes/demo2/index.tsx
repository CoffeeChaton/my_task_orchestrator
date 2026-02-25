// src/routes/demo2/index.tsx
import { useState } from "react";
import { useWorkflow } from "./useWorkflow";
import { LogPanel } from "./LogPanel/LogPanel";
import { TaskSidebar } from "./TaskSidebar/TaskSidebar";
import { ConfigPanel } from "./ConfigPanel/ConfigPanel";


export default function Demo2Page() {
  // 1. 唯一的 JSON 配置文件狀態與工作流邏輯
  const workflow = useWorkflow([
    { id: "1", type: "DISCOUNT_FIXED", enabled: true, label: "滿額現折配置", payload: { threshold: 1000, discount: 100 } },
    { id: "2", type: "DISCOUNT_PERCENT", enabled: true, label: "季節折扣計算", payload: { rate: 0.9, stackable: false } }
  ]);
  
  // 2. 選中狀態（這屬於 UI 狀態，與配置文件分開）
  const [selectedId, setSelectedId] = useState<unknown>(null);
  const activeTask = workflow.payload.find(t => t.id === selectedId);

  return (
    <main id="orchestrator-root" className="flex h-screen w-full bg-[#f4f7f9] p-6 gap-6 font-sans text-slate-800">
      {/* 組件一：左側任務序列 */}
      <TaskSidebar 
        workflow={workflow} 
        selectedId={selectedId} 
        onSelect={setSelectedId} 
      />

      {/* 組件二：中間配置面板 */}
      <ConfigPanel 
        activeTask={activeTask} 
        onUpdateTask={(updated) => {
          workflow.setPayload(prev => prev.map(t => t.id === updated.id ? updated : t));
        }} 
      />

      {/* 組件三：右側日誌面板 */}
      <LogPanel />
    </main>
  );
}
