"use client";

import { ColumnConfig } from "@/components/ui/Table/types";

interface TableHeaderProps<T> {
  columns: ColumnConfig<T>[];
}

export default function TableHeader<T>({ columns }: TableHeaderProps<T>) {
  return (
    <thead>
      <tr className="border-b border-border bg-surface">
        {columns.map((column) => (
          <th 
            key={column.key}
            className="text-left py-3 px-4 text-sm font-medium text-muted"
            style={{ width: column.width }}
          >
            {column.header}
          </th>
        ))}
        <th className="text-left py-3 px-4 text-sm font-medium text-muted text-right">
        Actions
      </th>
      </tr>
    </thead>
  );
}