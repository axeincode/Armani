import React from "react";
import MoveableManager from "../moveable-manager";

export const EditorMainArea = () => {
  const [targets, setTargets] = React.useState<HTMLElement[]>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const updateTarget = (target: HTMLElement[]) => {
    setTargets(target);
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
  }, []);

  return (
    <div
      className="moveablecontainer relative flex flex-grow rounded border-solid border-4 border-gray-500 m-20"
      ref={containerRef}
      /// onClick={(e: React.SyntheticEvent<HTMLElement>) => updateTarget(e.target)}
    >
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
      <div className="area-container flex flex-grow rounded border-solid border-4 border-blue-500">
        <div
          className="target border-5 border-solid rounded h-8 w-8"
          id="target1"
        >
          target1
        </div>
        <div
          className="target border-5 border-solid rounded h-8 w-8"
          id="target2"
        >
          target2
        </div>
        <div
          className="target border-5 border-solid rounded h-8 w-8"
          id="target3"
        >
          target3
        </div>
      </div>
    </div>
  );
};
