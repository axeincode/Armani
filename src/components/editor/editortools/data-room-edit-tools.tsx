"use client";
import React from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
export const DataRoomEditTools = () => {
  const [color, setColor] = React.useState("#aabbcc");
  const [open, setOpen] = React.useState(false);

  return (
    <div className="max-w-sm flex flex-grow overflow-hidden shadow-lg mr-1 bg-gray-100">
      <div className="flex flex-col flex-grow justify-between">
        <Typography variant="h6" color="gray">
          Data Room
        </Typography>

        <div className="flex w-full h-8">
          <Button
            size="sm"
            variant="outlined"
            className="flex w-full items-center gap-2 rounded-none"
          >
            <CloudArrowUpIcon className="h-6 w-6" />
            upload
          </Button>
        </div>
      </div>
    </div>
  );
};
