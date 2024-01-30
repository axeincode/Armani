"use client";
import React from "react";
import {
  Bars3Icon,
  Squares2X2Icon,
  QueueListIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CubeTransparentIcon,
  ChartBarIcon,
  GlobeAsiaAustraliaIcon,
  UsersIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { deckPageConfigs } from "@/constants/pages";
import { IPageState, useEditorDecksObserveable } from "@/store";
import { EditorStateTypes } from "@/types/editor.types";

export interface Item {
  id: number;
  title: string;
  icon: any;
}

const drawerItems: Item[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: Squares2X2Icon,
  },
  {
    id: 2,
    title: "Deal Overview",
    icon: QueueListIcon,
  },
  {
    id: 3,
    title: "The Property",
    icon: BuildingOfficeIcon,
  },
  {
    id: 4,
    title: "The Market",
    icon: MapPinIcon,
  },
  {
    id: 5,
    title: "Business Plan",
    icon: ChartBarIcon,
  },
  {
    id: 6,
    title: "Financials",
    icon: CubeTransparentIcon,
  },
  {
    id: 7,
    title: "Comps",
    icon: GlobeAsiaAustraliaIcon,
  },
  {
    id: 8,
    title: "Sponsorship",
    icon: UsersIcon,
  },
];

export type EditorSidebarProps = {
  page: IPageState;
  setPage: (page: number) => void;
};

export const ViewSidebar = ({ page, setPage }: EditorSidebarProps) => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [menuItems, setMenuItems] = React.useState<Item[]>(drawerItems);
  const deckInfo = useEditorDecksObserveable();

  return (
    <div
      className={cn("flex flex-wrap bg-gray-800", showDrawer ? "w-48" : "w-10")}
      style={{
        ...(deckInfo?.sidebar && {
          background: `${deckInfo?.sidebar}`,
        }),
      }}
    >
      <>
        {!showDrawer && (
          <div className="flex flex-col my-5 px-1 gap-2">
            <IconButton
              variant="text"
              size="sm"
              onClick={() => setShowDrawer(true)}
            >
              <Bars3Icon className="h-6 w-6 text-white" />
            </IconButton>
            {menuItems.map(({ id, icon: Icon }, index: number) => (
              <React.Fragment key={id}>
                <IconButton
                  variant="text"
                  size="sm"
                  onClick={() => setPage(index + 1)}
                >
                  <Icon className="h-6 w-6 text-white" />
                </IconButton>
              </React.Fragment>
            ))}
          </div>
        )}
        {showDrawer && (
          <motion.div
            initial={{ width: showDrawer ? "12rem" : "0" }}
            animate={{ width: showDrawer ? "12rem" : "0" }}
            transition={{ duration: 0.3 }}
            style={{
              ...(deckInfo?.sidebar && {
                background: `${deckInfo?.sidebar}`,
              }),
            }}
          >
            <Card
              className="h-full w-48 max-w-20 p-4"
              style={{
                ...(deckInfo?.sidebar && {
                  background: `${deckInfo?.sidebar}`,
                }),
              }}
            >
              <div className="mb-1 flex justify-between">
                <Typography variant="h5" color="white">
                  Sidebar
                </Typography>
                <IconButton
                  variant="text"
                  size="sm"
                  onClick={() => setShowDrawer(false)}
                >
                  <XCircleIcon className="h-6 w-6 text-white" />
                </IconButton>
              </div>
              <List className="min-w-fit">
                {menuItems.map(({ id, title, icon: Icon }, index: number) => (
                  <React.Fragment key={id}>
                    <ListItem
                      key={id}
                      className="text-white text-xs"
                      onClick={() => setPage(index + 1)}
                    >
                      <ListItemPrefix>
                        <Icon className="h-5 w-5" />
                      </ListItemPrefix>
                      {title}
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </Card>
          </motion.div>
        )}
      </>
    </div>
  );
};
