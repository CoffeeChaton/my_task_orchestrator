// src/routes/demo2/TaskList.tsx
import { useMemo } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from "./SortableItem";

export function TaskList({ tasks, onReorder, onSelect, onToggle, activeId }: any) {
  // 💡 修復崩潰關鍵：使用 useMemo 固化 sensors，防止拖拽中途觸發 Re-render 導致 Context 遺失
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const taskIds = useMemo(() => tasks.map((t: any) => t.id), [tasks]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((t: any) => t.id === active.id);
      const newIndex = tasks.findIndex((t: any) => t.id === over.id);
      onReorder(() => arrayMove(tasks, oldIndex, newIndex)); // 確保使用函數式更新
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="task-list-container">
          {tasks.map((task: any) => (
            <SortableItem 
              key={task.id} 
              task={task} 
              isActive={activeId === task.id}
              onClick={() => onSelect(task.id)}
              onToggle={(enabled: boolean) => onToggle(task.id, enabled)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
