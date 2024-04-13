import React from "react";
import ReactGridLayout from "react-grid-layout";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { PageTypes } from "@/types/editor.types";
import { first } from "lodash";
import { ViewTabPanel } from "./view-tab-panel";
import { usePageObserveable } from "@/store";

type ViewTabPagesProps = {
  pageId: string;
  currentPage: any;
  currentPageInfo: PageTypes;
};

export const ViewTabPages = ({
  pageId,
  currentPageInfo,
  currentPage,
}: ViewTabPagesProps) => {
  const page$ = usePageObserveable();
  // work on page data and then update editor targets container with page data;
  /// const pageData = pageConfigs.find((p) => p.pageIndex === page);
  const tabNames = React.useMemo(() => {
    const names = currentPageInfo.tabs?.map((tab) => {
      return tab;
    });
    return names;
  }, [currentPageInfo]);

  const firstTab = first(tabNames);
  const [activeTab, setActiveTab] = React.useState<string>(firstTab?.id || "");

  const handleOnCurrentTab = (tabId: any) => {
    setActiveTab(tabId);
  };

  React.useEffect(() => {
    if (firstTab) {
      setActiveTab(firstTab.id);
    }
  }, [firstTab]);

  React.useEffect(() => {
    if (!page$) return;
    page$.setActiveTab(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <>
      {pageId && (
        <Tabs
          value={firstTab?.name || "html"}
          className="flex flex-col flex-grow"
        >
          <TabsHeader className="min-w-52 bg-gray-800">
            {tabNames &&
              tabNames.map((tab) => (
                <Tab
                  key={tab.id}
                  value={tab.name}
                  onClick={() => handleOnCurrentTab(tab.id)}
                >
                  {tab.name}
                </Tab>
              ))}
          </TabsHeader>
          <TabsBody data-testid="tabs-body">
            {tabNames &&
              tabNames.map((tab) => (
                <TabPanel key={tab.id} value={tab.name}>
                  <ViewTabPanel pageId={pageId} tabId={tab.id} />
                </TabPanel>
              ))}
          </TabsBody>
        </Tabs>
      )}
    </>
  );
};
