import React from "react";
import { Clock, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

export default function ServiceSelector({
  services,
  selectedService,
  onSelect,
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-navy">
        Pilih Layanan Medis yang Dibutuhkan
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((svc) => {
          const isSelected = selectedService?.id === svc.id;
          return (
            <div
              key={svc.id}
              onClick={() => onSelect(svc)}
              className={`clinic-card p-5 cursor-pointer relative transition-all border-2 ${
                isSelected
                  ? "border-navy shadow-luxury ring-2 ring-navy/10"
                  : "border-clinic-border hover:border-dusty"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="badge-maternity">{svc.category}</span>
                <span className="text-xs font-semibold text-clinic-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold" />{" "}
                  {svc.duration_minutes} Menit
                </span>
              </div>
              <h4 className="font-bold text-navy text-base mb-1">{svc.name}</h4>
              <p className="text-xs text-clinic-muted line-clamp-2 leading-relaxed mb-4">
                {svc.description}
              </p>
              <div className="pt-3 border-t border-clinic-border flex justify-between items-center">
                <span className="text-sm font-extrabold text-navy">
                  {formatCurrency(svc.price)}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
