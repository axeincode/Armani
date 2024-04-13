import React from "react";
import { useEditorPageWidgetsObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { map } from "lodash";
import { PageTypes, WidgetTypes, availableHandles } from "@/types/editor.types";
import GridLayout from "./gridlayout/resize-grid-layout";
import {
  useHoveredWidgetRepo,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { useMeasure } from "react-use";
import { useEditorPageObserveable } from "@/hooks/useEditorPagesObserveable";
import { Spinner } from "@material-tailwind/react";

type EditorTargetsProps = {
  pageId: string;
  onLayoutChange: (layout: any) => void;
  allLayoutChange: (layouts: ReactGridLayout.Layouts) => void;
  tabId?: string;
};

export const EditorTargetsContainer = ({
  pageId,
  onLayoutChange,
  allLayoutChange,
  tabId = "",
}: EditorTargetsProps) => {
  const allWidgets = useEditorPageWidgetsObserveable(pageId, tabId);
  const pageData = useEditorPageObserveable(pageId) as PageTypes;
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const [isMounted, setIsMounted] = React.useState(false);

  const [ref, { width, height }] = useMeasure();
  const layoutData = React.useMemo(() => {
    const widgetLayoutData = map(allWidgets, (widget: WidgetTypes) => {
      return {
        i: widget.id,
        x: widget.transformation.x,
        y: widget.transformation.y,
        w: widget.transformation.w,
        h: widget.transformation.h,
        resizeHandles: availableHandles,
      };
    });
    const gridlayoutsData = { lg: widgetLayoutData };
    return gridlayoutsData;
  }, [allWidgets]);

  const onDragStart = (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement
  ) => {
    const { i: itemId } = layout;
    console.log("onDragStart", {
      layout,
      oldItem,
      newItem,
      placeholder,
      e,
      element,
    });
  };

  const onResizeStart = (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement
  ) => {
    console.log("onResizeStart", e.target);
  };

  const onHover = (widgetId: string) => {
    console.log("onHover", widgetId);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("mouse down");
  };

  const onEditorLayoutClick = (e: React.MouseEvent) => {
    selectedWidgetObs$.unSelect();
  };

  // pageid use effect
  React.useEffect(() => {
    setIsMounted(false);
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, [pageId]);

  return (
    <div
      className="flex flex-grow"
      // @ts-ignore
      ref={ref}
      data-testid="editor-targets-container"
      onClick={onEditorLayoutClick}
    >
      {!isMounted && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {isMounted && (
        <GridLayout
          data={layoutData}
          onLayoutChange={onLayoutChange}
          allLayoutChange={allLayoutChange}
          onDragStart={onDragStart}
          onResizeStart={onResizeStart}
          onHover={onHover}
          onMouseDown={onMouseDown}
          containerHeight={Math.floor(Math.ceil(height / 100) * 100)}
          allLayouts={pageData?.layouts}
        />
      )}
    </div>
  );
};
