"use client";
import React, { Component } from "react";
import { find, get, isEmpty, map } from "lodash";

import "../../../../node_modules/react-grid-layout/css/styles.css";
import "./styles.css";

import { Responsive, WidthProvider } from "react-grid-layout";
import {
  GridLayoutData,
  GridResponsiveLayoutData,
  WidgetTypes,
} from "@/types/editor.types";
import { RenderWidgetItem } from "./render-widget";
import { cn } from "@/lib/utils";
const availableHandles = ["s", "w", "e", "n"];

// const initialLayout = [
//   { i: "0", x: 0, y: 0, w: 3, h: 2, resizeHandles: availableHandles },
//   { i: "1", x: 6, y: 0, w: 3, h: 2, resizeHandles: availableHandles },
//   { i: "2", x: 0, y: 6, w: 3, h: 2, resizeHandles: availableHandles },
//   { i: "3", x: 6, y: 6, w: 3, h: 2, resizeHandles: availableHandles },
// ];
// implement grid layout state
export interface GridLayoutState {
  currentBreakpoint: string;
  compactType: any;
  resizeHandles: string[];
  mounted: boolean;
  layouts: any;
}

export interface GridLayoutProps {
  className?: string;
  rowHeight?: number;
  onLayoutChange: (layout: any[]) => void;
  onDragStart?: (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement
  ) => void;
  onResizeStart?: (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement
  ) => void;
  onHover?: (widgetId: string) => void;
  onMouseDown?: (e: any) => void;
  cols?: any;
  initialLayout?: any;
  data: GridResponsiveLayoutData;
  containerHeight?: number;
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);
class GridLayout extends React.Component<GridLayoutProps, GridLayoutState> {
  static defaultProps = {
    className: "layout",
    rowHeight: 200,
    onLayoutChange: function () {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout: [],
    compactType: "vertical",
  };

  constructor(props: GridLayoutProps) {
    super(props);
    this.state = {
      currentBreakpoint: "lg",
      compactType: "vertical",
      resizeHandles: availableHandles,
      mounted: false,
      layouts: { lg: props.initialLayout },
    };

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  generateDOM() {
    const { data } = this.props;
    console.log("generated DOM data", data);
    // hover is added to the grid layout
    const onHover = (e: any) => {
      if (e && e.target) {
        const widgetId = e.target?.getAttribute("data-widgetid");
        console.log("hovertarget", e.target);
        if (this.props.onHover) this.props.onHover(widgetId);
      }
    };

    const onMouseDown = (e: any) => {
      if (e && e.target) {
        if (this.props.onMouseDown) this.props.onMouseDown(e);
      }
    };

    return map(data.lg, function (layout, i) {
      return (
        <div
          key={layout.i}
          className={"flex p-1 bg-blue-gray-700"}
          onMouseEnter={onHover}
          onMouseDown={onMouseDown}
          data-widget={"GRID_ITEM"}
          data-widgetid={layout.i}
        >
          <RenderWidgetItem id={layout.i} />
        </div>
      );
    });
  }

  onBreakpointChange = (breakpoint: string) => {
    console.log("onBreakpointChange", breakpoint);
    this.setState({
      currentBreakpoint: breakpoint,
    });
  };

  onLayoutChange = (
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts
  ) => {
    console.log("onLayoutChange", layout);
    console.log("all-layouts", layouts);
    this.props?.onLayoutChange(layout);
  };

  handleOnDragStart = (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement
  ) => {
    if (this.props.onDragStart)
      this.props?.onDragStart(
        layout,
        oldItem,
        newItem,
        placeholder,
        e,
        element
      );
  };

  handleOnResizeStart = (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement
  ) => {
    if (this.props.onResizeStart)
      this.props?.onResizeStart(
        layout,
        oldItem,
        newItem,
        placeholder,
        e,
        element
      );
  };

  render() {
    return (
      <div className="flex flex-grow flex-col resizegridlayout">
        <div className="h-[1080px]">
          <ResponsiveReactGridLayout
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            width={1920}
            // @ts-ignore
            layouts={this.props.data}
            isBounded={true}
            onBreakpointChange={this.onBreakpointChange}
            onLayoutChange={this.onLayoutChange}
            isDraggable
            isResizable
            // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
            // and set `measureBeforeMount={true}`.
            measureBeforeMount={false}
            useCSSTransforms={true}
            allowOverlap={true}
            compactType={this.state.compactType}
            preventCollision={false}
            onDragStart={this.handleOnDragStart}
            onResizeStart={this.handleOnResizeStart}
            transformScale={1}
            margin={[2, 2]}
            autoSize={true}
            draggableHandle=".x-drag-handle"
          >
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}

export default GridLayout;
