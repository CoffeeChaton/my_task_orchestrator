// src/routes/demo2/LogConsole.tsx
import { useEffect, useRef, useState } from "react";

interface LogEntry {
  id: string;
  type: "text" | "image";
  content: string;
  time: string;
}

export function LogConsole() {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", type: "text", content: "系統啟動中...", time: "22:39:44" },
    { id: "2", type: "image", content: "https://via.placeholder.com/150", time: "22:39:48" }, // 模擬圖片
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // 自動捲動到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
   <>
      <header className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-600">系統日誌</h3>
        <button className="text-[10px] uppercase tracking-wider text-slate-400 hover:text-slate-600">Export Log</button>
      </header>
      <div id="log-viewport" className="flex-1 p-4 overflow-y-auto space-y-3 bg-white font-mono text-[13px]">
        <div className="flex gap-3">
          <span className="text-slate-300">10:45:01</span>
          <span className="text-blue-500 font-medium">[SYSTEM]</span>
          <span className="text-slate-600">引擎初始化完成，等待指令。</span>
        </div>
        <div className="flex gap-3">
          <span className="text-slate-300">10:45:05</span>
          <span className="text-green-500 font-medium">[CALC]</span>
          <span className="text-slate-600">滿額現折計算：目標金額 $1,500，符合門檻。</span>
        </div>
        {/* 圖片輸出示意 */}
        <div className="ml-16 mt-2 p-2 bg-slate-50 border border-slate-100 rounded-lg inline-block">
          <p className="text-[10px] text-slate-400 mb-2 italic">Captured screenshot at step #2</p>
          <div className="w-32 h-20 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>
    </>
  );
}
