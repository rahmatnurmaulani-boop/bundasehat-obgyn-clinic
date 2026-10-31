import React from "react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  color = "navy",
}) {
  const iconColors = {
    navy: "bg-navy/10 text-navy",
    gold: "bg-gold/15 text-gold-dark",
    emerald: "bg-emerald-50 text-emerald-700",
    rose: "bg-rose-50 text-rose-700",
  };

  return (
    <div className="clinic-card p-6 flex items-start justify-between">
      <div className="space-y-1">
        <span className="text-xs font-bold text-clinic-muted uppercase tracking-wider">
          {title}
        </span>
        <h3 className="text-3xl font-extrabold text-navy tracking-tight">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-clinic-muted pt-1">{subtitle}</p>
        )}
      </div>
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconColors[color] || iconColors.navy}`}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
