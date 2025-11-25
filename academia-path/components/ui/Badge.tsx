import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "warning";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    primary: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200",
    secondary: "bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning: "bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
