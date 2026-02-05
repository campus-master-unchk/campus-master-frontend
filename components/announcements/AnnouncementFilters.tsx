"use client";

import Select from "react-select";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  type: string | null;
  onTypeChange: (v: string | null) => void;
  priority: string | null;
  onPriorityChange: (v: string | null) => void;
  state: string | null;
  onStateChange: (v: string | null) => void;
}

export default function AnnouncementFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  priority,
  onPriorityChange,
  state,
  onStateChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Recherche par titre"
        className="border border-border rounded px-3 py-2 w-48"
      />

      <Select
        placeholder="Type"
        isClearable
        className="w-40"
        value={type ? { value: type, label: type } : null}
        onChange={(v) => onTypeChange(v?.value || null)}
        options={[
          { value: "general", label: "Général" },
          { value: "exam", label: "Examen" },
          { value: "homework", label: "Devoir" },
          { value: "schedule", label: "Emploi du temps" },
        ]}
      />

      <Select
        placeholder="Priorité"
        isClearable
        className="w-40"
        value={priority ? { value: priority, label: priority } : null}
        onChange={(v) => onPriorityChange(v?.value || null)}
        options={[
          { value: "normal", label: "Normal" },
          { value: "important", label: "Important" },
          { value: "urgent", label: "Urgent" },
        ]}
      />

      <Select
        placeholder="État"
        isClearable
        className="w-40"
        value={state ? { value: state, label: state } : null}
        onChange={(v) => onStateChange(v?.value || null)}
        options={[
          { value: "draft", label: "Brouillon" },
          { value: "published", label: "Publié" },
        ]}
      />
    </div>
  );
}
