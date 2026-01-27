"use client";

import { ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonItem {
  id: string;
  title: string;
  processed: boolean;
  children?: LessonItem[];
}

interface LessonSidebarProps {
  items: LessonItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
}

export function LessonSidebar({
  items,
  activeId,
  onItemClick,
}: LessonSidebarProps) {
  return (
    <aside className="w-64 bg-sidebar border-r border-white/5 flex flex-col h-screen overflow-y-auto">
      <div className="p-4 border-b border-white/5">
        <h2 className="text-sm font-semibold text-foreground tracking-tight">
          Lessons
        </h2>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => (
          <LessonTreeNode
            key={item.id}
            item={item}
            activeId={activeId}
            onItemClick={onItemClick}
            level={0}
          />
        ))}
      </nav>
    </aside>
  );
}

function LessonTreeNode({
  item,
  activeId,
  onItemClick,
  level = 0,
}: {
  item: LessonItem;
  activeId?: string;
  onItemClick?: (id: string) => void;
  level: number;
}) {
  const isActive = item.id === activeId;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <button
        onClick={() => onItemClick?.(item.id)}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-2 rounded-sm text-xs transition-colors",
          "hover:bg-white/5",
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground",
        )}
        style={{ paddingLeft: `${12 + level * 12}px` }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {item.processed && (
            <Check className="w-3 h-3 text-primary shrink-0" />
          )}
          <span className="truncate">{item.title}</span>
        </div>
        {hasChildren && <ChevronRight className="w-3 h-3 shrink-0" />}
      </button>
      {hasChildren && (
        <div>
          {(item.children ?? []).map((child) => (
            <LessonTreeNode
              key={child.id}
              item={child}
              activeId={activeId}
              onItemClick={onItemClick}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
