// src/routes/demo2/slots/DiscountFixed.tsx
export function DiscountFixed({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-6 max-w-md">
      <div className="group">
        <label className="block text-sm font-medium text-slate-500 mb-2">滿額門檻 (TWD)</label>
        <input 
          type="number" 
          value={data.threshold}
          onChange={(e) => onChange({ ...data, threshold: Number(e.target.value) })}
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>
      <div className="group">
        <label className="block text-sm font-medium text-slate-500 mb-2">現折金額</label>
        <input 
          type="number" 
          value={data.discount}
          onChange={(e) => onChange({ ...data, discount: Number(e.target.value) })}
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>
    </div>
  );
}

