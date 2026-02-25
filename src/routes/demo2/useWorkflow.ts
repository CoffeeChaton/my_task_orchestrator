// src/routes/demo2/useWorkflow.ts
import { useState, useCallback, useEffect } from "react";
import type { TTaskConfig } from "./types";

const STORAGE_KEY = "taskconfig";

const initialData: TTaskConfig = {
  head: { lastUpdated: new Date().toISOString(), activeTask: null },
  body: []
};

export const useWorkflow = () => {
  const [config, setConfigInternal] = useState<TTaskConfig>(() => {
    if (typeof window === 'undefined') return initialData;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialData;
    try {
      const parsed = JSON.parse(saved) as TTaskConfig;
      // 畫面重新載入時，根據陣列順序重新賦予 id (自增序號)
      parsed.body = parsed.body.map((task, idx) => ({ ...task, id: idx + 1 }));
      return parsed;
    } catch {
      return initialData;
    }
  });

  // 自動持久化
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

const setConfig = useCallback((updater: (prev: TTaskConfig) => TTaskConfig) => {
    setConfigInternal(prev => {
      const next = updater(structuredClone(prev));
      
      // 比較 body 是否變動 (簡單字串化比較或深度比較)
      const isBodyChanged = JSON.stringify(prev.body) !== JSON.stringify(next.body);

      // 1. 強制執行 ID 校準
      next.body = next.body.map((task, idx) => ({
        ...task,
        id: idx + 1
      }));

      // 2. 只有 body 變動時才更新時間戳
      if (isBodyChanged) {
        next.head.lastUpdated = new Date().toISOString();
      }

      return next;
    });
  }, []);

  return { config, setConfig };
};
