// src/routes/demo2/ConfigPanel/ConfigPanel.tsx
import { TaskDetailSlot } from "../TaskSidebar/TaskDetailSlot";
import type { TaskInstance } from "../types";

const AnnouncementArea = () => {
  /* 公告區：參考圖片下方提示佈局 */
  return (
    < div className="mt-20 pt-10 border-t border-slate-100 text-center space-y-4" >
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-[11px] text-slate-400 font-bold uppercase tracking-widest">
        公告
      </div>
      <div className="text-sm text-slate-500 font-mono space-y-1.5">
        <p> 錢包轉帳功能於 2026年3月1日 00:00 ~ 00:10 維護不可用</p>
        <p> 全平台免手續優惠，持續至 2026年3月10日 00:00 </p>
        <div className="pt-2 text-slate-400 italic">
          關注 Line 帳號，獲取更多優惠訊息
        </div>
      </div>
    </div >
  )
}

interface ConfigPanelProps {
  // activeTask 可能是 null (初始狀態或刪除後)
  activeTask: TaskInstance | null;
  // onUpdate 接收完整的任務物件，以便同步更新 label 或 payload
  onUpdate: (updatedTask: TaskInstance) => void;
}

export const ConfigPanel = ({ activeTask, onUpdate }: ConfigPanelProps) => {
  return (
    <section className="flex-1 bg-white lg:rounded-2xl rounded-t-2xl shadow-sm border border-slate-100 flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTask ? (
          <div className="p-4 lg:p-10 max-w-4xl mx-auto w-full space-y-8">
            <header className="flex flex-col gap-1 border-b border-slate-50 pb-4">
              <div className="text-[10px] font-mono text-blue-500 font-bold uppercase tracking-wider">
                Task Configuration
              </div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">
                {activeTask.label} <span className="text-slate-300 font-light ml-2">#{activeTask.id}</span>
              </h2>
            </header>

            {/* 插槽內容：在行動端會自動切換為一欄佈局 */}
            <div className="min-h-75">
              <TaskDetailSlot
                task={activeTask}
                onChange={(p) => {
                  // 透過強型別斷言 (as TaskInstance) 解決 Union 類型不相容的問題
                  onUpdate({
                    ...activeTask,
                    payload: p
                  } as TaskInstance);
                }}
              />
            </div>

            {/* 提示區在手機端可以縮小間距 */}
            <div className="pt-10 opacity-50">
              <AnnouncementArea />
            </div>
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-slate-300">
            <p>請選擇任務</p>
          </div>
        )}
      </div>
    </section>
  );
};
