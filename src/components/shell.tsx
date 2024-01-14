import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {}

export default function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  );
}
