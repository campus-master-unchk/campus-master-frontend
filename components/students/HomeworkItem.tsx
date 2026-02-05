import { Calendar, Clock, ArrowRight, AlertTriangle } from "lucide-react";

interface HomeworkItemProps {
  title: string;
  subject: string;
  dueDate: string;
  daysLeft: string;
  priority: "urgent" | "medium" | "low";
  buttonText: string;
}

export default function HomeworkItem({
  title,
  subject,
  dueDate,
  daysLeft,
  priority,
  buttonText
}: HomeworkItemProps) {
  const priorityConfig = {
    urgent: {
      color: "text-red-500 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-500 dark:border-red-800",
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
      label: "Urgent"
    },
    medium: {
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-500 dark:border-amber-800",
      icon: <Clock className="w-3.5 h-3.5" />,
      label: "Moyen"
    },
    low: {
      color: "text-green-500 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-500 dark:border-green-800",
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
          <path d="M5.25 7.4375L6.5625 8.75L8.75 5.6875M12.25 7C12.25 7.68944 12.1142 8.37213 11.8504 9.00909C11.5865 9.64605 11.1998 10.2248 10.7123 10.7123C10.2248 11.1998 9.64605 11.5865 9.00909 11.8504C8.37213 12.1142 7.68944 12.25 7 12.25C6.31056 12.25 5.62787 12.1142 4.99091 11.8504C4.35395 11.5865 3.7752 11.1998 3.28769 10.7123C2.80018 10.2248 2.41347 9.64605 2.14963 9.00909C1.8858 8.37213 1.75 7.68944 1.75 7C1.75 5.60761 2.30312 4.27226 3.28769 3.28769C4.27226 2.30312 5.60761 1.75 7 1.75C8.39239 1.75 9.72774 2.30312 10.7123 3.28769C11.6969 4.27226 12.25 5.60761 12.25 7Z" 
            stroke="currentColor" 
            strokeWidth="0.875" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Faible"
    }
  };

  const { color, bgColor, borderColor, icon, label } = priorityConfig[priority];

  return (
    <div className="
      border border-border 
      rounded-lg 
      p-4 
      bg-surface 
      hover:border-primary/30 
      transition-all duration-300
      hover:shadow-sm
    ">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
        <div className="flex-1">
          <h3 className="text-base font-medium text-foreground mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-muted">{subject}</p>
        </div>
        <span className={`
          flex items-center gap-1 
          px-2 py-1 
          border ${borderColor} 
          rounded-md 
          text-xs font-medium
          ${color}
          ${bgColor}
          whitespace-nowrap
          transition-colors duration-300
        `}>
          {icon}
          {label}
        </span>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span className="font-mono text-sm">{dueDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{daysLeft}</span>
        </div>
      </div>
      
      <button className="
        flex items-center justify-center gap-1 
        px-3 py-1.5 
        bg-primary 
        hover:bg-primary/90
        text-white 
        text-sm font-medium
        rounded-md 
        transition-all duration-300
        w-full sm:w-auto
        hover:shadow-md
      ">
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}