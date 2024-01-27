import React from "react";
import { EditorTargetsContainer } from "./editor-targets-container";
import { deckPageConfigs as pageConfigs } from "@/constants/pages";

type EditorPagesProps = {
  pageId: string;
  setRef: (el: HTMLDivElement) => void;
};

export const EditorPages = ({ pageId, setRef }: EditorPagesProps) => {
  // work on page data and then update editor targets container with page data;
  /// const pageData = pageConfigs.find((p) => p.pageIndex === page);
  return (
    <>{pageId && <EditorTargetsContainer setRef={setRef} pageId={pageId} />}</>
  );
};
