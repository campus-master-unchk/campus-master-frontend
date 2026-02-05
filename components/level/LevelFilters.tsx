interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function LevelFilters({ search, onSearchChange }: Props) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Rechercher un niveau..."
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
          transition"
    />
  );
}