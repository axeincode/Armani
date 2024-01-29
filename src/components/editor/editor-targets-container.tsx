import React from "react";
import { CardWidget } from "./widgets";
import { useEditorPageWidgetsObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { map } from "lodash";
import { WidgetTypes } from "@/types/editor.types";
import { WidgetEnum } from "@/types";

type EditorTargetsProps = {
  pageId: string;
  setRef: (el: HTMLDivElement) => void;
};

export const EditorTargetsContainer = ({
  pageId,
  setRef,
}: EditorTargetsProps) => {
  const allWidgets = useEditorPageWidgetsObserveable(pageId);
  console.log("all Widgets", allWidgets);

  return (
    <div className="elements selecto-area flex" ref={setRef}>
      {map(allWidgets, (widget: WidgetTypes) => {
        switch (widget.type) {
          case WidgetEnum.CARD:
            return <CardWidget key={widget.id} data={widget} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
