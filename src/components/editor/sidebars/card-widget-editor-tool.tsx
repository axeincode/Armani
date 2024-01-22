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
  Input,
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

export type CardWidgetEditorToolProps = {
  toggleDrawer: () => void;
};

export const CardWidgetEditorTool = ({
  toggleDrawer,
}: CardWidgetEditorToolProps) => {
  return (
    <>
      <div className="mb-2 p-2 flex justify-between">
        <Typography variant="h5" color="blue-gray">
          Frame
        </Typography>
        <div className="h-5 w-5 min-w-0">
          <IconButton
            variant="outlined"
            size="sm"
            className="p-0 m-0 h-5 w-5 min-w-0 rounded-full"
            title="close"
            onClick={toggleDrawer}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      <div className="flex w-40 flex-col gap-6">
        <Input
          variant="outlined"
          label="Title"
          placeholder="Title"
          crossOrigin={"true"}
        />

        <Input
          variant="outlined"
          label="Subtitle"
          placeholder="Title"
          crossOrigin={"true"}
        />
      </div>

      <List className="min-w-[10px]">
        <ListItem>
          Card
          <ListItemSuffix>
            <PlusCircleIcon className="h-5 w-5" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          Table
          <ListItemSuffix>
            <PlusCircleIcon className="h-5 w-5" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          Map
          <ListItemSuffix>
            <PlusCircleIcon className="h-5 w-5" />
          </ListItemSuffix>
        </ListItem>
      </List>
    </>
  );
};
