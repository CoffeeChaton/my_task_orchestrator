// src/components/demo2/ConfigDialog.tsx
import { isTaskArray } from "@/src/utils/schema-validator";
import { useState } from "react";
import type { TaskInstance } from "../types";

export function ConfigDialog({ currentTasks, onImport, onClose }: {
    currentTasks: unknown; // 遵循指令，不使用 any
    onImport: (data: TaskInstance[]) => void;
    onClose: () => void;
}) {
    const [tab, setTab] = useState<"export" | "import">("export");
    const [importText, setImportText] = useState("");
    const jsonString = JSON.stringify(currentTasks, null, 2);

    const handleImport = () => {
        try {
            const parsed: unknown = JSON.parse(importText);
            if (isTaskArray(parsed)) {
                onImport(parsed);
                onClose();
            } else {
                alert("JSON 格式不符合 TaskInstance 結構");
            }
        } catch {
            alert("無效的 JSON 格式");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-card w-125 rounded-lg shadow-xl overflow-hidden border">
                <div className="flex border-b bg-muted/50">
                    <button
                        className={`flex-1 p-3 ${tab === "export" ? "bg-card font-bold" : ""}`}
                        onClick={() => setTab("export")}
                    >導出配置</button>
                    <button
                        className={`flex-1 p-3 ${tab === "import" ? "bg-card font-bold" : ""}`}
                        onClick={() => setTab("import")}
                    >導入配置</button>
                </div>

                <div className="p-4">
                    {tab === "export" ? (
                        <div className="space-y-4">
                            <textarea readOnly className="w-full h-48 font-mono text-xs p-2 bg-slate-50 border rounded" value={jsonString} />
                            <button
                                onClick={() => navigator.clipboard.writeText(jsonString)}
                                className="w-full py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
                            >一鍵複製 JSON</button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <textarea
                                className="w-full h-48 font-mono text-xs p-2 border rounded"
                                placeholder="請貼上配置 JSON..."
                                value={importText}
                                onChange={(e) => setImportText(e.target.value)}
                            />
                            <button
                                onClick={handleImport}
                                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >確認導入</button>
                        </div>
                    )}
                </div>
                <button onClick={onClose} className="w-full p-2 text-sm text-muted-foreground border-t">取消</button>
            </div>
        </div>
    );
}
