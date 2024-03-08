import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { HexColorPicker } from "react-colorful";

export type ColorPickerProps = {
  open: boolean;
  value?: string;
  onChange: (color: string) => void;
};

const ColorPicker = ({
  open,
  value = "#aabbcc",
  onChange,
}: ColorPickerProps) => {
  const color = value;

  return (
    <>
      <Popover placement="bottom">
        <PopoverHandler>
          <Button
            className="w-3 h-3 p-0 m-0 rounded-none"
            style={{ background: value }}
          >
            {""}
          </Button>
        </PopoverHandler>
        <PopoverContent className="z-50 p-0 flex flex-col flex-shrink gap-1 w-48 bg-gray-300">
          <div className="p-4 flex justify-center items-center h-4 bg-gray-300">
            <Typography variant="h6" color="black">
              {color}
            </Typography>
          </div>
          <div className="flex w-full">
            <HexColorPicker color={color} onChange={onChange} />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ColorPicker;
