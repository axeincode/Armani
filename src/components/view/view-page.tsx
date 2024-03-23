import React from "react";
import { useEditorPageWidgetsObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { map } from "lodash";
import { PageTypes, WidgetTypes } from "@/types/editor.types";
import GridLayout from "./gridlayout/resize-grid-layout";
import { useEditorObserveable } from "@/store";
import { useEditorPageObserveable } from "@/hooks/useEditorPagesObserveable";
import { Spinner } from "@material-tailwind/react";

type ViewPageProps = {
  pageId: string;
};

export const ViewPage = ({ pageId }: ViewPageProps) => {
  const allWidgets = useEditorPageWidgetsObserveable(pageId);
  const editorObs$ = useEditorObserveable();
  const pageData = useEditorPageObserveable(pageId) as PageTypes;
  const [isMounted, setIsMounted] = React.useState(false);

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

  const handleOnLayoutChange = (layouts: ReactGridLayout.Layout[]) => {
    if (layouts) {
      const correctedLayouts = map(layouts, (layout) => {
        const { i, x, y, w, h } = layout;
        return {
          ...layout,
          h: isNaN(h) ? 2 : h,
          y: isNaN(y) ? Infinity : y,
        };
      });

      editorObs$.updateLayoutTransformations(correctedLayouts);
    }
  };

  React.useEffect(() => {
    setIsMounted(false);
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, [pageId]);

  return (
    <div className="flex flex-grow" data-testid="view-page-widget-wrapper">
      <div className="flex justify-center">{!isMounted && <Spinner />}</div>
      {isMounted && (
        <GridLayout
          data={layoutData}
          onLayoutChange={handleOnLayoutChange}
          allLayouts={pageData?.layouts}
        />
      )}
    </div>
  );
};
