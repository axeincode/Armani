"use client";
import React from "react";
import { useWindowSize } from "react-use";
import useCallbackRefDimensions from "@/hooks/useCallbackRefDimensions";
import { EditorPagination } from "./editor-pagination";
import { EditorPages } from "./editor-pages";
import { PageTitle } from "./page-title";
import {
  IPageState,
  useEditorObserveable,
  useHoveredWidgetRepo,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { WidgetElement } from "@/types";
import {
  EditorStateTypes,
  GridLayoutData,
  availableHandles,
} from "@/types/editor.types";
import { orderBy, pick } from "lodash";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import ReactGridLayout from "react-grid-layout";

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

  const editorObs$ = useEditorObserveable();
  const { dimensions, setRef } = useCallbackRefDimensions();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const hoveredWidgetRepo = useHoveredWidgetRepo();
  const currentPage$ = useCurrentPageObserveable();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const hoveredState$ = useObservable(hoveredWidgetRepo.getObservable());
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );
  console.log("selectedWidget", selectedWidgetState);

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
      console.log("handleOnLayoutChange", layouts);
      editorObs$.updateLayoutTransformations(layouts);
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
        <EditorPages
          pageId={currentPage$.pageId || ""}
          setRef={setRef}
          onLayoutChange={handleOnLayoutChange}
        />
      </div>
      {totalPages && totalPages > 1 && (
        <EditorPagination
          page={currentPage}
          totalPages={totalPages}
          setPage={setPageValue}
        />
      )}
    </div>
  );
};
