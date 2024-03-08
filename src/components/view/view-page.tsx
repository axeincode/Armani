import React from "react";
import { useEditorPageWidgetsObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { map } from "lodash";
import { WidgetTypes } from "@/types/editor.types";
import GridLayout from "./gridlayout/resize-grid-layout";

type ViewPageProps = {
  pageId: string;
};

export const ViewPage = ({ pageId }: ViewPageProps) => {
  const allWidgets = useEditorPageWidgetsObserveable(pageId);
  const layoutData = React.useMemo(() => {
    const widgetLayoutData = map(allWidgets, (widget: WidgetTypes) => {
      return {
        i: widget.id,
        x: widget.transformation.x,
        y: widget.transformation.y,
        w: widget.transformation.w,
        h: widget.transformation.h,
        resizeHandles: [],
      };
    });
    const gridlayoutsData = { lg: widgetLayoutData };
    return gridlayoutsData;
  }, [allWidgets]);

  return (
    <div className="flex flex-grow" data-testid="view-page-widget-wrapper">
      <GridLayout data={layoutData} />
    </div>
  );
};
