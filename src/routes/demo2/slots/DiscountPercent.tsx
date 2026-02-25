// src/routes/demo2/slots/DiscountPercent.tsx
export function DiscountPercent({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <label className="block text-sm font-medium text-slate-500 mb-2">折扣比例 (0.1 ~ 1.0)</label>
        <div className="flex items-center gap-4">
          <input 
            type="range" min="0.1" max="1" step="0.05"
            value={data.rate}
            onChange={(e) => onChange({ ...data, rate: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="font-mono font-bold text-blue-600">{(data.rate * 100).toFixed(0)}%</span>
        </div>
      </div>
      <div className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
        <input 
          type="checkbox" id="stack"
          checked={data.stackable}
          onChange={(e) => onChange({ ...data, stackable: e.target.checked })}
          className="w-4 h-4 text-blue-600 rounded"
        />
        <label htmlFor="stack" className="ml-3 text-sm font-medium text-slate-700 cursor-pointer">
          允許與其他活動疊加計算
        </label>
      </div>
    </div>
  );
}
