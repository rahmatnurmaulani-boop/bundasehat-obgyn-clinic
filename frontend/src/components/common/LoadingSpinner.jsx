import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ message = "Memuat data medis..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-3">
      <Loader2 className="w-10 h-10 text-gold animate-spin" />
      <p className="text-sm font-medium text-navy tracking-wide">{message}</p>
    </div>
  );
}
