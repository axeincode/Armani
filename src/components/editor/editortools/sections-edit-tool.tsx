"use client";
import React from "react";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { deckPageConfigs } from "@/constants/pages";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useMedia } from "react-use";

export const SectionEditTools = () => {
  const [color, setColor] = React.useState("#aabbcc");
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pagesToShow, setPagesToShow] = React.useState(2);
  const totalPages = deckPageConfigs.length;

  const isLargeScreen = useMedia("(min-width: 1024px)", false);
  const isMediumScreen = useMedia("(min-width: 768px)", false);

  React.useEffect(() => {
    if (!isLargeScreen) setPagesToShow(1);
    if (isMediumScreen) setPagesToShow(2);
    if (isLargeScreen) setPagesToShow(4);
  }, [isLargeScreen, isMediumScreen]);

  const setPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPages = () => {
    const pages = [];
    for (let i = currentPage; i < currentPage + pagesToShow; i++) {
      if (i <= totalPages) {
        const { id, icon: Icon } = deckPageConfigs[i - 1];
        pages.push(
          <IconButton key={id}>
            <Icon className="h-6 w-6 text-white" />
          </IconButton>
        );
      }
    }
    return pages;
  };

  return (
    <div className="max-w-sm flex flex-grow overflow-hidden shadow-lg mr-1 bg-gray-100">
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow w-60 gap-1">
          <Typography variant="h6" color="gray">
            Sections
          </Typography>
          <div className="flex flex-row justify-between px-2 items-center">
            <IconButton
              variant="text"
              size="sm"
              onClick={() => setPage(currentPage - 1)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </IconButton>
            {renderPages()}

            <IconButton
              variant="text"
              size="sm"
              onClick={() => setPage(currentPage + 1)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </IconButton>

            <Button
              size="sm"
              variant="outlined"
              className="flex items-center gap-2"
            >
              Add
              <PlusCircleIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
