"use client";
import React from "react";
import { FrameWidget } from "../widgets/frame-widget";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";

export interface RenderWidgetItemProps {
  id: string;
}

export const RenderWidgetItem = ({ id }: RenderWidgetItemProps) => {
  const editorWidgetState = useEditorWidgetObserveable(id);

  return (
    <div className="flex flex-grow items-start" data-widgetid={id}>
      {editorWidgetState && <FrameWidget key={id} data={editorWidgetState} />}
    </div>
  );
};
