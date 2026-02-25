// src/routes/demo2/useWorkflow.ts
import { useState, useCallback } from "react";
import type { TaskInstance } from "./types";

export function useWorkflow(initialTasks: TaskInstance[]) {
    const [tasks, setTasks] = useState<TaskInstance[]>(initialTasks);
    const [status, setStatus] = useState<string>("IDLE");

    const setPayload = useCallback((updater: (prev: TaskInstance[]) => TaskInstance[]) => {
        setTasks(prev => {
            const next = updater(prev);
            // 僅在內容真正改變時才回傳新引用，利於 Compiler 優化
            return next === prev ? prev : next;
        });
    }, []);

    const sendSignal = useCallback((signal: unknown) => {
        console.log("收到訊號:", signal);
        // 實作中斷或通訊邏輯
    }, []);

    const run = useCallback(() => {
        setStatus("RUNNING");
    }, []);

    return {
        status,
        payload: tasks, // 這裡的 payload 就是任務清單
        setPayload,
        run,
        sendSignal,
    };
}
