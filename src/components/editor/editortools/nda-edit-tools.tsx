"use client";
import React from "react";
import { Typography, Switch, Textarea, Input } from "@material-tailwind/react";

export const NdaEditTools = () => {
  const [color, setColor] = React.useState("#aabbcc");
  const [open, setOpen] = React.useState(false);

  return (
    <div className="max-w-sm flex flex-grow overflow-hidden shadow-lg bg-gray-100">
      <div className="flex flex-col flex-grow shadow gap-2 px-1 mx-1">
        <div className="flex flex-grow h-6 items-start justify-between">
          <Typography variant="h6" color="gray">
            NDA
          </Typography>
          <Switch defaultChecked label="Enabled" crossOrigin={"true"} />
        </div>
        <div className="flex flex-row justify-between items-start gap-2">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-medium w-16"
          >
            Ask for
          </Typography>
          <Input
            crossOrigin={"true"}
            className="min-w-0 h-[4px] py-0 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            containerProps={{ className: "!min-w-[10px] w-4 h-[4px] py-0" }}
          />
        </div>
        <Textarea
          color="gray"
          size="md"
          className="px-1 !min-h-[10px] h-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
          rows={1}
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
