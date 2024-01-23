"use client";
import React from "react";
import { IconButton } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export type IFloatingCreateButtonProps = {
  onClick: () => void;
};

export const FloatingCreateButton = ({
  onClick,
}: IFloatingCreateButtonProps) => {
  return (
    <div className="group fixed bottom-0 right-0 p-2  flex items-end justify-end w-24 h-24">
      <IconButton
        color="amber"
        className="rounded-full "
        size="sm"
        onClick={onClick}
        title="Create Deck"
      >
        <PlusIcon className="h-4 w-4" />
      </IconButton>
    </div>
  );
};
