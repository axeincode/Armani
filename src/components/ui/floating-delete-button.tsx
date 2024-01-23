"use client";

import React from "react";
import { IconButton } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export type IFloatingDeleteButtonProps = {
  onClick: () => void;
};

export const FloatingDeleteButton = ({
  onClick,
}: IFloatingDeleteButtonProps) => {
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const handleConfirm = () => {
    setOpen(false);
    onClick();
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader>Delete Deck</DialogHeader>
        <DialogBody>Are you sure you want to delete this deck?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="group fixed bottom-10 right-2 p-2  flex items-end justify-end w-24 h-24">
        <IconButton
          color="red"
          className="rounded-full text-white"
          size="sm"
          onClick={handleOpen}
          title="Delete Deck"
        >
          <TrashIcon className="h-4 w-4" />
        </IconButton>
      </div>
    </>
  );
};
