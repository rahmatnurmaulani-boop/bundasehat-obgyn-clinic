import React from "react";

export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="w-full space-y-3 animate-pulse p-4">
      <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 bg-slate-100 rounded-xl w-full"></div>
      ))}
    </div>
  );
}
