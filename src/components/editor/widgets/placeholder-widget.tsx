"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";

export interface PlaceHolderWidgetProps {
  id: string;
}

export const PlaceHolderWidget = ({ id }: PlaceHolderWidgetProps) => {
  return (
    <div
      className="flex flex-row justify-between px-2 items-center border-[0.5px] border-dashed border-blue-gray-50"
      id={id}
    >
      <Typography
        variant="small"
        color="white"
        className="font-medium text-white"
      >
        Placeholder
      </Typography>
    </div>
  );
};
