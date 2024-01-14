import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import UserAccountNav from "./user-account-nav";
/// import getCurrentUser from "@/lib/session";
import MobileNav from "./mobile-nav";
import ThemeToggle from "./theme-toggle";

interface DashboardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export default async function DashboardHeader({
  className,
  title,
  ...props
}: DashboardHeaderProps) {
  const user = {}; // await getCurrentUser();

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-50 px-5 py-4 bg-transparent gap-2 backdrop-blur-sm flex flex-row justify-between items-center",
        className
      )}
      {...props}
    >
      <h1 className="text-xl font-medium flex-1">{title}</h1>
      <ThemeToggle className="hidden max-md:flex" />
      <MobileNav />
      <UserAccountNav
        user={{
          name: user?.name,
          email: user?.email,
          image: user?.image,
        }}
      />
    </header>
  );
}
