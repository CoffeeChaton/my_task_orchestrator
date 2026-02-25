// src/routes/demo2/LogPanel.tsx
import { useEffect, useRef, useState } from "react";

interface LogEntry {
  id: string;
  type: "text" | "image";
  content: string;
  time: string;
  tag?: string;
  tagColor?: string;
}

export function LogPanel() {
  const [logs] = useState<LogEntry[]>([
    { id: "1", type: "text", tag: "SYSTEM", tagColor: "text-blue-500", content: "引擎初始化完成，等待指令。", time: "10:45:01" },
    { id: "2", type: "text", tag: "CALC", tagColor: "text-green-500", content: "滿額現折計算：目標金額 $1,500，符合門檻。", time: "10:45:05" },
    { id: "3", type: "image", content: "https://via.placeholder.com/300x180", time: "10:45:10" },
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    // 💡 關鍵修復：確保父層擁有 flex-1 且為 flex-col，撐滿 section
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-600">系統日誌</h3>
        <button className="text-[10px] uppercase tracking-wider text-slate-400 hover:text-blue-600 transition-colors">
          Export Log
        </button>
      </header>
      
      {/* 💡 滾動區域：flex-1 自動佔滿剩餘空間 */}
      <div 
        id="log-viewport" 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-[13px] custom-scrollbar"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex flex-col gap-1">
            <div className="flex gap-3 items-start">
              <span className="text-slate-300 shrink-0 tabular-nums">{log.time}</span>
              {log.tag && (
                <span className={`${log.tagColor} font-bold shrink-0`}>[{log.tag}]</span>
              )}
              {log.type === "text" && (
                <span className="text-slate-600 leading-relaxed">{log.content}</span>
              )}
            </div>

            {log.type === "image" && (
              <div className="ml-16 mt-1 group relative inline-block">
                <div className="absolute -top-4 left-0 text-[10px] text-slate-400 italic opacity-0 group-hover:opacity-100 transition-opacity">
                  Captured screenshot at {log.time}
                </div>
                <img 
                  src={log.content} 
                  alt="log-capture" 
                  className="rounded-lg border border-slate-200 shadow-sm max-w-full hover:border-blue-300 transition-all cursor-zoom-in"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
