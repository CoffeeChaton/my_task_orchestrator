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
  threshold: number; // 建議保留門檻，若不需要可移除
  rate: number;      // 0.1 ~ 1.0
  stackable: boolean; // 是否疊加
}

export interface ParkingStrategyPayload {
  mode: 'FIXED' | 'HOURLY' | 'PROGRESSIVE'; // 固定、計時、累進
  baseRate: number;        // 基礎費率
  freeMinutes: number;     // 免費停車時間
  maxDailyCharge: number;  // 單日最高收費
  // 設備監控相關
  thresholds: {
    offlineMinutes: number; // 設備離線幾分鐘觸發告警
    lowBattery: number;     // 低電量告警閾值 (%)
  };
  specialRates: {
    isElectricVehicle: boolean; // 電動車優惠
    isSharedBike: boolean;      // 共享機車優惠
  };
}

// 2. 使用 Discriminated Unions 確保類型安全
// 這樣當 type === "REWARD" 時，TS 會自動知道 payload 是 RewardPayload
export type TaskInstance =
  | { id: number; enabled: boolean; label: string; type: "PARKING_STRATEGY"; payload: ParkingStrategyPayload }
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
