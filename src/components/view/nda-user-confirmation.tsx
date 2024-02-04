import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Checkbox,
  Spinner,
} from "@material-tailwind/react";

export type NdaUserConfirmationProps = {
  open: boolean;
  handleOpen: () => void;
  ndaMessage: string;
  ndaAskFor: string;
  onConfirm: (value: string) => void;
  isConfirm: boolean;
};

export function NdaUserConfirmation({
  open,
  handleOpen,
  ndaMessage,
  ndaAskFor,
  onConfirm,
  isConfirm: isConfirmInProgress,
}: NdaUserConfirmationProps) {
  const [ndaValue, setNdaValue] = React.useState("");
  const [isConfirm, setIsConfirm] = React.useState(false);

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Non-Disclosure Agreement</DialogHeader>
        <DialogBody>
          <div className="flex flex-col flex-grow px-2 gap-5">
            <Typography
              variant="small"
              color="gray"
              className="flex items-center gap-2"
            >
              <Checkbox
                crossOrigin={"true"}
                checked={isConfirm}
                onChange={(e) => setIsConfirm(e.target.checked)}
              />
              {ndaMessage}
            </Typography>
            <div className="w-28 lg:w-56">
              <Input
                label={ndaAskFor}
                crossOrigin={"true"}
                value={ndaValue}
                onChange={(e) => setNdaValue(e.target.value)}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => onConfirm(ndaValue)}
            disabled={!isConfirm || !ndaValue}
            className="flex items-center gap-2"
          >
            {isConfirmInProgress && (
              <Spinner className="h-5 w-5 mr-2" color="amber" />
            )}
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
