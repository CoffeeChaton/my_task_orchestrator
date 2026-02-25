// src/routes/demo2/SortableItem.tsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TaskInstance } from './types';

export function SortableItem({ 
  task, 
  isActive, 
  onClick, 
  onToggle 
}: { 
  task: TaskInstance; 
  isActive: boolean; 
  onClick: () => void;
  onToggle: (enabled: boolean) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      id={`task-item-${task.id}`}
      className={`flex items-center gap-3 p-3 rounded-lg border mb-2 cursor-pointer transition-all ${
        isActive ? "bg-blue-50 border-blue-200 shadow-sm" : "bg-white border-slate-100 hover:border-slate-300"
      }`}
      onClick={onClick}
    >
      {/* 拖拽手把 - 只有這裡可以觸發拖拽，避免干擾 checkbox */}
      <div {...attributes} {...listeners} className="cursor-grab text-slate-300 hover:text-slate-500 px-1">
        ⋮⋮
      </div>
      
      {/* 修復點 2: 勾選功能 - 加上 stopPropagation 確保不觸發外層 onClick */}
      <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
        <input 
          type="checkbox" 
          id={`check-${task.id}`}
          checked={task.enabled} 
          onChange={(e) => onToggle(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      </div>
      
      <span className={`text-sm flex-1 truncate ${!task.enabled ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
        {task.label}
      </span>
    </div>
  );
}
