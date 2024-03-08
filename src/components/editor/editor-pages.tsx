import React from "react";
import { EditorTargetsContainer } from "./editor-targets-container";

type EditorPagesProps = {
  pageId: string;
  onLayoutChange: (layout: any) => void;
};

export const EditorPages = ({ pageId, onLayoutChange }: EditorPagesProps) => {
  // work on page data and then update editor targets container with page data;
  /// const pageData = pageConfigs.find((p) => p.pageIndex === page);
  return (
    <>
      {pageId && (
        <EditorTargetsContainer
          pageId={pageId}
          onLayoutChange={onLayoutChange}
        />
      )}
    </>
  );
};
