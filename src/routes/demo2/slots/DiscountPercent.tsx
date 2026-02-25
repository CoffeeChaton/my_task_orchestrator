// src/routes/demo2/slots/DiscountPercent.tsx
import type { DiscountPercentPayload } from "../types";

interface DiscountPercentProps {
  data: DiscountPercentPayload;
  onChange: (updatedData: DiscountPercentPayload) => void;
}

export function DiscountPercent({ data, onChange }: DiscountPercentProps) {
  return (
    <div className="space-y-6 max-w-md animate-in fade-in duration-300">
      {/* 折扣比例控制 */}
      <div>
        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
          折扣比例 (0.1 ~ 1.0)
        </label>
        <div className="flex items-center gap-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
          <input 
            type="range" 
            min="0.1" 
            max="1" 
            step="0.05"
            value={data.rate}
            onChange={(e) => onChange({ ...data, rate: Number(e.target.value) })}
            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="min-w-[60px] text-right">
            <span className="font-mono font-black text-xl text-blue-600">
              {(data.rate * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {/* 疊加選項 */}
      <div 
        onClick={() => onChange({ ...data, stackable: !data.stackable })}
        className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
          data.stackable 
            ? "bg-blue-50 border-blue-200 shadow-sm" 
            : "bg-white border-slate-100 hover:border-slate-200"
        }`}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-slate-700">允許疊加計算</span>
          <span className="text-[10px] text-slate-400 font-medium">開啟後可與其他活動同時套用</span>
        </div>
        
        <div className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${data.stackable ? 'bg-blue-600' : 'bg-slate-200'}`}>
          <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${data.stackable ? 'translate-x-6' : 'translate-x-0'}`} />
        </div>
      </div>

      {/* 隱藏的 Checkbox 確保無障礙與數據同步 */}
      <input 
        type="checkbox" 
        className="hidden"
        checked={data.stackable}
        readOnly
      />
    </div>
  );
}
