// src/routes/demo2/ControlButtons.tsx
import { useState } from "react";
import type { TaskInstance } from "../types";
import { ConfigDialog } from "./ConfigDialog";

interface Props {
  tasks: TaskInstance[];
  onImport: (tasks: TaskInstance[]) => void;
  onAddTask: (type: string) => void;
}

export function ControlButtons({ tasks, onImport, onAddTask }: Props) {
  const [showConfig, setShowConfig] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex gap-1">
        {/* 新增按鈕 */}
        <button
          onClick={() => setShowAddMenu(true)}
          className="p-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          ＋ Add
        </button>

        {/* 導入導出按鈕 */}
        <button
          onClick={() => setShowConfig(true)}
          className="p-2 border rounded hover:bg-accent"
        >
          ⇄ JSON
        </button>
      </div>

      {/* 齒輪按鈕 */}
      <button className="p-2 text-muted-foreground hover:text-foreground">
        ⚙️
      </button>

      {/* 頂級遮罩對話框 - 新增任務選單 */}
      {showAddMenu && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
          <div className="bg-card p-4 rounded-lg shadow-xl border w-64">
            <h4 className="font-bold mb-3">選擇任務類型</h4>
            <div className="space-y-2">
              {["RECRUIT", "BASE", "COMBAT"].map(type => (
                <button
                  key={type}
                  onClick={() => { onAddTask(type); setShowAddMenu(false); }}
                  className="w-full text-left p-2 hover:bg-accent rounded"
                >
                  {type} 任務
                </button>
              ))}
            </div>
            <button onClick={() => setShowAddMenu(false)} className="w-full mt-4 text-xs text-muted-foreground">關閉</button>
          </div>
        </div>
      )}

      {/* 配置對話框 */}
      {showConfig && (
        <ConfigDialog
          currentTasks={tasks}
          onImport={onImport}
          onClose={() => setShowConfig(false)}
        />
      )}
    </div>
  );
}
