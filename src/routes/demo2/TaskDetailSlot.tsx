// src/routes/demo2/TaskDetailSlot.tsx
import { DiscountFixed } from "./slots/DiscountFixed";
import { DiscountPercent } from "./slots/DiscountPercent";
import { type TaskInstance } from "./types";

// 定義插槽映射表
const SLOT_MAP: Record<string, React.FC<{ data: unknown; onChange: (d: unknown) => void }>> = {
  DISCOUNT_FIXED: DiscountFixed,
  DISCOUNT_PERCENT: DiscountPercent,
};

export function TaskDetailSlot({ task, onChange }: { task: TaskInstance; onChange: (p: unknown) => void }) {
  const SpecificConfig = SLOT_MAP[task.type];

  if (!SpecificConfig) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-100 text-amber-700 rounded-lg">
        尚未定義任務類型 <strong>{task.type}</strong> 的配置介面。
      </div>
    );
  }

  return <SpecificConfig data={task.payload} onChange={onChange} />;
}
