"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { CompanyLogo } from "../company-logo";
import { InputWithSearchAddon } from "../ui/input-search-addon";
import { useEditorDecksObserveable } from "@/store";
import { EditorCompanyLogo } from "../company-logo-ui";

export const ViewHeader = () => {
  const deckInfo = useEditorDecksObserveable();
  return (
    <div
      className="flex items-center justify-between h-16 border-2 border-solid border-gray-200"
      data-tesid="editor-top-nav"
      style={{
        ...(deckInfo?.navbar && {
          background: `${deckInfo?.navbar}`,
        }),
      }}
    >
      <InputWithSearchAddon onChange={() => {}} value="Search the deck" />
      <div className="flex text-xs items-center justify-between gap-1">
        <Typography
          as="h4"
          color="white"
          className="text-xs md:text-base font-bold"
          style={{
            fontFamily: "inherit",
          }}
        >
          {deckInfo?.title || ""}
        </Typography>
        <Typography
          color="white"
          className="mt-1 text-xs"
          style={{
            fontFamily: "inherit",
          }}
        >
          {deckInfo?.subtitle || ""}
        </Typography>
      </div>
      <EditorCompanyLogo
        inverse={true}
        variant="h6"
        logoUrl={deckInfo?.logo?.url}
      />
    </div>
  );
};
