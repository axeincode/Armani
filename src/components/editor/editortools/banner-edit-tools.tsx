import React from "react";
import { Typography, Input } from "@material-tailwind/react";
import ColorPicker from "../../ui/color-picker";

export const BannerEditTools = () => {
  const [color, setColor] = React.useState("#aabbcc");
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex overflow-hidden shadow-lg mr-1 bg-gray-100">
      <div className="flex flex-col gap-1">
        <Typography variant="h6" color="gray">
          Banner
        </Typography>
        <div className="flex flex-row justify-between px-3 items-start gap-2">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-medium w-16"
          >
            Title
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

        <div className="flex flex-row justify-between px-3 items-start gap-2">
          <Typography
            variant="small"
            color="blue-gray"
            className="w-16 font-medium"
          >
            Subtitle
          </Typography>
          <Input
            crossOrigin={"true"}
            className="min-w-0 h-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            containerProps={{ className: "!min-w-[10px] w-4 h-4" }}
          />
        </div>

        <div className="flex flex-row justify-between px-3 items-start gap-2">
          <Typography
            variant="small"
            color="blue-gray"
            className="w-16 font-medium"
          >
            Logo
          </Typography>
          <Input
            crossOrigin={"true"}
            className="min-w-0 h-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            containerProps={{ className: "!min-w-[10px] w-4 h-4" }}
          />
        </div>
      </div>
    </div>
  );
};
