// src/routes/demo2/TaskSidebar/schema-validator.ts
import { z } from "zod";

// 定義子 Schema
const RewardSchema = z.object({
  items: z.array(z.string())
});

const DiscountFixedSchema = z.object({
  threshold: z.number().min(0),
  discount: z.number().min(0)
});

const DiscountPercentSchema = z.object({
threshold: z.number().min(0).default(0),
  rate: z.number().min(0.1).max(1),
  stackable: z.boolean().default(false)
});

const ParkingStrategySchema = z.object({
  mode: z.enum(['FIXED', 'HOURLY', 'PROGRESSIVE']),
  baseRate: z.number().min(0),
  freeMinutes: z.number().min(0).max(120),
  maxDailyCharge: z.number().min(0),
  thresholds: z.object({
    offlineMinutes: z.number().min(1),
    lowBattery: z.number().min(5).max(30),
  }),
  specialRates: z.object({
    isElectricVehicle: z.boolean(),
    isSharedBike: z.boolean(),
  }),
});

// 核心：判別聯集驗證
export const TaskInstanceSchema = z.discriminatedUnion("type", [
  z.object({ id: z.number(), enabled: z.boolean(), label: z.string(), type: z.literal("REWARD"), payload: RewardSchema }),
  z.object({ id: z.number(), enabled: z.boolean(), label: z.string(), type: z.literal("DISCOUNT_FIXED"), payload: DiscountFixedSchema }),
  z.object({ id: z.number(), enabled: z.boolean(), label: z.string(), type: z.literal("DISCOUNT_PERCENT"), payload: DiscountPercentSchema }),
  z.object({ id: z.number(), enabled: z.boolean(), label: z.string(), type: z.literal("PARKING_STRATEGY"), payload: ParkingStrategySchema }),
]);

export const TaskConfigSchema = z.object({
  head: z.object({
    lastUpdated: z.string().datetime({ offset: true }),
    activeTask: z.number().nullable(),
  }),
  body: z.array(TaskInstanceSchema),
});

// 直接從 Schema 推導型別，確保代碼與驗證 100% 同步
export type TTaskConfig = z.infer<typeof TaskConfigSchema>;

export function validateTaskConfig(data: unknown): TTaskConfig | null {
  const result = TaskConfigSchema.safeParse(data);
  return result.success ? result.data : null;
}
