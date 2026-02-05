import { AlertTriangle, MessageSquare, ChevronDown } from "lucide-react";

interface AnnouncementItemProps {
  title: string;
  author: string;
  subject: string;
  date: string;
  tags: string[];
  excerpt: string;
  type: "alert" | "info" | "reminder";
}

export default function AnnouncementItem({
  title,
  author,
  subject,
  date,
  tags,
  excerpt,
  type
}: AnnouncementItemProps) {
  const typeConfig = {
    alert: {
      icon: <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-500 dark:text-red-400" />,
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-500 dark:border-red-800"
    },
    info: {
      icon: <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-500 dark:border-blue-800"
    },
    reminder: {
      icon: <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-500 dark:border-blue-800"
    }
  };

  const { icon, bgColor, borderColor } = typeConfig[type];

  return (
    <div className={`
      border ${borderColor} 
      rounded-lg 
      p-4 md:p-6 
      ${bgColor}
      hover:border-primary/50 
      transition-all duration-300
      hover:shadow-sm
    `}>
      <div className="flex items-start gap-3 md:gap-4">
        <div className="flex-shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-foreground mb-2 line-clamp-2 transition-colors duration-300">
            {title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs text-muted mb-2 transition-colors duration-300">
            <span>{author}</span>
            <span className="hidden md:inline">•</span>
            <span>{subject}</span>
            <span className="hidden md:inline">•</span>
            <span className="font-mono">{date}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 md:gap-2 mb-3">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="
                  text-xs font-medium
                  text-amber-600 dark:text-amber-400
                  bg-amber-50 dark:bg-amber-900/30
                  px-2 py-0.5 
                  rounded
                  transition-colors duration-300
                "
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-sm text-muted mb-3 line-clamp-2 transition-colors duration-300">
            {excerpt}
          </p>
          
          <button className="
            flex items-center gap-1 
            text-sm font-medium
            text-primary 
            hover:text-primary/80
            transition-colors duration-300
            hover:underline
          ">
            Voir plus
            <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}