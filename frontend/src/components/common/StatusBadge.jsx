import React from "react";
import { Clock, CheckCircle2, CheckCheck, XCircle } from "lucide-react";

export default function StatusBadge({ status }) {
  const configs = {
    PENDING: {
      label: "Menunggu Konfirmasi",
      className: "bg-amber-50 text-amber-800 border-amber-200",
      icon: Clock,
    },
    CONFIRMED: {
      label: "Dikonfirmasi",
      className: "bg-emerald-50 text-emerald-800 border-emerald-200",
      icon: CheckCircle2,
    },
    COMPLETED: {
      label: "Selesai",
      className: "bg-blue-50 text-blue-800 border-blue-200",
      icon: CheckCheck,
    },
    CANCELLED: {
      label: "Dibatalkan",
      className: "bg-rose-50 text-rose-800 border-rose-200",
      icon: XCircle,
    },
  };

  const config = configs[status] || configs.PENDING;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}
