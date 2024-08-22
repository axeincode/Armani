"use client";
import React from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";

export type UploadButtonProps = {
  onClick: () => void;
};

export const UploadButton = ({ onClick }: UploadButtonProps) => {
  return (
    <Button
      size="sm"
      variant="filled"
      color="gray"
      className="flex items-center gap-1"
      onClick={onClick}
    >
      <CloudArrowUpIcon className="h-5 w-5" />
      upload
    </Button>
  );
};
