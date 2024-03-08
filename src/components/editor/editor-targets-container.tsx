import React from "react";
import { useEditorPageWidgetsObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { map } from "lodash";
import { WidgetTypes, availableHandles } from "@/types/editor.types";
import GridLayout from "./gridlayout/resize-grid-layout";
import {
  useHoveredWidgetRepo,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { useMeasure } from "react-use";

type EditorTargetsProps = {
  pageId: string;
  onLayoutChange: (layout: any) => void;
};

export const EditorTargetsContainer = ({
  pageId,
  onLayoutChange,
}: EditorTargetsProps) => {
  const allWidgets = useEditorPageWidgetsObserveable(pageId);
  const selectedWidgetObs$ = useSelectedWidgetRepo();

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
    console.log("Dragging item ID:", itemId);
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

  return (
    <div
      className="flex flex-grow"
      // @ts-ignore
      ref={ref}
      data-testid="editor-targets-container"
      onClick={onEditorLayoutClick}
    >
      <GridLayout
        data={layoutData}
        onLayoutChange={onLayoutChange}
        onDragStart={onDragStart}
        onResizeStart={onResizeStart}
        onHover={onHover}
        onMouseDown={onMouseDown}
        containerHeight={Math.floor(Math.ceil(height / 100) * 100)}
      />
    </div>
  );
};
