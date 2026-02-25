// src/routes/demo2/TaskSidebar/TaskDetailSlot.tsx
import { RewardTask } from "../slots/RewardTask";
import { DiscountFixed } from "../slots/DiscountFixed";
import { DiscountPercent } from "../slots/DiscountPercent";
import type { TaskInstance } from "../types";

interface Props {
  task: TaskInstance;
  onChange: (payload: TaskInstance["payload"]) => void;
}

export const TaskDetailSlot = ({ task, onChange }: Props) => {
  // 透過 switch-case 觸發 TypeScript 的辨識型別縮減 (Narrowing)
  switch (task.type) {
    case "REWARD":
      return <RewardTask data={task.payload} onChange={onChange} />;
    case "DISCOUNT_FIXED":
      return <DiscountFixed data={task.payload} onChange={onChange} />;
    case "DISCOUNT_PERCENT":
      return <DiscountPercent data={task.payload} onChange={onChange} />;
    default:
      return <div className="p-4 text-red-500">未知任務類型</div>;
  }
};
