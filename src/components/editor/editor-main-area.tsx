"use client";
import React from "react";
import { useWindowSize } from "react-use";
import useCallbackRefDimensions from "@/hooks/useCallbackRefDimensions";
import { EditorPagination } from "./editor-pagination";
import { EditorPages } from "./editor-pages";
import { EditorTabPages } from "./editor-tab-pages";
import { PageTitle } from "./page-title";
import {
  IPageState,
  useEditorDecksObserveable,
  useEditorObserveable,
  useHoveredWidgetRepo,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { WidgetElement } from "@/types";
import {
  EditorStateTypes,
  GridLayoutData,
  PageTypes,
  availableHandles,
} from "@/types/editor.types";
import { get, map, orderBy, pick } from "lodash";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import ReactGridLayout from "react-grid-layout";
import { ReactTableWidget } from "../ui/table";
import {
  useEditorPageObserveable,
  useEditorPagesObserveable,
} from "@/hooks/useEditorPagesObserveable";
import { DashboardViewComponent } from "@/components/ui/dashboard/dashboard-view";

export type EditorMainAreaProps = {
  page: IPageState;
  setPage: (page: number) => void;
  editorState: EditorStateTypes;
};

export const EditorMainArea = ({
  page,
  setPage,
  editorState,
}: EditorMainAreaProps) => {
  const { currentPage } = page;
  const { width, height } = useWindowSize();
  const [unSelect, setUnselect] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const mainAreaRef = React.useRef<HTMLDivElement>(null);
  const currentWidgetState = useCurrentWidgetObserveable();
  const deckInfo = useEditorDecksObserveable();
  const pages$ = useEditorPagesObserveable();
  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const hoveredWidgetRepo = useHoveredWidgetRepo();
  const currentPage$ = useCurrentPageObserveable();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const hoveredState$ = useObservable(hoveredWidgetRepo.getObservable());
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  /// current pageInfo;
  const currentPageInfo$ = React.useMemo(() => {
    if (currentPage$.pageId) {
      return pages$[currentPage$.pageId];
    }
    return {} as unknown as PageTypes;
  }, [currentPage$, pages$]);

  const hasTabs = currentPageInfo$.tabs && currentPageInfo$.tabs.length > 0;

  console.log("currentPageInfo$", currentPageInfo$);
  console.log("pages$", pages$);

  React.useEffect(() => {
    if (selectedWidgetState.widgetId === "") {
      setUnselect(true);
    } else {
      setUnselect(false);
    }
  }, [selectedWidgetState]);

  // get pages from editor state
  const pages = orderBy(editorState.entities.pages, ["order"], ["asc"]);
  const totalPages = pages.length;

  const setPageValue = (page: number) => {
    if (page < 0) {
      setPage(0);
      selectedWidgetObs$.unSelect();
    } else if (page > totalPages) {
      setPage(totalPages);
      selectedWidgetObs$.unSelect();
    } else {
      setPage(page);
      selectedWidgetObs$.unSelect();
    }
  };

  const handleOnMoveableSelect = (
    widgetId: string,
    widgetElement: WidgetElement
  ) => {
    selectedWidgetObs$.setSelectedWidget(
      widgetId,
      currentPage$.pageId!,
      widgetElement
    );
  };

  const handleOnClickInternalWidget = (e: any) => {
    const target = e.target;
    const widgetType = target.getAttribute("data-widget");
    const widgetElement = target.getAttribute("data-element-type");
    console.log("getInternalValue widgetType", widgetType);
    if (widgetType) {
      selectedWidgetObs$.setSelectedWidget(
        selectedWidgetState.widgetId,
        currentPage$.pageId!,
        widgetElement
      );
    }
  };

  const handleOnMoveableUnselect = () => {
    selectedWidgetObs$.unSelect();
  };

  const handleOnLayoutChange = (layouts: ReactGridLayout.Layout[]) => {
    if (layouts) {
      const correctedLayouts = map(layouts, (layout) => {
        const { i, x, y, w, h } = layout;
        return {
          ...layout,
          h: isNaN(h) ? 2 : h,
          y: isNaN(y) ? Infinity : y,
        };
      });
      editorObs$.updateLayoutTransformations(correctedLayouts);
    }
  };

  const handleOnAllLayoutChange = (layouts: ReactGridLayout.Layouts) => {
    if (layouts && currentPage$.pageId!) {
      editorObs$.updatePageLayouts(currentPage$.pageId!, layouts);
    }
  };

  const handleOnDelete = (e: any) => {
    if (!currentWidgetState.widgetId) return;
    editorObs$.deleteWidget(
      currentWidgetState.pageId,
      currentWidgetState.widgetId
    );
    selectedWidgetObs$.unSelect();
  };

  return (
    <div
      className="moveablecontainer relative flex-col flex flex-grow my-8 mx-[50px] gap-2"
      ref={containerRef}
      /// onClick={(e: React.SyntheticEvent<HTMLElement>) => updateTarget(e.target)}
    >
      <PageTitle page={currentPage} />
      <div className="flex flex-grow relative bg-gray-200" ref={mainAreaRef}>
        <>
          {currentPage === 0 && (
            <>
              <DashboardViewComponent
                coverPhoto={deckInfo.coverPhoto}
                title={deckInfo.title}
                subtitle={deckInfo.subtitle}
                pages={pages$}
                setPage={setPageValue}
              />
            </>
          )}
          {currentPage > 0 && !hasTabs && (
            <EditorPages
              pageId={currentPage$.pageId || ""}
              onLayoutChange={handleOnLayoutChange}
              allLayoutChange={handleOnAllLayoutChange}
            />
          )}
          {currentPage > 0 && hasTabs && (
            <EditorTabPages
              pageId={currentPage$.pageId || ""}
              onLayoutChange={handleOnLayoutChange}
              allLayoutChange={handleOnAllLayoutChange}
              currentPage={currentPage$}
              currentPageInfo={currentPageInfo$}
            />
          )}
        </>
      </div>
      {totalPages && totalPages > 1 && (
        <EditorPagination
          page={currentPage}
          totalPages={totalPages}
          setPage={setPageValue}
        />
      )}
      {/** React table */}
    </div>
  );
};
