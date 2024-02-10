import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
  Input,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { PageTypes } from "@/types/editor.types";
import { cn } from "@/lib/utils";
import { PlusCircleIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid";
import { useEditorDecksObserveable, useEditorObserveable } from "@/store";
import { useEditorPagesObserveable } from "@/hooks/useEditorPagesObserveable";
import { DynamicHeroIcon } from "@/components/ui/DynamicHeroIcon";
import { map, reduce } from "lodash";
import { v4 } from "uuid";
import { produce } from "immer";
import { SectionEditForm } from "./section-edit-form";

export type SectionEditManageProps = {
  open: boolean;
  handler: () => void;
};

const PageIcons = [
  {
    id: 1,
    iconName: "Squares2X2Icon",
  },
  {
    id: 2,
    iconName: "QueueListIcon",
  },
  {
    id: 3,
    iconName: "BuildingOfficeIcon",
  },
  {
    id: 4,
    iconName: "BuildingLibraryIcon",
  },
  {
    id: 6,
    iconName: "BuildingOffice2Icon",
  },
  {
    id: 7,
    iconName: "BuildingStorefrontIcon",
  },
  {
    id: 8,
    iconName: "HomeModernIcon",
  },
  {
    id: 9,
    iconName: "HomeIcon",
  },
  {
    id: 10,
    iconName: "MapPinIcon",
  },
  {
    id: 11,
    iconName: "CubeTransparentIcon",
  },
  {
    id: 12,
    iconName: "ChartBarIcon",
  },
  {
    id: 13,
    iconName: "GlobeAsiaAustraliaIcon",
  },
  {
    id: 14,
    iconName: "UsersIcon",
  },
  {
    id: 15,
    iconName: "UserGroupIcon",
  },
  {
    id: 16,
    iconName: "AdjustmentsVerticalIcon",
  },
  {
    id: 17,
    iconName: "PresentationChartBarIcon",
  },
  {
    id: 18,
    iconName: "ChartBarSquareIcon",
  },
  {
    id: 19,
    iconName: "PresentationChartLineIcon",
  },
  {
    id: 20,
    iconName: "ArrowTrendingDownIcon",
  },
  {
    id: 21,
    iconName: "ArrowTrendingUpIcon",
  },
  {
    id: 21,
    iconName: "ArrowsPointingOutIcon",
  },
];

export function SectionEditManage({ open, handler }: SectionEditManageProps) {
  const deckInfo = useEditorDecksObserveable();
  const editor$ = useEditorObserveable();
  const pages$ = useEditorPagesObserveable();
  const [openAcc, setOpenAcc] = React.useState(-10);

  const [pages, setPages] = React.useState<PageTypes[]>([]);

  React.useEffect(() => {
    const pageInfoMap = map(pages$, (page: PageTypes) => {
      return {
        ...page,
        iconName: page.iconName || "Squares2X2Icon",
      };
    });
    setPages(pageInfoMap);
  }, [pages$]);

  console.log("pages$", pages$);
  const handleOpenAcc1 = (pageNumber: number) =>
    setOpenAcc((prev) => {
      return prev === pageNumber ? -10 : pageNumber;
    });

  const handleOnNameChange = (pageId: string, value: string) => {
    // editor$.updateDeckInfo(deckInfo?.id, "fontFamily", e);
    editor$.updatePageName(pageId, value);
  };

  const handleOnIconChange = (pageId: string, value: string) => {
    // editor$.updateDeckInfo(deckInfo?.id, "fontFamily", e);
    editor$.updatePageIcon(pageId, value);
  };

  const handleOnAddPage = () => {
    const deckid = deckInfo?.id;
    if (!deckid) return;
    // get max page Number
    const maxPageNumber = reduce(
      pages$,
      (max, page) => (page.pageNumber > max ? page.pageNumber : max),
      0
    );
    const pageData: PageTypes = {
      id: v4(),
      pageNumber: maxPageNumber + 1,
      name: "New Page",
      iconName: "Squares2X2Icon",
    };
    editor$.addNewPage(deckid, pageData);
  };

  const handleOnDeletePage = (pageId: string) => {
    const deckid = deckInfo?.id;
    if (!deckid) return;
    editor$.deletePage(deckid, pageId);
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handler}
        size="xs"
        className={cn("overflow-scroll h-52 lg:h-96 scrollbar")}
      >
        <DialogHeader>Add Sections</DialogHeader>
        <DialogBody className="items-center overflow-auto">
          <div className="flex flex-col justify-between flex-grow gap-2">
            {map(pages, (page: PageTypes) => {
              return (
                <div
                  key={page.id}
                  className={cn(
                    "flex flex-row justify-between p-1 items-center",
                    openAcc === page.pageNumber && "items-start"
                  )}
                >
                  <Accordion
                    open={openAcc === page.pageNumber}
                    className="text-xs lg:w-60 overflow-auto"
                    data-testid="accordion"
                  >
                    <AccordionHeader
                      onClick={() => handleOpenAcc1(page.pageNumber)}
                      className={cn(
                        "text-xs py-1 gap-2 flex justify-start",
                        openAcc === page.pageNumber
                          ? "border-b-[1px] border-gray-400"
                          : "border-none"
                      )}
                      data-testid="accordion-header"
                    >
                      <DynamicHeroIcon
                        className="h-4 w-4"
                        icon={page.iconName || "Squares2X2Icon"}
                      />
                      <div className="w-36">
                        <Typography variant="small" color="gray">
                          {page.name}
                        </Typography>
                      </div>
                    </AccordionHeader>
                    <AccordionBody>
                      <SectionEditForm
                        page={page}
                        onChange={handleOnNameChange}
                        onIconChange={handleOnIconChange}
                      />
                    </AccordionBody>
                  </Accordion>
                  <IconButton
                    size="sm"
                    variant="text"
                    color="red"
                    className="p-0 m-0 h-5 w-5 min-w-0 rounded-full"
                    onClick={() => handleOnDeletePage(page.id)}
                  >
                    <ArchiveBoxXMarkIcon className="h-4 w-4" />
                  </IconButton>
                </div>
              );
            })}

            <div className="flex flex-row gap-4 mt-2 lg:w-full items-center text-xs border-2 border-dashed border-gray-400">
              <Button
                size="sm"
                variant="text"
                className="h-5 w-full rounded-full flex flex-row justify-center items-center gap-2"
                onClick={handleOnAddPage}
              >
                <PlusCircleIcon className="h-4 w-4" />
                Add Section
              </Button>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button size="sm" variant="gradient" color="green" onClick={handler}>
            <span className="text-xs">Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
