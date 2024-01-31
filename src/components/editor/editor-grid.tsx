"use client";
import React, { useState, useEffect } from "react";
import InfiniteViewer from "react-infinite-viewer";
import Guides from "@scena/react-guides";
import { EditorSidebar } from "./editor-sidebar";
import { EditorMainArea } from "./editor-main-area";
import { EditorTopNav } from "./editor-top-nav";
import {
  useEditorPagesObserveable,
  usePageObserveable,
  useEditorDecksObserveable,
} from "@/store";
import { motion } from "framer-motion";
import { EditorStateTypes } from "@/types/editor.types";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { cn } from "@/lib/utils";
import { useMeasure } from "react-use";

export type EditorGridProps = {
  editorState: EditorStateTypes;
};

export const EditorGrid = ({ editorState }: EditorGridProps) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const page$ = usePageObserveable();
  const currentPage$ = useCurrentPageObserveable();
  const deckInfo = useEditorDecksObserveable();
  const pages$ = useEditorPagesObserveable();
  const [zoom, setZoom] = useState(1);
  const [horizontalSnapLines, setHorizontalSnapLines] = useState<number[]>([]);
  const [verticalSnapLines, setVerticalSnapLines] = useState<number[]>([]);
  const [isReady, setIsReady] = useState(false);
  const horizontalGuidesRef = React.createRef<Guides>();
  const verticalGuidesRef = React.createRef<Guides>();
  const infiniteViewer = React.createRef<InfiniteViewer>();

  const [canvasRef, canvasProps] = useMeasure();

  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const horizontalSnapGuides = [
    0,
    windowDimensions.height,
    windowDimensions.height / 2,
    ...horizontalSnapLines,
  ];
  const verticalSnapGuides = [
    0,
    windowDimensions.width,
    windowDimensions.width / 2,
    ...verticalSnapLines,
  ];
  let unit = 50;

  if (zoom < 0.8) {
    unit = Math.floor(1 / zoom) * 50;
  }

  const setPage = (page: number) => {
    const getPage = Object.keys(pages$).filter((key) => {
      return pages$[key].order === page;
    })[0];
    if (!getPage) return;
    page$.setPageInfo({
      currentPage: page,
      totalPages: Object.keys(pages$).length,
      pageName: pages$[getPage].pageName,
      pageId: getPage,
    });
  };

  React.useEffect(() => {
    if (!editorRef.current) return;
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setIsReady(true);
  }, [editorRef]);

  console.log("scale", windowDimensions.width, windowDimensions.height);
  console.log("props", canvasProps);
  return (
    <div
      className={cn(
        "flex flex-grow border-2 border-solid border-gray-200 bg-[#F9F6EE]"
      )}
      // @ts-ignore
      ref={canvasRef}
      data-testid="editor-grid2-container"
    >
      <div
        ref={editorRef}
        className={cn("overflow-scroll scrollbar")}
        style={{
          width: `${canvasProps?.width}px`,
          height: `${canvasProps?.height}px`,
        }}
      >
        <div className="flex flex-grow w-[1980px] h-[1080px]">
          {isReady && (
            <div className="flex flex-col flex-grow">
              <Guides
                ref={horizontalGuidesRef}
                type="horizontal"
                className={cn("guides absolute", "horizontal")}
                style={{
                  // transform: "translateZ(1px)",
                  width: "100%",
                  height: "30px",
                }}
                snapThreshold={5}
                snaps={horizontalSnapGuides}
                displayDragPos={true}
                dragPosFormat={(v) => `${v}px`}
                zoom={zoom}
                unit={unit}
                onChangeGuides={(e) => {
                  setHorizontalSnapLines(e.guides);
                }}
              ></Guides>
              <div className="flex flex-grow">
                <div className="flex verticalsidebar">
                  <Guides
                    ref={verticalGuidesRef}
                    type="vertical"
                    style={{
                      // transform: "translateZ(1px)",
                      width: "30px",
                      height: "100%",
                    }}
                    snapThreshold={5}
                    snaps={verticalSnapGuides}
                    displayDragPos={true}
                    dragPosFormat={(v) => `${v}px`}
                    zoom={zoom}
                    unit={unit}
                    onChangeGuides={(e) => {
                      setVerticalSnapLines(e.guides);
                    }}
                  ></Guides>
                </div>
                <div className="flex flex-grow">
                  {/** canvas app editor */}
                  <div
                    className={cn(
                      "flex flex-col flex-grow",
                      deckInfo?.shadow && "shadow-lg"
                    )}
                    // style={{ transform: `scale(${scale})` }}
                    data-testid="editor-grid"
                    style={{
                      ...(deckInfo?.background && {
                        background: `${deckInfo?.background}`,
                      }),
                    }}
                  >
                    <EditorTopNav />
                    <div className="flex flex-grow bg-white">
                      <EditorSidebar page={currentPage$} setPage={setPage} />
                      <EditorMainArea
                        page={currentPage$}
                        setPage={setPage}
                        editorState={editorState}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
