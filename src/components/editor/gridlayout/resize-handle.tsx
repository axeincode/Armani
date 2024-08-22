import React from "react";
import { RoundedRectangleSVG } from "./rounded-rect-svg";
import { cn } from "@/lib/utils";

type ResizeHandleAxis = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";

type ResizeHandleProps = {
  handleAxis: ResizeHandleAxis;
};

const ResizeHandle = React.forwardRef<HTMLDivElement, ResizeHandleProps>(
  ({ handleAxis }, ref) => {
    console.log("ref", ref);
    return (
      <div
        ref={ref}
        className={cn(
          `react-resizable-handle react-resizable-handle-${handleAxis}`,
          handleAxis === "n" && "x-drag-handle cursor-move"
        )}
      >
        <RoundedRectangleSVG />
      </div>
    );
  }
);

ResizeHandle.displayName = "ResizeHandle";
export default ResizeHandle;
