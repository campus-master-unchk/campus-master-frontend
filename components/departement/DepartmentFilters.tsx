// components/departement/DepartmentFilters.tsx
"use client";

interface DepartmentFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function DepartmentFilters({
  search,
  onSearchChange,
}: DepartmentFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Rechercher par nom ou code..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="
          h-10
          md:w-full !w-[300px]
          px-4
          rounded-md
          border border-border
          bg-background
          text-foreground
          placeholder:text-muted
          focus:outline-none
          focus:ring-2 focus:ring-primary/40
          transition
        "
      />
    </div>
  );
}
