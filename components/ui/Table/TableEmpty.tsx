"use client";

import { FileText } from "lucide-react";

interface TableEmptyProps {
  message?: string;
}

export default function TableEmpty({ message = "Aucune donnée disponible" }: TableEmptyProps) {
  return (
    <div className="py-12 text-center text-muted">
      <div className="mb-3">
        <FileText className="w-12 h-12 mx-auto text-muted/50" />
      </div>
      <p className="text-lg font-medium text-foreground/70">{message}</p>
    </div>
  );
}