"use client";
import React from "react";
import { Typography, Textarea } from "@material-tailwind/react";

export const DisclaimerEditTools = () => {
  const [color, setColor] = React.useState("#aabbcc");
  const [open, setOpen] = React.useState(false);

  return (
    <div className="max-w-sm flex flex-grow overflow-hidden shadow-lg mr-1 bg-gray-100">
      <div className="flex flex-col flex-grow shadow-sm px-1">
        <Typography variant="h6" color="gray">
          Disclaimer
        </Typography>
        <Textarea
          color="gray"
          size="md"
          className="px-1 !min-h-[10px] h-10 !border-t-blue-gray-200 focus:!border-t-gray-900"
          rows={3}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={
            "This presentation is for informational purposes only and does not constitute an offer, solicitation, or recommendation to buy, sell, or  invest in commercial real estate. Any projections,"
          }
        />
      </div>
    </div>
  );
};
