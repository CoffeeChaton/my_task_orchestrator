// 1. 畫面載入時 從 localStorage.getItem("taskconfig") 載入配置文件，當 配置文件有任何變動的時候，自動存入 localStorage

export interface TaskInstance<T = unknown> {
  id: number;        // 唯一標識，用於拖曳排序，原則是 自增序號，當 畫面重新載入的時候，重新排序
  enabled: boolean;  // 是否勾選執行
  label: string;     // 顯示名稱
  type: string;      // 任務類型，對應不同的插槽 UI
  payload: T;      // 該任務的專屬細節配置，與 type 對應，想辦法做 類型操作，取得安全的類型
}

export type TTaskConfig = {
  head: {
    lastUpdated: string; // ISO 8601 格式，含時區
    activeTask: number | null// 當前選擇的 任務 對應上面的 TaskInstance 的 id
  },
  body: TaskInstance[]; // 這裡暫用 any 是為了允許不同類型的 payload 存在陣列中
}

// 用於更新任務配置的函數，記得 遵守 React 規則
export type TaskUpdater = (prev: TTaskConfig) => TTaskConfig;

export interface LogEntry {
  id: string;
  timestamp: number;
  type: 'text' | 'image';
  content: string; // 文本內容或圖片 Base64/URL
}
