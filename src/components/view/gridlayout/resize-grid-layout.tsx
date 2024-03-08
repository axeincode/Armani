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
  cols?: any;
  initialLayout?: any;
  data: GridResponsiveLayoutData;
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
    return map(data.lg, function (layout, i) {
      return (
        <div
          key={layout.i}
          className={"flex flex-grow"}
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
  };

  render() {
    return (
      <div className="flex flex-grow flex-col">
        <div className="flex flex-grow flex-col flex-1">
          <ResponsiveReactGridLayout
            {...this.props}
            // @ts-ignore
            layouts={this.props.data}
            isBounded={true}
            onBreakpointChange={this.onBreakpointChange}
            onLayoutChange={this.onLayoutChange}
            isDraggable={false}
            isResizable={false}
            useCSSTransforms={true}
            allowOverlap={true}
            compactType={this.state.compactType}
            preventCollision={false}
            transformScale={1}
            margin={[0, 0]}
            autoSize={true}
          >
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}

export default GridLayout;
