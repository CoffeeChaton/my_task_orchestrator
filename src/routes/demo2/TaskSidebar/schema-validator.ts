// src/routes/demo2/TaskSidebar/schema-validator.ts
import { z } from "zod";

import type { TaskInstance } from "@/src/routes/demo2/types";

export function isTaskArray(data: unknown): data is TaskInstance[] {
    return Array.isArray(data) && data.every(item =>
        typeof item === 'object' && item !== null && 'id' in item && 'type' in item
    );
}

// 定義單個任務的驗證規則
export const TaskInstanceSchema = z.object({
  id: z.number(),
  enabled: z.boolean(),
  label: z.string(),
  type: z.string(),
  payload: z.unknown(), // 允許任何內容，由具體插槽處理
});

// 定義整個配置文件的驗證規則
export const TaskConfigSchema = z.object({
  head: z.object({
    lastUpdated: z.string().datetime({ offset: true }), // 強制要求帶時區的 ISO 格式
    activeTask: z.number().nullable(),
  }),
  body: z.array(TaskInstanceSchema),
});

export type TTaskConfig = z.infer<typeof TaskConfigSchema>;

// 安全驗證函數
export function validateTaskConfig(data: unknown): TTaskConfig | null {
  const result = TaskConfigSchema.safeParse(data);
  return result.success ? result.data : null;
}
