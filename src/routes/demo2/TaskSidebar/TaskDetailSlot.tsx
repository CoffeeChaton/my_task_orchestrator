// src/routes/demo2/TaskSidebar/TaskDetailSlot.tsx
import { RewardTask } from "../slots/RewardTask"; // 💡 確保有匯入新組件
import { DiscountFixed } from "../slots/DiscountFixed";
import { DiscountPercent } from "../slots/DiscountPercent";

const SLOT_MAP: Record<string, React.FC<{ data: unknown; onChange: (d: unknown) => void }>> = {
  REWARD: RewardTask, // 💡 在這裡註冊
  DISCOUNT_FIXED: DiscountFixed,
  DISCOUNT_PERCENT: DiscountPercent,
};

export const TaskDetailSlot = ({ task, onChange }: any) => {
  const SpecificConfig = SLOT_MAP[task.type];
  if (!SpecificConfig) return <div className="p-4 text-red-400">類型 {task.type} 缺失組件</div>;
  return <SpecificConfig data={task.payload} onChange={onChange} />;
};
