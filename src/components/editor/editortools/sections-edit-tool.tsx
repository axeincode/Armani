"use client";
import React from "react";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useMedia } from "react-use";
import { SectionEditManage } from "./section-edit-manage";
import { DynamicHeroIcon } from "@/components/ui/DynamicHeroIcon";
import { useEditorPagesObserveable } from "@/hooks/useEditorPagesObserveable";
import { map } from "lodash";

export const SectionEditTools = () => {
  // states
  const [isUploading, setIsUploading] = React.useState(false);
  const [isCoverUploading, setIsCoverUploading] = React.useState(false);

  const [showEditing, setShowEditing] = React.useState(false);
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const [color, setColor] = React.useState("#aabbcc");
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pagesToShow, setPagesToShow] = React.useState(2);
  const pages$ = useEditorPagesObserveable();
  const totalPages = map(pages$, (page) => page).length;

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

  const renderPages = () => {
    const pages = [];
    const deckPageConfigs$ = map(pages$, (page) => page);
    for (let i = currentPage; i < currentPage + pagesToShow; i++) {
      if (i <= totalPages) {
        const { id, iconName } = deckPageConfigs$[i - 1];
        pages.push(
          <IconButton size="sm" key={id} className="flex">
            <DynamicHeroIcon
              className="h-4 w-4 text-white"
              icon={iconName || "Squares2X2Icon"}
            />
          </IconButton>
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-grow overflow-hidden shadow-lg mr-1 bg-gray-100">
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow w-60 justify-start gap-4 pt-1 px-1">
          <div className="flex flex-row justify-start gap-2 pt-1 px-1">
            <Typography variant="h6" color="gray">
              Sections
            </Typography>
            <div className="h-6 flex">
              <Button
                size="sm"
                variant="outlined"
                className="flex items-center gap-2"
                onClick={() => setShowEditing(true)}
              >
                <PlusCircleIcon className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
          <div className="flex flex-row justify-between px-2 items-center py-1 h-6">
            <IconButton
              variant="text"
              size="sm"
              onClick={() => setPage(currentPage - 1)}
              className="flex"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </IconButton>
            {renderPages()}

            <IconButton
              variant="text"
              size="sm"
              onClick={() => setPage(currentPage + 1)}
              className="flex"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </IconButton>
          </div>

          <SectionEditManage
            open={showEditing}
            handler={() => setShowEditing(!showEditing)}
          />
        </div>
      </div>
    </div>
  );
};
