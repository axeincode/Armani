import React from "react";
import { ViewPage } from "./view-page";

type ViewTabPanelProps = {
  pageId: string;
  tabId: string;
};

export const ViewTabPanel = ({ pageId, tabId }: ViewTabPanelProps) => {
  return (
    <div className="flex flex-grow flex-col">
      <>{pageId && <ViewPage pageId={pageId} tabId={tabId} />}</>
    </div>
  );
};
