// src/routes/demo2/TaskSidebar/TaskList.tsx
import { useSensors, useSensor, PointerSensor, DragEndEvent, DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

export const TaskList = ({ tasks, activeId, onSelect, onReorder, onRemove, onToggle }: unknown) => {
   const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 8 }
  }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((t: any) => t.id === active.id);
      const newIndex = tasks.findIndex((t: any) => t.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        // 1. 計算排序後的陣列
        const moved = arrayMove([...tasks], oldIndex, newIndex);

        // 2. 因為 useWorkflow 會執行 ID 校準 (1, 2, 3...)
        // 所以原本被選中的項目 ID，現在會變成 (newIndex + 1)
        const nextActiveId = activeId === active.id ? (newIndex + 1) : activeId;

        // 3. 同步傳回新的 tasks 與正確的高亮 ID
        onReorder(moved, nextActiveId);
      }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map((t: any) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-1.5">
          {tasks.map((task: any, index: number) => (
            <SortableItem
              key={task.id}
              task={task}
              isActive={activeId === task.id}
              onClick={() => onSelect(task.id)}
              onRemove={onRemove} // 必須傳遞
              onToggle={onToggle} // 必須傳遞
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
