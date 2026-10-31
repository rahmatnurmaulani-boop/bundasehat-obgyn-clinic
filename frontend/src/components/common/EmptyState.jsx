import React from "react";
import { CalendarX, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({
  icon: Icon = CalendarX,
  title = "Belum Ada Data",
  description = "Saat ini belum ada data janji temu atau layanan yang tersedia.",
  actionText,
  actionLink,
}) {
  return (
    <div className="clinic-card p-10 text-center flex flex-col items-center max-w-md mx-auto my-8">
      <div className="w-14 h-14 rounded-2xl bg-rose-soft flex items-center justify-center text-rose-muted mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-navy mb-2">{title}</h3>
      <p className="text-sm text-clinic-muted leading-relaxed mb-6">
        {description}
      </p>
      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-sm btn-primary gap-2">
          {actionText} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
