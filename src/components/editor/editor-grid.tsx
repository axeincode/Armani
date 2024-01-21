"use client";
import React from "react";
import { EditorSidebar } from "./editor-sidebar";
import { EditorMainArea } from "./editor-main-area";
import { EditorTopNav } from "./editor-top-nav";
import { useObservable, usePageObserveable } from "@/store";

export const EditorGrid = () => {
  const page$ = usePageObserveable();
  const pageState = useObservable(page$.getObservable());

  React.useEffect(() => {
    console.log("pageState", pageState);
  }, [pageState]);

  const setPage = (page: number) => {
    page$.setPage(page);
  };

  return (
    <div className="flex flex-grow">
      <div className="flex flex-col flex-grow ">
        <EditorTopNav />
        <div className="flex flex-grow ">
          <EditorSidebar page={pageState} setPage={setPage} />
          <EditorMainArea page={pageState} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};
