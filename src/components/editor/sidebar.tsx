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

export function Sidebar() {
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
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
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
          </Card>
        </motion.div>
      )}
    </div>
  );
}
