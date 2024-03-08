"use client";
import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { UploadButton } from "@/components/ui/upload-button";
import { uploadDocumentToStorage } from "@/lib/firebase/storage";
import { useEditorDecksObserveable, useEditorObserveable } from "@/store";
import { DocumentUploadDialog } from "@/components/ui/document-upload-dialog";
import { v4 } from "uuid";
import { DocumentTypeEnum, DocumentTypes } from "@/types/editor.types";
import { useMedia } from "react-use";
import { map } from "lodash";
import { FileIcon, defaultStyles } from "react-file-icon";
import { SectionScroller } from "@/components/ui/sections/section-scroller";
import { Swiper, SwiperSlide } from "swiper/react";

export const DataRoomEditTools = () => {
  // states
  const [isUploading, setIsUploading] = React.useState(false);
  const [showUploader, setShowUploader] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pagesToShow, setPagesToShow] = React.useState(2);

  const editor$ = useEditorObserveable();
  const deckInfo = useEditorDecksObserveable();
  const totalPages = deckInfo?.documents?.length || 0;

  const documents$ = deckInfo?.documents || [];
  const isLargeScreen = useMedia("(min-width: 1024px)", false);
  const isMediumScreen = useMedia("(min-width: 768px)", false);

  React.useEffect(() => {
    if (!isLargeScreen) setPagesToShow(1);
    if (isMediumScreen) setPagesToShow(5);
    if (isLargeScreen) setPagesToShow(8);
  }, [isLargeScreen, isMediumScreen]);

  const setPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleOnDocumentChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (e.target && e.target.files && e.target.files[0]) || null;
    if (!file) return;
    setIsUploading(true);
    const uniqueDocumentId = v4();
    const imageUrl = await uploadDocumentToStorage(uniqueDocumentId, file);
    setIsUploading(false);
    if (file) {
      // get file extension
      const extension = file.name.split(".").pop();

      editor$.updateDocument(deckInfo?.id, {
        id: uniqueDocumentId,
        name: file.name,
        url: imageUrl,
        docType: extension as DocumentTypeEnum,
      });
    }
  };

  const handleOnDeleteDocument = (documentId: string) => {
    editor$.deleteDocument(deckInfo?.id, documentId);
  };

  const renderPages = () => {
    const pages = map(documents$, (page) => {
      const { id, name, docType } = page;
      // break the name with max 15chars and add extension with ellipses
      const breakName =
        name.length > 10
          ? name.substring(0, 10) + "..." + name.split(".").pop()
          : name;

      return (
        <SwiperSlide key={page.id} className="!bg-transparent">
          <div key={id} className="flex flex-col justify-center items-center">
            <div
              className="flex h-12 w-12 p-1 box-border shadow relative bg-gray-800 dark:bg-gray-800 dark:border-gray-600 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:border-gray-500"
              title={name}
            >
              <>
                {/** all 3 file input elements to be  displayed */}
                <FileIcon extension={docType} {...defaultStyles[docType]} />
                <div className="absolute top-0 right-0">
                  <XCircleIcon
                    className="h-4 w-4"
                    color="red"
                    title={name}
                    onClick={() => handleOnDeleteDocument(id)}
                  />
                </div>
              </>
            </div>
            <Typography
              className="text-xs overflow-ellipsis overflow-hidden whitespace-nowrap"
              variant="small"
            >
              {breakName}
            </Typography>
          </div>
        </SwiperSlide>
      ) as any;
    });

    return pages;
  };

  return (
    <div className="flex flex-grow overflow-hidden shadow-lg mr-1 bg-gray-100">
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow w-60 justify-start gap-2 pt-1 px-1">
          <div className="flex flex-row justify-start gap-2 pt-1 px-1">
            <Typography variant="h6" color="gray">
              Data Room
            </Typography>
            <div className="h-6 flex">
              <UploadButton onClick={() => setShowUploader(!showUploader)} />
              <DocumentUploadDialog
                open={showUploader}
                handler={() => setShowUploader(false)}
                deckInfo={deckInfo}
                handleOnFileChange={handleOnDocumentChange}
                isUploading={isUploading}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between px-2 items-center h-16">
            <>
              <SectionScroller>{renderPages()}</SectionScroller>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
