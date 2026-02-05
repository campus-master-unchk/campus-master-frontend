"use client";

import { ReactNode } from 'react';
import { ColumnConfig, ActionConfig } from "@/components/ui/Table/types";
import TableCell from './TableCell';
import TableActions from './TableActions';

interface TableRowProps<T> {
  item: T;
  index: number;
  columns: ColumnConfig<T>[];
  actions: ActionConfig<T>[];
  onRowClick?: (item: T) => void;
  striped: boolean;
  hoverable: boolean;
  compact: boolean;
}

export default function TableRow<T>({
  item,
  index,
  columns,
  actions,
  onRowClick,
  striped,
  hoverable,
  compact,
}: TableRowProps<T>) {
  
  const rowClasses = [
    'transition-colors duration-200',
    striped ? 'bg-surface' : 'bg-transparent',
    hoverable ? 'hover:bg-surface/80' : '',
    onRowClick ? 'cursor-pointer' : '',
    compact ? '' : 'py-4'
  ].join(' ');

  return (
    <tr 
      className={rowClasses}
      onClick={() => onRowClick?.(item)}
    >
      {columns.map((column) => (
        <TableCell
          key={column.key}
          item={item}
          column={column}
          index={index}
          compact={compact}
        />
      ))}
      
      {actions.length > 0 && (
        <td className={`px-4 ${compact ? 'py-2' : 'py-4'}`}>
          <TableActions item={item} actions={actions} />
        </td>
      )}
    </tr>
  );
}