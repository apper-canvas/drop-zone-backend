import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    success: "bg-gradient-to-r from-success to-emerald-600 text-white shadow-sm",
    error: "bg-gradient-to-r from-error to-red-600 text-white shadow-sm",
    warning: "bg-gradient-to-r from-warning to-yellow-600 text-white shadow-sm",
    info: "bg-gradient-to-r from-info to-blue-600 text-white shadow-sm",
    outline: "border border-slate-200 bg-transparent text-slate-900 hover:bg-slate-100",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;