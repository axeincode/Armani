import React from "react";
import { Typography, Input } from "@material-tailwind/react";
import { useEditorDecksObserveable, useEditorObserveable } from "@/store";

export const BannerEditTools = () => {
  const editor$ = useEditorObserveable();
  const deckInfo = useEditorDecksObserveable();

  const handleOnTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor$.updateDeckInfo(deckInfo?.id, "title", e.target.value);
  };

  const handleOnSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor$.updateDeckInfo(deckInfo?.id, "subtitle", e.target.value);
  };

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
            onChange={handleOnTitleChange}
            value={deckInfo?.title}
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
            onChange={handleOnSubtitleChange}
            value={deckInfo?.subtitle}
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
