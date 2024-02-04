import React from "react";
import { Typography, Input, Spinner, Button } from "@material-tailwind/react";
import { useEditorDecksObserveable, useEditorObserveable } from "@/store";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { updateDeckImage } from "@/lib/firebase/storage";
import { cn } from "@/lib/utils";
import { LogoUploadDialog } from "@/components/ui/logo-upload-dialog";
import { UploadButton } from "@/components/ui/upload-button";

export const BannerEditTools = () => {
  // states
  const [isUploading, setIsUploading] = React.useState(false);
  const [isCoverUploading, setIsCoverUploading] = React.useState(false);

  const [showUploader, setShowUploader] = React.useState(false);
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

  const handleOnCoverFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (e.target && e.target.files && e.target.files[0]) || null;
    if (!file) return;
    setIsCoverUploading(true);
    const imageUrl = await updateDeckImage(deckInfo?.id, file);
    setIsCoverUploading(false);
    if (file) {
      editor$.updateDeckInfo(deckInfo?.id, "coverPhoto", imageUrl);
    }
  };

  return (
    <div className="flex overflow-hidden shadow-lg mr-1 bg-gray-100">
      <div className="flex flex-col gap-2">
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
          <div className="h-6 flex items-center">
            <UploadButton onClick={() => setShowUploader(!showUploader)} />
            <LogoUploadDialog
              deckInfo={deckInfo}
              open={showUploader}
              handleOnFileChange={handleOnFileChange}
              handler={() => setShowUploader(!showUploader)}
              handleOnCoverFileChange={handleOnCoverFileChange}
              isUploading={isUploading}
              isCoverUploading={isCoverUploading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
