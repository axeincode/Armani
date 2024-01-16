"use client";
import React from "react";
import { useWindowSize } from "react-use";
import MoveableManager from "../moveable-manager";
import useCallbackRefDimensions from "@/hooks/useCallbackRefDimensions";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { EditorPagination } from "./editor-pagination";
import { EditorPages } from "./editor-pages";
import { PageTitle } from "./page-title";

export const EditorMainArea = () => {
  const totalPages = 7;
  const [page, setPage] = React.useState<number>(1);
  const { width, height } = useWindowSize();
  const [targets, setTargets] = React.useState<HTMLElement[]>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const updateTarget = (target: HTMLElement[]) => {
    setTargets(target);
  };
  const { dimensions, setRef } = useCallbackRefDimensions();

  const setPageValue = (page: number) => {
    if (page < 1) {
      setPage(1);
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
    console.log("numGridLinesX", numGridLinesX, numGridLinesY);
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

  return (
    <div
      className="moveablecontainer relative flex-col flex flex-grow my-8 mx-12 gap-2"
      ref={containerRef}
      /// onClick={(e: React.SyntheticEvent<HTMLElement>) => updateTarget(e.target)}
    >
      <PageTitle page={page} />
      <div className="flex flex-grow relative">
        <MoveableManager
          container={containerRef}
          targets={{ value: targets || [], setValue: updateTarget }}
        />

        <div
          className="grid-container absolute flex flex-1 w-full h-full"
          ref={gridRef}
          style={{
            pointerEvents: "none", // Ensure the grid doesn't interfere with dragging and resizing
          }}
        />

        <EditorPages page={page} setRef={setRef} />
      </div>
      <EditorPagination
        page={page}
        totalPages={totalPages}
        setPage={setPageValue}
      />
    </div>
  );
};
