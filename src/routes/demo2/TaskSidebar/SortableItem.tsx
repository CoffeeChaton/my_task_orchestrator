// src/routes/demo2/TaskSidebar/SortableItem.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  task: { id: number; enabled: boolean; label: string };
  isActive: boolean;
  onClick: () => void;
  onToggle: (id: number, enabled: boolean) => void;
  onRemove: (id: number) => void; // 確保類型定義
}

export const SortableItem = ({ task, isActive, onClick, onToggle, onRemove }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`group flex items-center gap-2 p-2 rounded-xl border transition-all ${
        isActive ? "bg-blue-50 border-blue-400 shadow-sm" : "bg-white border-slate-100"
      } ${isDragging ? "opacity-50 scale-105 shadow-xl" : ""}`}
    >
      {/* 拖曳手柄 */}
      <div
        {...attributes}
        {...listeners}
        className="p-2 -ml-1 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5 4h2v2H5V4zm4 0h2v2H9V4zM5 7h2v2H5V7zm4 0h2v2H9V7zm-4 3h2v2H5v-2zm4 0h2v2H9v-2z" />
        </svg>
      </div>

      <span className="text-[10px] font-mono text-slate-400 w-6">
        #{String(task.id).padStart(2, '0')}
      </span>

      <input
        type="checkbox"
        checked={task.enabled}
        onChange={(e) => {
          e.stopPropagation();
          onToggle(task.id, e.target.checked);
        }}
        className="size-4 rounded-md border-slate-300 text-blue-600"
      />

      <span className="flex-1 text-sm truncate font-semibold text-slate-700">
        {task.label}
      </span>

      {/* 修復點：在行動端取消 opacity-0，讓使用者點得到刪除 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (typeof onRemove === 'function') {
            onRemove(task.id);
          }
        }}
        className="p-1.5 text-slate-300 hover:text-red-500 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
