"use client";
import React, { useState, useEffect } from "react";
import {
  useEditorPagesObserveable,
  usePageObserveable,
  useEditorDecksObserveable,
  useEditorObserveable,
  useObservable,
} from "@/store";
import { motion } from "framer-motion";
import { EditorStateTypes, User } from "@/types/editor.types";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { cn } from "@/lib/utils";
import { ViewSidebar } from "./view-sidebar";
import { ViewHeader } from "./view-header";
import { ViewMainArea } from "./view-main-area";

export type ViewMainPageProps = {
  user: User;
};

export const ViewMainPage = ({ user }: ViewMainPageProps) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const page$ = usePageObserveable();
  const currentPage$ = useCurrentPageObserveable();
  const deckInfo = useEditorDecksObserveable();
  const pages$ = useEditorPagesObserveable();
  const editorDeck$ = useEditorObserveable();
  const editorState = useObservable(editorDeck$.getObservable());

  const setPage = (page: number) => {
    const getPage = Object.keys(pages$).filter((key) => {
      return pages$[key].order === page;
    })[0];
    if (!getPage) return;
    page$.setPageInfo({
      currentPage: page,
      totalPages: Object.keys(pages$).length,
      pageName: pages$[getPage].pageName,
      pageId: getPage,
    });
  };

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
      <div className="flex flex-grow">
        <ViewSidebar page={currentPage$} setPage={setPage} />
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
