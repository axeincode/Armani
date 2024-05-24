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
import { SectionScroller } from "@/components/ui/sections/section-scroller";
import { SwiperSlide } from "@/components/ui/swipers/slider";
import { usePageObserveable } from "@/store";

export const SectionEditTools = () => {
  // states
  const [showEditing, setShowEditing] = React.useState(false);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const [pagesToShow, setPagesToShow] = React.useState(2);
  const pages$ = useEditorPagesObserveable();
  const page$ = usePageObserveable();
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
    const getPage = Object.keys(pages$).filter((key) => {
      return pages$[key].pageNumber === page;
    })[0];
    if (!getPage) return;
    page$.setPageInfo({
      currentPage: page,
      totalPages: Object.keys(pages$).length,
      pageName: pages$[getPage].name,
      pageId: getPage,
    });
  };

  const renderPages = () => {
    const xPages = map(
      pages$,
      (page) =>
        (
          <SwiperSlide key={page.id} className="!bg-transparent">
            <IconButton
              size="sm"
              className="flex"
              onClick={() => setPage(page.pageNumber)}
            >
              <DynamicHeroIcon
                className="h-4 w-4 text-white"
                icon={page.iconName || "Squares2X2Icon"}
              />
            </IconButton>
          </SwiperSlide>
        ) as any
    );
    return xPages;
  };

  return (
    <div className="flex flex-grow overflow-hidden shadow-lg mr-1 bg-gray-100">
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow w-60 justify-start gap-2 pt-1 px-1">
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
          <div className="flex flex-row justify-between px-2 items-center py-1 h-12">
            <>
              <SectionScroller>{renderPages()}</SectionScroller>
            </>
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
