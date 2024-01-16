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
  const user = {
    name: "John Doe",
    email: "johnemail@gmail.com",
    image:
      "https://images.unsplash.com/photo-1612833603922-0d9a3c0d5a2f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMG1hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  }; // await getCurrentUser();

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
