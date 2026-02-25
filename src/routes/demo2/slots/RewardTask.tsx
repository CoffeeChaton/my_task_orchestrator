import type { TaskInstance } from "../types";

// src/routes/demo2/slots/RewardTask.tsx
interface RewardPayload {
  items: string[];
}

export const RewardTask = ({ data, onChange }: { data: unknown; onChange: (payload: TaskInstance["payload"]) => void; }) => {
  const payload = (data as RewardPayload)?.items || [];

  const options = [
    { id: 'daily', label: '領取每日 / 每週任務獎勵' },
    { id: 'mail', label: '領取所有郵件獎勵' },
    { id: 'free_pull', label: '進行限定池贈送的每日免費單抽' },
    { id: 'synthetic', label: '收集幸運牆的每日合成玉獎勵' },
    { id: 'time_limited', label: '領取限時採礦許可的每日合成玉獎勵' },
  ];

  const toggle = (id: string) => {
    const next = payload.includes(id) ? payload.filter(i => i !== id) : [...payload, id];
    onChange({ items: next });
  };

  return (
    <div className="space-y-4">
      {options.map(opt => (
        <label key={opt.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={payload.includes(opt.id)}
            onChange={() => toggle(opt.id)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-700">{opt.label}</span>
        </label>
      ))}
    </div>
  );
};
