// src/routes/demo2/types.ts

// 1. 各任務專屬的 Payload 定義
export interface RewardPayload {
  items: string[];
}

export interface DiscountFixedPayload {
  threshold: number;
  discount: number;
}

export interface DiscountPercentPayload {
  threshold: number;
  percentage: number;
  maxDiscount?: number;
}

// 2. 使用 Discriminated Unions 確保類型安全
// 這樣當 type === "REWARD" 時，TS 會自動知道 payload 是 RewardPayload
export type TaskInstance = 
  | { id: number; enabled: boolean; label: string; type: "REWARD"; payload: RewardPayload }
  | { id: number; enabled: boolean; label: string; type: "DISCOUNT_FIXED"; payload: DiscountFixedPayload }
  | { id: number; enabled: boolean; label: string; type: "DISCOUNT_PERCENT"; payload: DiscountPercentPayload };

export interface TTaskConfig {
  head: {
    lastUpdated: string; // ISO 8601
    activeTask: number | null;
  };
  body: TaskInstance[];
}

export type TaskUpdater = (prev: TTaskConfig) => TTaskConfig;

export interface LogEntry {
  id: string;
  timestamp: number;
  type: 'text' | 'image';
  content: string;
}
