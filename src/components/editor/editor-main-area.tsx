"use client";
import React from "react";
import { useWindowSize } from "react-use";
import useCallbackRefDimensions from "@/hooks/useCallbackRefDimensions";
import { EditorPagination } from "./editor-pagination";
import { EditorPages } from "./editor-pages";
import { PageTitle } from "./page-title";
import MoveablePlusManager from "../moveableplus-manager";
import {
  IPageState,
  useEditorObserveable,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { WidgetEnum } from "@/types";
import { EditorStateTypes } from "@/types/editor.types";
import { orderBy } from "lodash";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { OnDragEnd } from "react-moveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";

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
  const [targets, setTargets] = React.useState<HTMLElement[]>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const mainAreaRef = React.useRef<HTMLDivElement>(null);
  const updateTarget = (target: HTMLElement[]) => {
    setTargets(target);
  };
  const editorObs$ = useEditorObserveable();
  const { dimensions, setRef } = useCallbackRefDimensions();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const currentPage$ = useCurrentPageObserveable();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );
  console.log("selectedWidget", selectedWidgetState);

  // get pages from editor state
  const pages = orderBy(editorState.entities.pages, ["order"], ["asc"]);
  const totalPages = pages.length;

  const setPageValue = (page: number) => {
    if (page < 0) {
      setPage(0);
    } else if (page > totalPages) {
      setPage(totalPages);
    } else {
      setPage(page);
    }
  };

  React.useEffect(() => {
    const gridContainer = gridRef.current;
    if (!gridContainer) return;
    // Calculate the number of grid lines and their spacing
    const gridSize = 20;
    const numGridLinesX = Math.floor(gridContainer.offsetWidth / gridSize);
    const numGridLinesY = Math.floor(gridContainer.offsetHeight / gridSize);
    // Create horizontal grid lines
    for (let i = 0; i < numGridLinesX; i++) {
      const line = document.createElement("div");
      line.className = "grid-line";
      line.style.top = "0";
      line.style.left = `${i * gridSize}px`;
      line.style.width = "1px";
      line.style.height = "100%";
      gridContainer.appendChild(line);
    }

    // Create vertical grid lines
    for (let i = 0; i < numGridLinesY; i++) {
      const line = document.createElement("div");
      line.className = "grid-line";
      line.style.top = `${i * gridSize}px`;
      line.style.left = "0";
      line.style.width = "100%";
      line.style.height = "1px";
      gridContainer.appendChild(line);
    }
  }, [width, height, dimensions]);

  const handleOnMoveableSelect = (widgetId: string, widgetType: WidgetEnum) => {
    selectedWidgetObs$.setSelectedWidget(
      widgetId,
      currentPage$.pageId!,
      widgetType
    );
  };

  const handleOnMoveableUnselect = () => {
    selectedWidgetObs$.unSelect();
  };

  const handleOnChangeEnd = (e: OnDragEnd) => {
    if (e.lastEvent) {
      const { width, height, translate } = e.lastEvent || {};
      console.log("handleOnChangeEnd", width, height);
      console.log("LastEvent", e.lastEvent);
      editorObs$.updateWidget(selectedWidgetState.widgetId, {
        ...editorWidgetState,
        transformation: {
          ...editorWidgetState.transformation,
          ...(translate && { x: translate[0], y: translate[1] }),
          width: width,
          height: height,
        },
      });
    }
  };

  return (
    <div
      className="moveablecontainer relative flex-col flex flex-grow my-8 mx-12 gap-2"
      ref={containerRef}
      /// onClick={(e: React.SyntheticEvent<HTMLElement>) => updateTarget(e.target)}
    >
      <PageTitle page={currentPage} />
      <div className="flex flex-grow relative" ref={mainAreaRef}>
        <div
          className="grid-container absolute flex flex-1 w-full h-full"
          ref={gridRef}
          style={{
            pointerEvents: "none", // Ensure the grid doesn't interfere with dragging and resizing
          }}
        />
        <MoveablePlusManager
          mainAreaRef={mainAreaRef}
          onSelectMoveableStart={handleOnMoveableSelect}
          onUnselectMoveable={handleOnMoveableUnselect}
          onChangeEnd={handleOnChangeEnd}
        >
          <EditorPages pageId={currentPage$.pageId || ""} setRef={setRef} />
        </MoveablePlusManager>
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
