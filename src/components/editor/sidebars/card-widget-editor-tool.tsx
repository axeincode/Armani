"use client";
import React from "react";
import { motion } from "framer-motion";
import { Typography, IconButton, Switch } from "@material-tailwind/react";
import {
  ChevronLeftIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { LabelInput } from "@/components/ui/label-input";

export type CardWidgetEditorToolProps = {
  toggleDrawer: () => void;
};

export const CardWidgetEditorTool = ({
  toggleDrawer,
}: CardWidgetEditorToolProps) => {
  const handleOnTitleChange = (value: string) => {
    console.log(value);
  };

  const [hasCaption, setHasCaption] = React.useState(false);

  return (
    <>
      <div className="mb-2 flex justify-between">
        <Typography variant="h6" color="blue-gray">
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
      {/** divider line */}
      <div className="flex h-[0.5px] w-full bg-gray-300 mb-2" />
      <div className="flex flex-col gap-1 mb-2">
        <LabelInput
          label="Title"
          placeholder="Title"
          value="The Artium"
          onChange={handleOnTitleChange}
        />
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <LabelInput
          label="Subtitle"
          placeholder="Subtitle"
          value="Boston MA"
          onChange={handleOnTitleChange}
        />
      </div>
      <div className="flex flex-col gap-1 mt-2 mb-3">
        <div className="flex justify-between">
          <Typography variant="small" color="blue-gray" className="mb-0">
            {"Elements"}
          </Typography>
          <IconButton
            variant="text"
            size="sm"
            className="px-1 m-0 h-6 w-6 min-w-0 mr-3"
            title="Add Element"
            onClick={toggleDrawer}
          >
            <PlusCircleIcon className="h-5 w-5" />
          </IconButton>
        </div>
        {Array.from(Array(3).keys()).map((i) => (
          <div
            key={i}
            className="flex flex-row justify-between items-start gap-2"
          >
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium w-16"
            >
              image
            </Typography>
            <IconButton
              variant="text"
              size="sm"
              className="px-1 m-0 h-6 w-6 min-w-0 mr-3"
              title="Add Element"
              onClick={toggleDrawer}
            >
              <TrashIcon className="h-5 w-5" />
            </IconButton>
          </div>
        ))}
      </div>
      <div className="flex gap-1 mb-2">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-medium w-16"
        >
          Caption
        </Typography>
        <Switch
          crossOrigin={"true"}
          checked={hasCaption}
          onChange={(e) => setHasCaption(e.target.checked)}
        />
      </div>
      {hasCaption && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="flex flex-col"
        >
          <div className="flex flex-col gap-1 mb-2">
            <LabelInput
              label="Caption Title"
              placeholder="Title"
              value="The Artium"
              onChange={handleOnTitleChange}
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <LabelInput
              label="Caption Subtitle"
              placeholder="Subtitle"
              value="Boston MA"
              onChange={handleOnTitleChange}
            />
          </div>
        </motion.div>
      )}
    </>
  );
};
