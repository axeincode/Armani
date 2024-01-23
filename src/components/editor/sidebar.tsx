"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  IconButton,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  ChevronLeftIcon,
  Bars3Icon,
  PlusCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import {
  IPageState,
  useObservable,
  usePageObserveable,
  useSelectedObserveable,
} from "@/store";
import { WidgetTypes } from "@/types";
import { AllWidgetsSidebar } from "./sidebars/all-widgets-sidebar";
import { CardWidgetEditorTool } from "./sidebars/card-widget-editor-tool";

export function Sidebar() {
  const selectedWidgetObs$ = useSelectedObserveable();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());

  const [showDrawer, setShowDrawer] = React.useState(true);
  const [open, setOpen] = React.useState(0);
  const toggleDrawer = () => setShowDrawer((prev) => !prev);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  const { widget: selectedWidget } = selectedWidgetState;

  return (
    <div
      className={cn(
        "flex flex-wrap bg-gray-800",
        showDrawer ? "w-48" : "w-10 border-r-2 border-gray-200"
      )}
    >
      {!showDrawer && (
        <div className="flex flex-col my-5 px-1 gap-2 ">
          <IconButton
            variant="text"
            size="sm"
            onClick={() => setShowDrawer(true)}
          >
            <Bars3Icon className="h-6 w-6 text-white" />
          </IconButton>
        </div>
      )}
      {showDrawer && (
        <motion.div
          initial={{ width: showDrawer ? "12rem" : "0" }}
          animate={{ width: showDrawer ? "12rem" : "0" }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full w-48 max-w-none p-1 shadow-xl shadow-blue-gray-900/5 rounded-none ">
            {!selectedWidget && (
              <AllWidgetsSidebar toggleDrawer={toggleDrawer} />
            )}
            {selectedWidget && selectedWidget === WidgetTypes.CARD && (
              <CardWidgetEditorTool toggleDrawer={toggleDrawer} />
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
}
