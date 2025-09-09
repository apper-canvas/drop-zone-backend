import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Progress = forwardRef(({ className, value = 0, max = 100, showPercentage = true, ...props }, ref) => {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      {...props}
    >
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-primary to-blue-600 progress-bar relative overflow-hidden"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white drop-shadow-sm">
            {percentage}%
          </span>
        </div>
      )}
    </div>
  );
});

Progress.displayName = "Progress";

export default Progress;