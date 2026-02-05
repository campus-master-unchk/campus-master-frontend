import { Announcement } from "@/types/announcement";
import { AlertTriangle, MessageSquare } from "lucide-react";
import { ActionConfig } from "../ui/Table/types";

interface Props {
  announcement: Announcement;
  actions: ActionConfig<Announcement>[];
}

export default function AnnouncementItem({ announcement, actions }: Props) {
  const typeConfig: Record<string, any> = {
    general: {
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      bg: "bg-red-50",
      border: "border-red-500",
    },
    exam: {
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50",
      border: "border-blue-500",
    },
    homework: {
      icon: <MessageSquare className="w-5 h-5 text-green-500" />,
      bg: "bg-green-50",
      border: "border-green-500",
    },
    schedule: {
      icon: <MessageSquare className="w-5 h-5 text-purple-500" />,
      bg: "bg-purple-50",
      border: "border-purple-500",
    },
  };

  const config = typeConfig[announcement.type];

  return (
    <div className={`border ${config.border} ${config.bg} rounded-lg p-4`}>
      <div className="flex gap-3">
        {config.icon}

        <div className="flex-1">
          <h3 className="font-semibold">{announcement.title}</h3>

          <p className="text-xs text-muted mb-2">
            {announcement.type} • {announcement.priority} • {announcement.state}
          </p>

          <p className="text-sm line-clamp-2 mb-3">
            {announcement.content}
          </p>

          <div className="flex justify-end gap-1">
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={() => action.onClick(announcement)}
                className="p-2 rounded hover:bg-muted"
                title={action.label}
              >
                {action.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
