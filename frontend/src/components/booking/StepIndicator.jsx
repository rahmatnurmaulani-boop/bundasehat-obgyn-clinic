import React from "react";
import { Check } from "lucide-react";

export default function StepIndicator({ currentStep, steps }) {
  return (
    <div className="w-full py-4 mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isActive
                        ? "bg-navy text-gold ring-4 ring-gold/20"
                        : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                </div>
                <span
                  className={`text-[11px] font-semibold mt-1.5 hidden sm:block ${isActive ? "text-navy font-bold" : "text-clinic-muted"}`}
                >
                  {step}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 sm:mx-4 ${stepNum < currentStep ? "bg-emerald-600" : "bg-slate-200"}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
