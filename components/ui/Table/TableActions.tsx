"use client";

import { ActionConfig } from "@/components/ui/Table/types";

interface TableActionsProps<T> {
  item: T;
  actions: ActionConfig<T>[];
}

export default function TableActions<T>({ item, actions }: TableActionsProps<T>) {
  
  const getVariantClasses = (variant: string) => {
    switch(variant) {
      case 'primary': return 'bg-primary-badge-bg text-primary-badge hover:bg-primary-badge-bg/80 dark:bg-primary-badge-bg/20 dark:text-primary-badge';
      case 'danger': return 'bg-danger-badge-bg text-danger-badge hover:bg-danger-badge-bg/80 dark:bg-danger-badge-bg/20 dark:text-danger-badge';
      case 'success': return 'bg-success-badge-bg text-success-badge hover:bg-success-badge-bg/80 dark:bg-success-badge-bg/20 dark:text-success-badge';
      case 'warning': return 'bg-warning-badge-bg text-warning-badge hover:bg-warning-badge-bg/80 dark:bg-warning-badge-bg/20 dark:text-warning-badge';
      default: return 'bg-surface text-muted hover:bg-surface/80';
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            action.onClick(item);
          }}
          className={`p-2 rounded-md transition-colors ${getVariantClasses(action.variant || 'secondary')} ${action.className || ''}`}
          title={action.label}
        >
          {action.icon}
        </button>
      ))}
    </div>
  );
}