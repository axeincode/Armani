import { Icons } from "@/components/icons";

export type NumberOfMembersPerMonth = {
  date: string;
  "Total members": number;
};

export type TotalMembers = NumberOfMembersPerMonth[];

export type Customer = {
  customer: string;
  status: "Enrolled" | "Unenrolled";
  course: string;
  progress: number;
};

export type CustomersData = Customer[];

export type SidebarNavItem = {
  title: string;
  icon: keyof typeof Icons;
  href: string;
};

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};
