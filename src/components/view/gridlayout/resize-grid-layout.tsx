"use client";
import React from "react";
import { flatMap, groupBy, map, merge, orderBy } from "lodash";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import "./styles.css";

import { Responsive, WidthProvider } from "react-grid-layout";
import { GridResponsiveLayoutData } from "@/types/editor.types";
import { RenderWidgetItem } from "./render-widget";
import { GridItemView } from "./grid-item-view";
const availableHandles = ["s", "w", "e", "n"];

// implement grid layout state
export interface GridLayoutState {
  breakpoint: string;
  compactType: any;
  resizeHandles: string[];
  mounted: boolean;
  layouts: any;
  allLayouts?: ReactGridLayout.Layouts;
  cols: { lg: number; md: number; sm: number; xs: number; xxs: number };
}

export interface GridLayoutProps {
  className?: string;
  rowHeight?: number;
  cols?: any;
  initialLayout?: any;
  data: GridResponsiveLayoutData;
  onLayoutChange: (layout: any[]) => void;
  allLayouts?: ReactGridLayout.Layouts;
  width: number;
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);
class GridLayout extends React.Component<GridLayoutProps, GridLayoutState> {
  static defaultProps = {
    className: "layout",
    rowHeight: 200,
    onLayoutChange: function () {},
    cols: { lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 },
    initialLayout: [],
    compactType: "vertical",
    allLayouts: {},
  };

  constructor(props: GridLayoutProps) {
    super(props);
    this.state = {
      breakpoint: "lg",
      compactType: "vertical",
      resizeHandles: availableHandles,
      mounted: false,
      layouts: merge({ lg: props.initialLayout }, props.allLayouts, props.data),
      allLayouts: {},
      cols: { lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 },
    };

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  generateDOM() {
    const { data } = this.props;
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

  equalizeWidgetWidths = (layout: ReactGridLayout.Layout[]) => {
    const sortedLayout = orderBy(layout, ["y", "x"], ["asc", "asc"]);
    const groupedLayout = groupBy(sortedLayout, "y");
    const { breakpoint, cols } = this.state;
    // @ts-ignore
    const numColumns = cols[breakpoint];
    for (const key in groupedLayout) {
      const row = groupedLayout[key];
      const rowWidth = row.reduce((acc, item) => acc + item.w, 0);
      const emptyCells = numColumns - rowWidth;
      const newWidth = Math.floor(emptyCells / row.length);
      row.forEach((item) => {
        item.w = item.w + newWidth;
      });
    }

    console.log("grouped Layout", groupedLayout);
    const newLayout = flatMap(groupedLayout, (item) => item);
    console.log("grouped Layout newLayout", newLayout);

    const getCurrentLayouts = this.state.layouts;
    if (breakpoint === "sm") {
      this.setState({
        layouts: { ...getCurrentLayouts, [breakpoint]: newLayout },
      });
    }
  };

  onBreakpointChange = (breakpoint: string) => {
    const prevState = this.state;
    this.setState({
      ...prevState,
      breakpoint: breakpoint,
      compactType: breakpoint === "lg" ? "vertical" : "horizontal",
    });
  };

  onLayoutChange = (
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts
  ) => {
    // console.log("onLayoutChange", layout);
    // console.log("all-layouts", layouts);
    // this.props?.onLayoutChange(layout);
    const prevState = this.state;
    this.setState({ ...prevState, layouts });
    const newLayout = layout.map((item) => ({
      ...item,
    }));
    this.equalizeWidgetWidths(newLayout);
  };

  render() {
    // console.log("thisprops", this.props);
    //  console.log("thispropsthis state", this.state);
    return (
      <div className="flex flex-grow flex-col">
        <div className="flex flex-grow flex-col flex-1">
          <ResponsiveReactGridLayout
            /// {...this.props}
            breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
            cols={this.state.cols}
            // @ts-ignore
            layouts={this.state.layouts}
            isBounded={true}
            onBreakpointChange={this.onBreakpointChange}
            onLayoutChange={this.onLayoutChange}
            isDraggable={false}
            isResizable={false}
            useCSSTransforms={true}
            compactType={this.state.compactType}
            preventCollision={true}
            transformScale={1}
            margin={[10, 10]}
            // autoSize={true}
            // width={this.props.width}
            /// measureBeforeMount={true}
          >
            {map(this.props.data.lg, (layout: any) => {
              return <GridItemView key={layout.i} data={layout} />;
            })}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}

export default GridLayout;
