"use client";
import React, { useState, useEffect } from "react";
import { Drawer } from "@material-tailwind/react";
import { useMedia } from "react-use";
import { motion } from "framer-motion";
import { EditorStateTypes, User } from "@/types/editor.types";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { cn } from "@/lib/utils";
import { ViewSidebar } from "./view-sidebar";
import { ViewHeader } from "./view-header";
import { ViewMainArea } from "./view-main-area";
import { useEditorPagesObserveable } from "@/hooks/useEditorPagesObserveable";
import { useViewPage } from "./useViewPage";

export type ViewMainPageProps = {
  user: User;
};

export const ViewMainPage = ({ user }: ViewMainPageProps) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const { currentPage$, deckInfo, editorState, setPage } = useViewPage();

  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  // is medium screen
  const isMedium = useMedia("(min-width: 768px)");

  return (
    <div
      className={cn(
        "flex flex-col flex-grow border-2 border-solid border-gray-200",
        deckInfo?.shadow && "shadow-lg"
      )}
      data-testid="view-grid2-container"
      style={{
        ...(deckInfo?.background && {
          background: `${deckInfo?.background}`,
        }),
      }}
    >
      <ViewHeader />
      <div className="flex h-full">
        {isMedium && <ViewSidebar page={currentPage$} setPage={setPage} />}
        {!isMedium && (
          <>
            <Drawer open={open} onClose={closeDrawer} className="p-4 h-full">
              <div className="mb-6 flex items-center justify-between h-full">
                <ViewSidebar page={currentPage$} setPage={setPage} />
              </div>
            </Drawer>
          </>
        )}
        <ViewMainArea
          page={currentPage$}
          setPage={setPage}
          editorState={editorState}
          user={user}
        />
      </div>
    </div>
  );
};
