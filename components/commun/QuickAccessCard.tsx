import Link from "next/link";

interface QuickAccessCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  count?: string;
  color: string;
}

export default function QuickAccessCard({ 
  title, 
  description, 
  href, 
  icon, 
  count, 
  color 
}: QuickAccessCardProps) {
  return (
    <Link
      href={href}
      className="
        group 
        relative 
        bg-surface 
        border border-border 
        rounded-lg 
        p-4 md:p-6 
        hover:shadow-md 
        hover:border-primary/30
        transition-all duration-300
      "
    >
      <div className={`mb-3 md:mb-4 ${color}`}>
        {icon}
      </div>
      <h3 className="
        text-base md:text-lg 
        font-semibold 
        text-foreground 
        mb-1
        transition-colors duration-300
      ">
        {title}
      </h3>
      <p className="
        text-xs md:text-sm 
        text-muted 
        mb-2 line-clamp-2
        transition-colors duration-300
      ">
        {description}
      </p>
      {count && (
        <p className="
          text-xs 
          text-primary 
          font-medium
          transition-colors duration-300
        ">
          {count}
        </p>
      )}
    </Link>
  );
}