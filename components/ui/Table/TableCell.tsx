"use client";

import { ColumnConfig } from "@/components/ui/Table/types";

interface TableCellProps<T> {
  item: T;
  column: ColumnConfig<T>;
  index: number;
  compact: boolean;
}

export default function TableCell<T>({ 
  item, 
  column, 
  index, 
  compact 
}: TableCellProps<T>) {
  
  const cellClasses = [
    'px-4',
    compact ? 'py-2' : 'py-4',
    column.className || ''
  ].join(' ');

  const content = column.render 
    ? column.render(item, index)
    : String(item[column.key as keyof T] || '');

  return (
    <td className={cellClasses}>
      {content}
    </td>
  );
}