import React from "react";
import { motion } from "framer-motion";
import { Card } from "@material-tailwind/react";
import { cn } from "@/lib/utils";

export type SelectedWidgetSidebarProps = {
  children?: React.ReactNode;
};

export function SelectedWidgetSidebar({
  children,
}: SelectedWidgetSidebarProps) {
  const [showDrawer, setShowDrawer] = React.useState(true);
  const [open, setOpen] = React.useState(0);
  const toggleDrawer = () => setShowDrawer((prev) => !prev);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div
      className={cn(
        "flex flex-wrap bg-gray-800",
        showDrawer ? "w-48" : "w-10 border-r-2 border-gray-200"
      )}
    >
      <motion.div
        initial={{ width: showDrawer ? "12rem" : "0" }}
        animate={{ width: showDrawer ? "12rem" : "0" }}
        transition={{ duration: 0.3 }}
      >
        <Card className="h-full w-48 max-w-none p-1 shadow-xl shadow-blue-gray-900/5 rounded-none ">
          {children}
        </Card>
      </motion.div>
    </div>
  );
}
