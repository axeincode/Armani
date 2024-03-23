"use client";
import React, { useState, useEffect } from "react";
import InfiniteViewer from "react-infinite-viewer";
import Guides from "@scena/react-guides";
import { EditorSidebar } from "./editor-sidebar";
import { EditorMainArea } from "./editor-main-area";
import { EditorTopNav } from "./editor-top-nav";
import { usePageObserveable, useEditorDecksObserveable } from "@/store";
import { EditorStateTypes } from "@/types/editor.types";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { cn } from "@/lib/utils";
import { useMeasure } from "react-use";
import { useWebFontLoader } from "@/hooks/useWebFontLoader";
import { useEditorPagesObserveable } from "@/hooks/useEditorPagesObserveable";

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
  const { loadWebFontCallback } = useWebFontLoader();

  const [canvasRef, canvasProps] = useMeasure();

  const [windowDimensions, setWindowDimensions] = useState({
    width: 2500,
    height: 1580,
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
      return pages$[key].pageNumber === page;
    })[0];
    if (!getPage) return;
    page$.setPageInfo({
      currentPage: page,
      totalPages: Object.keys(pages$).length,
      pageName: pages$[getPage].name,
      pageId: getPage,
    });
  };

  React.useEffect(() => {
    if (!editorRef.current) return;
    setIsReady(true);
  }, [editorRef]);

  React.useEffect(() => {
    if (!deckInfo?.fontFamily) return;
    loadWebFontCallback([deckInfo?.fontFamily]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckInfo?.fontFamily]);

  return (
    <div
      className={cn(
        "flex flex-grow border-2 items-center justify-center border-solid border-gray-200 bg-[#F9F6EE]"
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
        <div className="flex flex-grow w-[1920px] h-[1080px]">
          {isReady && (
            <div
              className="flex flex-col flex-grow"
              data-testid="scena-guide-lines"
            >
              <div
                className={"reset"}
                onClick={(e) => {
                  infiniteViewer.current!.scrollCenter();
                }}
              ></div>

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
                      ...(deckInfo?.fontFamily && {
                        fontFamily: deckInfo?.fontFamily,
                      }),
                    }),
                  }}
                >
                  <EditorTopNav />
                  <div
                    className="flex flex-grow bg-white"
                    style={{
                      ...(deckInfo?.fontFamily && {
                        fontFamily: deckInfo?.fontFamily,
                      }),
                    }}
                  >
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
          )}
        </div>
      </div>
    </div>
  );
};
