src/routes/demo2/
├── index.tsx              # 主入口：只負責狀態分發與佈局
├── TaskSidebar.tsx        # 左側：任務序列 + 執行控制
├── ConfigPanel.tsx        # 中間：插槽配置面版
├── LogPanel.tsx           # 右側：日誌控制台
├── types.ts               # 嚴格類型定義 (unknown)
└── useWorkflow.ts         # 狀態邏輯
