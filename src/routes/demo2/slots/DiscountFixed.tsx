// src/routes/demo2/slots/DiscountFixed.tsx
interface DiscountFixedData {
  threshold: number;
  discount: number;
}

export function DiscountFixed({ data, onChange }: { data: unknown; onChange: (d: unknown) => void }) {
  // 類型安全處理：將 unknown 轉換為內部使用的類型
  const config = data as DiscountFixedData;

  const updateField = (field: keyof DiscountFixedData, value: number) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-700 font-medium">策略說明：當訂單總額超過門檻時，直接扣除固定金額。</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">消費門檻 (TWD)</label>
          <input 
            type="number" 
            value={config.threshold || 0}
            onChange={(e) => updateField('threshold', Number(e.target.value))}
            className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">折扣金額</label>
          <input 
            type="number" 
            value={config.discount || 0}
            onChange={(e) => updateField('discount', Number(e.target.value))}
            className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
