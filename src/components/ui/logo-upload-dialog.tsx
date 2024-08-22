import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { DeckInfoTypes } from "@/types/editor.types";
import { cn } from "@/lib/utils";

export type LogoUploadDialogProps = {
  open: boolean;
  handler: () => void;
  deckInfo: DeckInfoTypes;
  handleOnFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnCoverFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  isCoverUploading: boolean;
};

export function LogoUploadDialog({
  open,
  handler,
  handleOnFileChange,
  handleOnCoverFileChange,
  deckInfo,
  isUploading,
  isCoverUploading,
}: LogoUploadDialogProps) {
  const [isLogoUploading, setIsLogoUploading] = React.useState(false);
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const hasFileName = deckInfo?.logo?.name ? true : false;
  const hasCoverName = deckInfo?.coverPhoto ? true : false;

  return (
    <>
      <Dialog open={open} handler={handler}>
        <DialogHeader>Upload Logo</DialogHeader>
        <DialogBody>
          <div className="flex flex-col flex-grow gap-5">
            {/** all 3 file input elements to be  displayed */}
            <div
              className="flex flex-col flex-grow items-center"
              data-testid="logo-image-upload"
            >
              {isUploading && <Spinner className="h-4 w-4" />}
              {!isUploading && (
                <div className="flex flex-col flex-grow items-start justify-center w-full">
                  <Typography
                    variant="h6"
                    className="text-sm w-10 lg:w-24 overflow-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    {"Small Logo"}
                  </Typography>
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col flex-grow  items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudArrowUpIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG (MAX. 800x400px)
                      </p>
                      {hasFileName && (
                        <Typography
                          variant="small"
                          className="text-xs w-10 lg:w-48 overflow-ellipsis overflow-hidden whitespace-nowrap"
                          title={deckInfo?.logo?.name}
                        >
                          Selected File:{" "}
                          {deckInfo?.logo?.name
                            ? deckInfo?.logo?.name
                            : "No file selected"}
                        </Typography>
                      )}
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleOnFileChange}
                    />
                  </label>
                </div>
              )}
            </div>

            <div
              className="flex flex-grow items-center"
              data-testid="cover-image-upload"
            >
              {isCoverUploading && <Spinner className="h-4 w-4" />}
              {!isCoverUploading && (
                <div className="flex flex-col items-start justify-center w-full">
                  <Typography
                    variant="h6"
                    className="text-sm w-10 lg:w-24 overflow-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    {"Cover Photo"}
                  </Typography>
                  <label
                    htmlFor="dropzone-coverfile"
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudArrowUpIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG (MAX. 1600x800px)
                      </p>
                      {hasCoverName && (
                        <Typography
                          variant="small"
                          className="text-xs w-10 lg:w-48 overflow-ellipsis overflow-hidden whitespace-nowrap"
                          title={deckInfo?.coverPhoto}
                        >
                          Selected File:{" "}
                          {deckInfo?.coverPhoto
                            ? deckInfo?.coverPhoto
                            : "No file selected"}
                        </Typography>
                      )}
                    </div>
                    <input
                      id="dropzone-coverfile"
                      type="file"
                      className="hidden"
                      onChange={handleOnCoverFileChange}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handler}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
