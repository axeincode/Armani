import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemSuffix,
  IconButton,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  ChevronLeftIcon,
  PlusCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { WidgetEnum } from "@/types";
import { v4 } from "uuid";
import { useEditorObserveable } from "@/store";
import { WidgetTypes } from "@/types/editor.types";

export type AllWidgetsSidebarProps = {
  toggleDrawer: () => void;
};

export function AllWidgetsSidebar({ toggleDrawer }: AllWidgetsSidebarProps) {
  const [open, setOpen] = React.useState(0);
  const currentPage$ = useCurrentPageObserveable();
  const editor$ = useEditorObserveable();
  console.log("currentPage$", currentPage$);
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const handleOnAddWidget = (widgetType: WidgetEnum) => {
    switch (widgetType) {
      case WidgetEnum.CARD:
        const pageId = currentPage$.pageId;
        if (pageId) {
          const widgetdata: WidgetTypes = {
            type: WidgetEnum.CARD,
            id: v4(),
            transformation: {
              x: 0,
              y: 0,
              width: 400,
              height: 400,
            },
            title: "Card Title",
            subtitle: "Card Subtitle",
            captionEnabled: false,
            captionTitle: "Caption Title",
            captionSubtitle: "Caption Subtitle",
            images: [],
          };
          editor$.addWidget(pageId, widgetdata);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="mb-2 p-2 flex justify-between">
        <Typography variant="h5" color="blue-gray">
          Widgets
        </Typography>
        <div className="h-5 w-5 min-w-0">
          <IconButton
            variant="outlined"
            size="sm"
            onClick={toggleDrawer}
            className="p-0 m-0 h-5 w-5 min-w-0 rounded-full"
            title="close"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
      <List className="min-w-[10px]">
        <ListItem onClick={() => handleOnAddWidget(WidgetEnum.CARD)}>
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
        <Accordion
          className="min-w-0 w-44"
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0 min-w-0 w-44" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3 min-w-0 w-44"
            >
              <Typography color="blue-gray" className="mr-auto font-normal">
                Charts
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 min-w-0 w-44">
            <List className="px-1 min-w-0 w-44">
              <ListItem>
                Bar
                <ListItemSuffix>
                  <PlusCircleIcon className="h-5 w-5" />
                </ListItemSuffix>
              </ListItem>
              <ListItem>
                Line
                <ListItemSuffix>
                  <PlusCircleIcon className="h-5 w-5" />
                </ListItemSuffix>
              </ListItem>
              <ListItem>
                Pie
                <ListItemSuffix>
                  <PlusCircleIcon className="h-5 w-5" />
                </ListItemSuffix>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </>
  );
}
