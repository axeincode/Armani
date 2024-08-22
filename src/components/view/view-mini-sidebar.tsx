"use client";
import React from "react";
import {
  Squares2X2Icon,
  QueueListIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CubeTransparentIcon,
  ChartBarIcon,
  GlobeAsiaAustraliaIcon,
  UsersIcon,
  XCircleIcon,
  InformationCircleIcon,
  DocumentChartBarIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { cn } from "@/lib/utils";
import { IPageState, useEditorDecksObserveable } from "@/store";
import { DocumentTypes, PageTypes } from "@/types/editor.types";
import { useEditorPagesObserveable } from "@/hooks/useEditorPagesObserveable";
import { DynamicHeroIcon } from "../ui/DynamicHeroIcon";
import { map } from "lodash";
import { FileIcon, defaultStyles } from "react-file-icon";
import { DialogViewWorkBook } from "./excel-utils/dialog-view-workbook";

export interface Item {
  id: number;
  title: string;
  icon: any;
}

const drawerItems: Item[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: Squares2X2Icon,
  },
  {
    id: 2,
    title: "Deal Overview",
    icon: QueueListIcon,
  },
  {
    id: 3,
    title: "The Property",
    icon: BuildingOfficeIcon,
  },
  {
    id: 4,
    title: "The Market",
    icon: MapPinIcon,
  },
  {
    id: 5,
    title: "Business Plan",
    icon: ChartBarIcon,
  },
  {
    id: 6,
    title: "Financials",
    icon: CubeTransparentIcon,
  },
  {
    id: 7,
    title: "Comps",
    icon: GlobeAsiaAustraliaIcon,
  },
  {
    id: 8,
    title: "Sponsorship",
    icon: UsersIcon,
  },
];

export type EditorSidebarProps = {
  page: IPageState;
  setPage: (page: number) => void;
  onClose: () => void;
};

export const ViewMiniSidebar = ({
  page,
  setPage,
  onClose,
}: EditorSidebarProps) => {
  const [showUploader, setShowUploader] = React.useState(false);
  const [selectedDocument, setSelectedDocument] =
    React.useState<DocumentTypes | null>(null);
  const [menuItems, setMenuItems] = React.useState<Item[]>(drawerItems);
  const deckInfo = useEditorDecksObserveable();
  const pages$ = useEditorPagesObserveable();
  const [openDocument, setOpenDocument] = React.useState<Boolean>(false);
  const [openDisclaimer, setOpeDisclaimer] = React.useState<Boolean>(false);
  const [openAlert, setOpenAlert] = React.useState(true);
  const documents$ = deckInfo?.documents || [];
  const handleDocumentOpen = () => {
    setOpenDocument(!openDocument);
  };

  const handleDisclaimerOpen = () => {
    setOpeDisclaimer(!openDisclaimer);
  };

  return (
    <div
      className={cn("flex flex-wrap h-full bg-gray-800", "w-10")}
      style={{
        ...(deckInfo?.sidebar && {
          background: `${deckInfo?.sidebar}`,
        }),
      }}
    >
      <>
        <Card
          className="h-full w-48 max-w-20 p-4"
          style={{
            ...(deckInfo?.sidebar && {
              background: `${deckInfo?.sidebar}`,
            }),
          }}
        >
          <div className="mb-1 flex justify-between">
            <Typography variant="h5" color="white">
              Sidebar
            </Typography>
            <IconButton variant="text" size="sm" onClick={() => onClose()}>
              <XCircleIcon className="h-6 w-6 text-white" />
            </IconButton>
          </div>
          <List className="min-w-fit p-0">
            {map(pages$, (page: PageTypes, index: number) => {
              return (
                <React.Fragment key={page.id}>
                  <ListItem
                    key={page.id}
                    className="text-white text-xs py-1"
                    data-pageid={page.id}
                    data-indexid={index}
                    onClick={() => setPage(page.pageNumber)}
                  >
                    <ListItemPrefix>
                      <DynamicHeroIcon
                        className="h-6 w-6 text-white"
                        icon={page.iconName || "Squares2X2Icon"}
                      />
                    </ListItemPrefix>
                    <Typography
                      className="text-xs"
                      variant="small"
                      style={{
                        fontFamily: "inherit",
                      }}
                    >
                      {page.name || page.title || ` `}
                    </Typography>
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>

          <List className="min-w-fit p-0">
            <Accordion
              open={!!openDocument}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-4 w-4 text-white transition-transform ${
                    openDocument ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                className="text-white text-xs p-0"
                selected={!!openDocument}
              >
                <AccordionHeader
                  onClick={handleDocumentOpen}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <DocumentChartBarIcon className="h-6 w-6 text-white" />
                  </ListItemPrefix>
                  <Typography
                    className="text-xs text-white"
                    variant="small"
                    style={{
                      fontFamily: "inherit",
                    }}
                  >
                    Documents
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody
                className={cn(
                  "py-1 h-5  overflow-auto scrollbar px-2",
                  openDocument && "h-32"
                )}
              >
                {map(documents$, (doc: DocumentTypes, index: number) => {
                  return (
                    <ListItem
                      key={doc.id}
                      className="text-white text-xs py-2"
                      data-pageid={doc.id}
                      data-indexid={index}
                      onClick={() => {
                        setSelectedDocument(doc);
                        setShowUploader(true);
                      }}
                    >
                      <ListItemPrefix>
                        <div className="h-5 w-5 ">
                          <FileIcon
                            extension={doc.docType}
                            {...defaultStyles[doc.docType]}
                          />
                        </div>
                      </ListItemPrefix>
                      <Typography
                        className="text-xs overflow-ellipsis overflow-hidden whitespace-nowrap"
                        variant="small"
                        style={{
                          fontFamily: "inherit",
                        }}
                      >
                        {doc.name || ` `}
                      </Typography>
                    </ListItem>
                  );
                })}
              </AccordionBody>
            </Accordion>
          </List>

          <List className="min-w-fit p-0">
            <Accordion
              open={!!openDisclaimer}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-4 w-4 text-white transition-transform ${
                    openDisclaimer ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                className="text-white text-xs p-0"
                selected={!!openDisclaimer}
              >
                <AccordionHeader
                  onClick={handleDisclaimerOpen}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <InformationCircleIcon className="h-6 w-6 text-white" />
                  </ListItemPrefix>
                  <Typography
                    className="text-xs text-white"
                    variant="small"
                    style={{
                      fontFamily: "inherit",
                    }}
                  >
                    Disclaimer
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody
                className={cn(
                  "py-1 h-5  overflow-auto scrollbar",
                  openDisclaimer && "h-32"
                )}
              >
                <Typography
                  className="text-xs text-white"
                  variant="small"
                  style={{
                    fontFamily: "inherit",
                  }}
                >
                  {deckInfo?.disclaimer.description || ` `}
                </Typography>
              </AccordionBody>
            </Accordion>
          </List>
        </Card>
      </>
      <>
        {selectedDocument && (
          <DialogViewWorkBook
            open={showUploader}
            handler={() => setShowUploader(false)}
            selectedDocument={selectedDocument}
          />
        )}
      </>
    </div>
  );
};
