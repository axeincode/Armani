import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import React from "react";

export type AddColumnHelperProps = {
  onAdd: (name: string) => void;
};

export function AddColumnHelper({ onAdd }: AddColumnHelperProps) {
  // popover controlled state open and close and handler
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleOnSave = () => {
    onAdd(name);
    setOpenPopover(false);
  };

  const [openPopover, setOpenPopover] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover placement="bottom" open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <Button
          variant="outlined"
          size="sm"
          color="blue"
          fullWidth
          className="text-xs px-0"
        >
          + Col
        </Button>
      </PopoverHandler>
      <PopoverContent {...triggers} className="w-96">
        <Typography variant="h6" color="blue-gray" className="mb-6">
          Column Details
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 font-bold"
        >
          Name
        </Typography>
        <div className="flex gap-2">
          <Input
            size="lg"
            placeholder="column name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={"true"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="gradient"
            className="flex-shrink-0"
            onClick={handleOnSave}
          >
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
