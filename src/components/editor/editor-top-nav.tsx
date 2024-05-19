import React from "react";
import { Typography } from "@material-tailwind/react";
import { InputWithSearchAddon } from "../ui/input-search-addon";
import { useEditorDecksObserveable } from "@/store";
import { EditorCompanyLogo } from "../company-logo-ui";

export const EditorTopNav = () => {
  const deckInfo = useEditorDecksObserveable();
  return (
    <div
      className="flex items-center justify-between h-16 border-gray-10 border-[0.5px] border-solid shadow"
      data-tesid="editor-top-nav"
      style={{
        ...(deckInfo?.navbar && {
          background: `${deckInfo?.navbar}`,
        }),
      }}
    >
      <div>{``}</div>
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
