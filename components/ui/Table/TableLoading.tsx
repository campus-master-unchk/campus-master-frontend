"use client";

export default function TableLoading() {
  return (
    <div className="py-12 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p className="mt-4 text-muted">Chargement des données...</p>
    </div>
  );
}