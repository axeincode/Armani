import React from "react";

type EditorTargetsProps = {
  setRef: (el: HTMLDivElement) => void;
  data: any;
};

export const EditorTargetsContainer = ({
  setRef,
  data,
}: EditorTargetsProps) => {
  return (
    <div
      className="area-container flex flex-grow rounded border-solid border-4 border-blue-500"
      ref={setRef}
    >
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
  );
};
