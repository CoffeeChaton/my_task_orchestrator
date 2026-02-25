// src/components/demo2/TaskDetailSlot.tsx
// import { RecruitConfig } from "./slots/RecruitConfig";
// import { BaseConfig } from "./slots/BaseConfig";
import type { TaskInstance } from "@/src/routes/demo2/types";

const SLOT_MAP: Record<string, React.FC<{ data: unknown, onChange: (p: unknown) => void }>> = {
  // RECRUIT: RecruitConfig,
  // BASE: BaseConfig,
  // 未來增加新任務只需在此擴充
};

export function TaskDetailSlot({ task, onChange }: { task: TaskInstance, onChange: (p: unknown) => void }) {
  const SpecificConfig = SLOT_MAP[task.type];

  if (!SpecificConfig) return <div>此任務類型無配置項</div>;

  return <SpecificConfig data={task.payload} onChange={onChange} />;
}
