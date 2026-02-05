import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-2 ${className}`} aria-label="Breadcrumb">
      <span 
        className="
          text-muted 
          hover:text-foreground 
          transition-colors duration-300
        "
      >
        <Home className="w-4 h-4" />
      </span>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-border transition-colors duration-300" />
          {item.href ? (
            <Link 
              href={item.href}
              className="
                text-sm 
                text-muted 
                hover:text-foreground 
                transition-colors duration-300
              "
            >
              {item.label}
            </Link>
          ) : (
            <span className="
              text-sm 
              text-foreground 
              font-medium
              transition-colors duration-300
            ">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}