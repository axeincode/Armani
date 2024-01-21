import React from "react";
import { CardWidget } from "./widgets";
type EditorTargetsProps = {
  setRef: (el: HTMLDivElement) => void;
  data: any;
};

export const EditorTargetsContainer = ({
  setRef,
  data,
}: EditorTargetsProps) => {
  return (
    <div className="elements selecto-area flex" ref={setRef}>
      <CardWidget />
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
  );
};
