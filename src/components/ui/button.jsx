import React from "react";
import { cn } from "../../lib/utils";

export function Button({
  children,
  className = "",
  size = "md",
  variant = "default",
  loading = false,
  disabled,
  ...props
}) {
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-400 text-black hover:bg-gray-100",
    ghost: "bg-transparent hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={cn(
        "rounded-2xl font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
