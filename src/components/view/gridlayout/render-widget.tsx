"use client";
import React from "react";
import { FrameWidget } from "../widgets/frame-view-widget";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useMeasure } from "react-use";
import { Spinner } from "@material-tailwind/react";

export interface RenderWidgetItemProps {
  id: string;
}

export const RenderWidgetItem = ({ id }: RenderWidgetItemProps) => {
  const editorWidgetState = useEditorWidgetObserveable(id);
  const [isMounted, setIsMounted] = React.useState(false);
  const [ref, { x, y, width, height, top, right, bottom, left }] =
    useMeasure<HTMLDivElement>();

  React.useEffect(() => {
    setIsMounted(false);
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, [id]);

  return (
    <div
      className="flex flex-grow items-start"
      data-widgetid={id}
      data-comp="render-widget-item"
      ref={ref}
    >
      <div className="flex justify-center">{!isMounted && <Spinner />}</div>
      {isMounted && editorWidgetState && (
        <FrameWidget
          key={id}
          data={editorWidgetState}
          height={height}
          width={width}
        />
      )}
    </div>
  );
};
