import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-95",
    secondary: "bg-white text-secondary border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm hover:shadow-md",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-secondary hover:bg-slate-100 hover:text-slate-900",
    danger: "bg-gradient-to-r from-error to-red-600 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 active:scale-95",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;