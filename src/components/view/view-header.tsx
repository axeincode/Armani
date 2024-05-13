"use client";
import React from "react";
import {
  XMarkIcon,
  Bars3Icon,
  ArrowLeftCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { Typography, IconButton, Drawer } from "@material-tailwind/react";
import { InputWithSearchAddon } from "../ui/input-search-addon";
import { useEditorDecksObserveable } from "@/store";
import { useMedia } from "react-use";
import { EditorCompanyLogo } from "../company-logo-ui";
import { ViewMiniSidebar } from "./view-mini-sidebar";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { useViewPage } from "./useViewPage";

export const ViewHeader = () => {
  const deckInfo = useEditorDecksObserveable();
  const currentPage$ = useCurrentPageObserveable();
  const { setPage } = useViewPage();

  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  // is medium screen
  const isMedium = useMedia("(min-width: 768px)");

  return (
    <div
      className="flex items-center justify-between h-16 border-2 border-solid border-gray-200"
      data-tesid="editor-top-nav"
      style={{
        ...(deckInfo?.navbar && {
          background: `${deckInfo?.navbar}`,
        }),
      }}
    >
      {isMedium && (
        <div className="flex items-center gap-2 ml-1">
          <ArrowLeftCircleIcon className="h-4 w-4 text-yellow-500" />
          <Link href="/" className="hover:underline">
            <Typography color="yellow" className="text-sm font-bold">
              Dashboard
            </Typography>
          </Link>
        </div>
      )}
      {!isMedium && (
        <>
          <IconButton variant="text" size="sm" onClick={() => openDrawer()}>
            <Bars3Icon className="h-6 w-6 text-white" />
          </IconButton>

          <>
            <Link href={"/"}>
              <HomeIcon className="h-6 w-6 text-white" />
            </Link>
          </>
        </>
      )}
      {!isMedium && (
        <>
          <Drawer
            open={open}
            onClose={closeDrawer}
            className="p-1 h-full"
            size={200}
          >
            <div className="mb-6 flex items-center justify-between h-full">
              <ViewMiniSidebar
                page={currentPage$}
                setPage={setPage}
                onClose={closeDrawer}
              />
            </div>
          </Drawer>
        </>
      )}
      <div className="flex text-xs items-center justify-between gap-1">
        <Typography
          as="h4"
          color="white"
          className="text-xs md:text-base font-bold"
          style={{
            fontFamily: "inherit",
          }}
        >
          {deckInfo?.title || ""}
        </Typography>
        <Typography
          color="white"
          className="mt-1 text-xs"
          style={{
            fontFamily: "inherit",
          }}
        >
          {deckInfo?.subtitle || ""}
        </Typography>
      </div>
      <EditorCompanyLogo
        inverse={true}
        variant="h6"
        logoUrl={deckInfo?.logo?.url}
      />
    </div>
  );
};
