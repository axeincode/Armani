"use client";

import { dashboardConfig } from "@/config/dashboard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import ThemeToggle from "./theme-toggle";

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col  gap-5 h-full">
      <h1 className="font-medium text-lg">Dashboard</h1>
      <nav className="flex flex-col  flex-1 gap-2">
        {dashboardConfig.sidebarNav.map((link: any, i: number) => {
          // @ts-ignore
          const Icon = Icons[link.icon];
          return (
            <Link
              href={link.href}
              className={cn(
                "py-1 text-sm px-2 rounded-lg flex flex-row gap-2 transition-colors items-center ",
                pathname === link.href ? "bg-gray-2" : ""
              )}
              key={i}
            >
              <Icon size={16} />
              {link.title}
            </Link>
          );
        })}
      </nav>

      <div className="w-full flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
