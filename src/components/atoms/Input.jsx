import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border-2 border-slate-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;