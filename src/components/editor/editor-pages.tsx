import React from "react";
import { EditorTargetsContainer } from "./editor-targets-container";
import ReactGridLayout from "react-grid-layout";

type EditorPagesProps = {
  pageId: string;
  onLayoutChange: (layout: any) => void;
  allLayoutChange: (layouts: ReactGridLayout.Layouts) => void;
};

export const EditorPages = ({
  pageId,
  onLayoutChange,
  allLayoutChange,
}: EditorPagesProps) => {
  // work on page data and then update editor targets container with page data;
  /// const pageData = pageConfigs.find((p) => p.pageIndex === page);
  return (
    <>
      {pageId && (
        <EditorTargetsContainer
          pageId={pageId}
          onLayoutChange={onLayoutChange}
          allLayoutChange={allLayoutChange}
        />
      )}
    </>
  );
};
