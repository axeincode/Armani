"use client";
import React, { useState, useEffect } from "react";
import { EditorSidebar } from "./editor-sidebar";
import { EditorMainArea } from "./editor-main-area";
import { EditorTopNav } from "./editor-top-nav";
import {
  useEditorPagesObserveable,
  useObservable,
  usePageObserveable,
} from "@/store";
import { motion } from "framer-motion";
import { EditorStateTypes } from "@/types/editor.types";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";

export type EditorGridProps = {
  editorState: EditorStateTypes;
};

export const EditorGrid = ({ editorState }: EditorGridProps) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const page$ = usePageObserveable();
  const currentPage$ = useCurrentPageObserveable();
  const pages$ = useEditorPagesObserveable();
  const [scale, setScale] = useState(1);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [canvasDimensions] = useState({
    width: 1920,
    height: 1080,
  });

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

  useEffect(() => {
    // Function to update window dimensions on resize
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    // Attach resize event listener
    window && window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window && window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (!editorRef.current) return;
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const scaleFactor = Math.min(
      windowDimensions.width / canvasDimensions.width,
      windowDimensions.height / canvasDimensions.height
    );
    setScale(scaleFactor);
  }, [editorRef]);

  console.log("scale", scale, windowDimensions.width, windowDimensions.height);

  return (
    <div
      className="flex flex-grow border-2 border-solid border-gray-200 bg-[#F9F6EE]"
      ref={editorRef}
    >
      <motion.div
        initial={{ transform: "scale(1)" }}
        animate={{ transform: `scale(${scale})` }}
        transition={{ duration: 0.3 }}
        key={scale}
        className="flex flex-col flex-grow"
        // style={{ transform: `scale(${scale})` }}
        data-testid="editor-grid"
        data-scale={scale}
        data-height={windowDimensions.height}
        data-width={windowDimensions.width}
      >
        <EditorTopNav />
        <div className="flex flex-grow bg-white">
          <EditorSidebar
            page={currentPage$}
            setPage={setPage}
            editorState={editorState}
          />
          <EditorMainArea
            page={currentPage$}
            setPage={setPage}
            editorState={editorState}
          />
        </div>
      </motion.div>
    </div>
  );
};
