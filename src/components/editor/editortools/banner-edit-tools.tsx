import React from "react";
import { Typography, Input, Spinner } from "@material-tailwind/react";
import { useEditorDecksObserveable, useEditorObserveable } from "@/store";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { updateDeckImage } from "@/lib/firebase/storage";
import { cn } from "@/lib/utils";

export const BannerEditTools = () => {
  // states
  const [isUploading, setIsUploading] = React.useState(false);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const editor$ = useEditorObserveable();
  const deckInfo = useEditorDecksObserveable();
  const hasFileName = deckInfo?.logo?.name ? true : false;
  const handleOnTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor$.updateDeckInfo(deckInfo?.id, "title", e.target.value);
  };

  const handleOnSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor$.updateDeckInfo(deckInfo?.id, "subtitle", e.target.value);
  };

  const handleOnFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target && e.target.files && e.target.files[0]) || null;
    if (!file) return;
    setIsUploading(true);
    const imageUrl = await updateDeckImage(deckInfo?.id, file);
    setIsUploading(false);
    if (file) {
      editor$.updateDeckInfo(deckInfo?.id, "logo", {
        name: file.name,
        url: imageUrl,
      });
    }
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

        <div className="flex flex-row px-3 items-start gap-1 overflow-hidden">
          <Typography
            variant="small"
            color="blue-gray"
            className="w-14 font-medium"
          >
            Logo
          </Typography>
          <div className="h-8 flex items-center">
            {isUploading && <Spinner className="h-4 w-4" />}
            {!isUploading && (
              <input
                className={cn(
                  "block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
                  hasFileName && "w-20"
                )}
                id="file_input"
                type="file"
                onChange={handleOnFileChange}
              />
            )}
            {hasFileName && (
              <Typography
                variant="small"
                className="text-xs w-10 lg:w-24 overflow-ellipsis overflow-hidden whitespace-nowrap"
              >
                {deckInfo?.logo?.name
                  ? deckInfo?.logo?.name
                  : "No file selected"}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
