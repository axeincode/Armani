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
import { useDropzone } from "react-dropzone";
import { DeckInfoTypes } from "@/types/editor.types";
import { cn } from "@/lib/utils";

export type DocumentUploadDialogProps = {
  open: boolean;
  handler: () => void;
  deckInfo: DeckInfoTypes;
  handleOnFileChange: (e: File, isLastFile: boolean) => void;
  isUploading: boolean;
};

export function DocumentUploadDialog({
  open,
  handler,
  handleOnFileChange,
  deckInfo,
  isUploading,
}: DocumentUploadDialogProps) {
  const [isDocoUploading, setIsDocoUploading] = React.useState(false);
  const [fileName, setFileName] = React.useState<string>("");
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const hasFileName = deckInfo?.logo?.name ? true : false;
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const totalFiles = acceptedFiles.length;
      // write a for loop and invoke handleOnFileChange for each file
      acceptedFiles.forEach((file: File, idx: number) => {
        const isLastFile = idx === totalFiles - 1;
        handleOnFileChange(file, isLastFile);
      });
    },
    [handleOnFileChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Dialog open={open} handler={handler}>
        <DialogHeader>Upload Document</DialogHeader>
        <DialogBody>
          <div className="flex flex-col flex-grow gap-5">
            {/** all 3 file input elements to be  displayed */}
            <div
              className="flex flex-col flex-grow items-center"
              data-testid="document-upload"
              {...getRootProps()}
            >
              {isUploading && <Spinner className="h-4 w-4" />}
              {!isUploading && (
                <div className="flex flex-col flex-grow items-start justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col flex-grow  items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <input
                      id="dropzone-file"
                      className="hidden"
                      {...getInputProps()}
                    />
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudArrowUpIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Drag & drop some files here, or click to select files
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        xlsx, docx, pptx, pdf (Images MAX. 800x400px)
                      </p>
                      {hasFileName && (
                        <Typography
                          variant="small"
                          className="text-xs w-10 lg:w-48 overflow-ellipsis overflow-hidden whitespace-nowrap"
                          title={fileName}
                        >
                          Selected File:
                          {fileName ? fileName : "No file selected"}
                        </Typography>
                      )}
                    </div>
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
