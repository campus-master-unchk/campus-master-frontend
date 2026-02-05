import { Department } from "@/types/academic";

interface Props {
  search: string;
  departmentId: number | "";
  departments: Department[];
  onSearchChange: (v: string) => void;
  onDepartmentChange: (v: number | "") => void;
}

export default function SpecialityFilters({
  search,
  departmentId,
  departments,
  onSearchChange,
  onDepartmentChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Rechercher..."
        className="border px-3 py-2 rounded w-full sm:w-64"
      />

      <select
        value={departmentId}
        onChange={(e) =>
          onDepartmentChange(e.target.value ? Number(e.target.value) : "")
        }
        className="border px-3 py-2 rounded w-full sm:w-64"
      >
        <option value="">Tous les départements</option>
        {departments.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
}
