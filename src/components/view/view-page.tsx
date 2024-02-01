import React from "react";
import { useEditorPageWidgetsObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { map } from "lodash";
import { WidgetTypes } from "@/types/editor.types";
import { WidgetEnum } from "@/types";
import { CardViewWidget } from "./widgets";

type ViewPageProps = {
  pageId: string;
};

export const ViewPage = ({ pageId }: ViewPageProps) => {
  const allWidgets = useEditorPageWidgetsObserveable(pageId);
  console.log("all Widgets", allWidgets);

  return (
    <div className="flex">
      {map(allWidgets, (widget: WidgetTypes) => {
        switch (widget.type) {
          case WidgetEnum.CARD:
            return <CardViewWidget key={widget.id} data={widget} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
