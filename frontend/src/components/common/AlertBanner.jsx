import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function AlertBanner({ type = "info", message, onClose }) {
  if (!message) return null;

  const styles = {
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    error: "bg-rose-50 text-rose-800 border-rose-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    info: "bg-dusty/15 text-navy border-dusty/30",
  };

  const icons = {
    success: (
      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
    ),
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-dusty-dark flex-shrink-0" />,
  };

  return (
    <div
      className={`p-4 rounded-xl border flex items-center justify-between shadow-sm transition-all my-3 ${styles[type] || styles.info}`}
    >
      <div className="flex items-center gap-3">
        {icons[type]}
        <span className="text-sm font-medium">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:opacity-75 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
