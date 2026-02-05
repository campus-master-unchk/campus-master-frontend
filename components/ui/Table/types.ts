import { ReactNode } from 'react';

// Type générique pour les données
export interface ColumnConfig<T> {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
}

export interface ActionConfig<T> {
  label: string;
  icon: ReactNode;
  onClick: (item: T) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  keyField?: keyof T;
  isLoading?: boolean;
  emptyMessage?: string;
  actions?: ActionConfig<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  bordered?: boolean;
  pagination?: boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

// Types pour les filtres génériques
export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}