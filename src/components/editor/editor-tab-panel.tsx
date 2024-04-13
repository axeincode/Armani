import React from "react";
import { EditorTargetsContainer } from "./editor-targets-container";
import ReactGridLayout from "react-grid-layout";
import { PageTypes } from "@/types/editor.types";

type EditorTabPanelProps = {
  pageId: string;
  onLayoutChange: (layout: any) => void;
  allLayoutChange: (layouts: ReactGridLayout.Layouts) => void;
  currentPage: any;
  currentPageInfo: PageTypes;
  tabId: string;
};

export const EditorTabPanel = ({
  pageId,
  onLayoutChange,
  allLayoutChange,
  tabId,
  currentPageInfo,
}: EditorTabPanelProps) => {
  return (
    <div className="flex flex-grow w-full">
      <>
        {pageId && (
          <EditorTargetsContainer
            pageId={pageId}
            onLayoutChange={onLayoutChange}
            allLayoutChange={allLayoutChange}
            tabId={tabId}
          />
        )}
      </>
    </div>
  );
};
