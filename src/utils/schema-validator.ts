// src/utils/schema-validator.ts
import type { TaskInstance } from "@/src/routes/demo2/types";

export function isTaskArray(data: unknown): data is TaskInstance[] {
    return Array.isArray(data) && data.every(item =>
        typeof item === 'object' && item !== null && 'id' in item && 'type' in item
    );
}
