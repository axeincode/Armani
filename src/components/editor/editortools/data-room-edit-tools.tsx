"use client";
import React from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
export const DataRoomEditTools = () => {
  const [color, setColor] = React.useState("#aabbcc");
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-grow overflow-hidden shadow-lg mr-1 bg-gray-100">
      <div className="flex flex-row flex-grow justify-between">
        <Typography variant="h6" color="gray">
          Data Room
        </Typography>
        <div className="h-8">
          <Button
            size="sm"
            variant="filled"
            color="gray"
            className="flex items-center gap-1"
          >
            <CloudArrowUpIcon className="h-4 w-4" />
            upload
          </Button>
        </div>
      </div>
    </div>
  );
};
