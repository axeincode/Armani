import React from "react";
import { CardWidget } from "./widgets";
import { useEditorPageWidgetsObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { map } from "lodash";
import { WidgetTypes } from "@/types/editor.types";
import { WidgetEnum } from "@/types";
import { FrameWidget } from "./widgets/frame-widget";

type EditorTargetsProps = {
  pageId: string;
  setRef: (el: HTMLDivElement) => void;
};

export const EditorTargetsContainer = ({
  pageId,
  setRef,
}: EditorTargetsProps) => {
  const allWidgets = useEditorPageWidgetsObserveable(pageId);

  return (
    <div className="elements selecto-area flex flex-grow" ref={setRef}>
      {map(allWidgets, (widget: WidgetTypes) => {
        switch (widget.type) {
          case WidgetEnum.CARD:
            return <CardWidget key={widget.id} data={widget} />;
          case WidgetEnum.FRAME:
            return <FrameWidget key={widget.id} data={widget} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
