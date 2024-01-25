import React from "react";
import { Typography } from "@material-tailwind/react";
import { CompanyLogo } from "../company-logo";
import { InputWithSearchAddon } from "../ui/input-search-addon";
import { useEditorDecksObserveable } from "@/store";

export const EditorTopNav = () => {
  const deckInfo = useEditorDecksObserveable();
  return (
    <div className="flex items-center justify-between h-16  bg-gray-800">
      <InputWithSearchAddon onChange={() => {}} value="Search the deck" />
      <div className="flex text-xs items-center justify-between gap-1">
        <Typography
          as="h4"
          color="white"
          className="text-xs md:text-base font-bold"
        >
          {deckInfo?.title || ""}
        </Typography>
        <Typography color="white" className="mt-1 text-xs">
          {deckInfo?.subtitle || ""}
        </Typography>
      </div>
      <CompanyLogo inverse={true} variant="h6" iconSize="h-4 w-4" />
    </div>
  );
};
