// src/routes/demo2/TaskList.tsx
import { DndContext, closestCenter, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

export function TaskList({ tasks, onReorder, onSelect, onToggle, activeId }: any) {
  // 使用 Sensors 避免點擊與拖拽衝突
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((t: any) => t.id === active.id);
      const newIndex = tasks.findIndex((t: any) => t.id === over.id);
      onReorder(arrayMove(tasks, oldIndex, newIndex));
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {/* 關鍵：items 必須是 id 陣列 */}
      <SortableContext items={tasks.map((t: any) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="task-list-container">
          {tasks.map((task: any) => (
            <SortableItem 
              key={task.id} 
              task={task} 
              isActive={activeId === task.id}
              onClick={() => onSelect(task.id)}
              onToggle={(enabled) => onToggle(task.id, enabled)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
