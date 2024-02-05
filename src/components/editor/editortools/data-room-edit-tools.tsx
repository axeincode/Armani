"use client";
import React from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { UploadButton } from "@/components/ui/upload-button";
export const DataRoomEditTools = () => {
  const [color, setColor] = React.useState("#aabbcc");
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-grow overflow-hidden shadow-lg mr-1 bg-gray-100">
      <div className="flex flex-row flex-grow justify-start gap-2 pt-1 px-1">
        <Typography variant="h6" color="gray">
          Data Room
        </Typography>
        <div className="h-6 flex">
          <UploadButton onClick={() => setOpen(true)} />
        </div>
      </div>
    </div>
  );
};
