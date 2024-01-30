import React from "react";
import { CardWidget } from "../editor/widgets";
import { useEditorPageWidgetsObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { map } from "lodash";
import { WidgetTypes } from "@/types/editor.types";
import { WidgetEnum } from "@/types";

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
            return <CardWidget key={widget.id} data={widget} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
