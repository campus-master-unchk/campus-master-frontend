"use client";

import { useState, useMemo } from "react";
import { TableProps } from "./types";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableEmpty from "./TableEmpty";
import TableLoading from "./TableLoading";

export default function Table<T extends Record<string, any>>({
  data,
  columns,
  keyField = 'id' as keyof T,
  isLoading = false,
  emptyMessage = "Aucune donnée disponible",
  actions = [],
  onRowClick,
  className = "",
  striped = true,
  hoverable = true,
  compact = false,
  bordered = true,
  pagination = true,
  pageSizeOptions = [5, 10, 25, 50],
  defaultPageSize = 10,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);


  const totalPages = useMemo(() => {
    return Math.ceil(data.length / pageSize);
  }, [data.length, pageSize]);

  const paginatedData = useMemo(() => {
    if (!pagination) return data;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, currentPage, pageSize, pagination]);

  if (isLoading) {
    return <TableLoading />;
  }

  if (!data || data.length === 0) {
    return <TableEmpty message={emptyMessage} />;
  }

  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className={`overflow-x-auto rounded-lg ${bordered ? 'border border-border' : ''} ${className}`}>
      <table className="w-full">
        <TableHeader columns={columns} />
        <tbody>
          {paginatedData.map((item, index) => (
            <TableRow
              key={String(item[keyField])}
              item={item}
              index={index}
              columns={columns}
              actions={actions}
              onRowClick={onRowClick}
              striped={striped && index % 2 === 0}
              hoverable={hoverable}
              compact={compact}
            />
          ))}
        </tbody>
      </table>

      {pagination && (
        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-surface mt-2">
          {/* Choix du nombre de lignes */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">Lignes par page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1); // revenir à la première page
              }}
              className="border border-border rounded px-2 py-1 text-sm bg-background text-foreground"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-2 text-sm text-muted">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded hover:bg-surface/80 disabled:opacity-50"
            >
              Préc
            </button>
            <span>
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded hover:bg-surface/80 disabled:opacity-50"
            >
              Suiv
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
