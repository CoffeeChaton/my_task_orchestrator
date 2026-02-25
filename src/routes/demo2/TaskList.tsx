// src/routes/demo2/TaskList.tsx
import type { TaskInstance } from '@/src/routes/demo2/types';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
 

interface Props {
  tasks: TaskInstance[];
  onReorder: (tasks: TaskInstance[]) => void;
  onSelect: (id: string) => void;
  activeId: string | unknown; // 遵照指令使用 unknown
}

export function TaskList({ tasks, onReorder, onSelect, activeId }: Props) {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      onReorder(arrayMove(tasks, oldIndex, newIndex));
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {tasks.map((task) => (
            <SortableItem 
              key={task.id} 
              task={task} 
              isActive={activeId === task.id}
              onClick={() => onSelect(task.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
