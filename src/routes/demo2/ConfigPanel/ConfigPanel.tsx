// src/routes/demo2/ConfigPanel/ConfigPanel.tsx
import { TaskDetailSlot } from "../TaskSidebar/TaskDetailSlot";

const D3 = () => {
  /* 公告區：參考圖片下方提示佈局 */
  return (
    < div className="mt-20 pt-10 border-t border-slate-100 text-center space-y-4" >
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-[11px] text-slate-400 font-bold uppercase tracking-widest">
        今日活動提示 ?
      </div>
      <div className="text-sm text-slate-500 font-mono space-y-1.5">
        <p>「資源收集」剩餘天數：19</p>
        <p>「辭歲行」剩餘天數：5</p>
        <div className="pt-2 text-slate-400 italic">
          TA-9: 環煙聚質 / TA-8: 褐素纖維 / TA-7: 凝膠
        </div>
      </div>
    </div >
  )
}

export const ConfigPanel = ({ activeTask, onUpdate }: any) => {
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
            <div className="min-h-[300px]">
              <TaskDetailSlot
                task={activeTask}
                onChange={(p: unknown) => onUpdate({ ...activeTask, payload: p })}
              />
            </div>

            {/* 提示區在手機端可以縮小間距 */}
            <div className="pt-10 opacity-50">
              <D3 />
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
