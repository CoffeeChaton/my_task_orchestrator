// src/routes/demo2/SortableItem.tsx
import type { TaskInstance } from '@/src/routes/demo2/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({ task, isActive, onClick }: { task: TaskInstance; isActive: boolean; onClick: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors ${isActive ? "bg-primary/10 border-primary" : "bg-card hover:bg-accent"
                }`}
            onClick={onClick}
        >
            {/* 拖拽手把 */}
            <div {...attributes} {...listeners} className="cursor-grab text-muted-foreground">
                ⋮⋮
            </div>

            <input
                type="checkbox"
                checked={task.enabled}
                onChange={(e) => {/* 更新狀態邏輯 */ console.warn("TODO 更新狀態邏輯", e) }}
                onClick={(e) => e.stopPropagation()} // 防止點擊勾選框觸發選擇任務
            />

            <span className="text-sm truncate flex-1">{task.label}</span>

            <div className="w-2 h-2 rounded-full bg-green-500" title="任務就緒" />
        </div>
    );
}
