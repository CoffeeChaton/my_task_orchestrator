export interface TaskInstance {
  id: string;        // 唯一標識，用於拖曳排序
  type: string;      // 任務類型，對應不同的插槽 UI
  enabled: boolean;  // 是否勾選執行
  label: string;     // 顯示名稱
  payload: unknown;      // 該任務的專屬細節配置
}

// 用於更新任務配置的函數類型
export type TaskUpdater = (prev: TaskInstance[]) => TaskInstance[];

export interface LogEntry {
  id: string;
  timestamp: number;
  type: 'text' | 'image';
  content: string; // 文本內容或圖片 Base64/URL
}
