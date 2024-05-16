"use client"
import React, { Component } from "react"
import { find, get, isEmpty, isEqual, map, merge } from "lodash"
import { v4 } from "uuid"
import "../../../../node_modules/react-grid-layout/css/styles.css"
import "./styles.css"

import { Responsive, WidthProvider } from "react-grid-layout"
import {
  GridLayoutData,
  GridResponsiveLayoutData,
  WidgetTypes,
} from "@/types/editor.types"
import { RenderWidgetItem } from "./render-widget"
import { cn } from "@/lib/utils"
import ResizeHandle from "./resize-handle"
import { RoundedRectangleSVG } from "./rounded-rect-svg"
const availableHandles = ["s", "w", "e", "n"]

// const initialLayout = [
//   { i: "0", x: 0, y: 0, w: 3, h: 2, resizeHandles: availableHandles },
//   { i: "1", x: 6, y: 0, w: 3, h: 2, resizeHandles: availableHandles },
//   { i: "2", x: 0, y: 6, w: 3, h: 2, resizeHandles: availableHandles },
//   { i: "3", x: 6, y: 6, w: 3, h: 2, resizeHandles: availableHandles },
// ];
// implement grid layout state
export interface GridLayoutState {
  currentBreakpoint: string
  compactType: any
  resizeHandles: string[]
  mounted: boolean
  layouts: any
  allLayouts?: ReactGridLayout.Layouts
  uniqueId: string
}

export interface GridLayoutProps {
  className?: string
  rowHeight?: number
  onLayoutChange: (layout: any[]) => void
  allLayoutChange: (layouts: ReactGridLayout.Layouts) => void
  allLayouts?: ReactGridLayout.Layouts
  onDragStart?: (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement
  ) => void
  onResizeStart?: (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement
  ) => void
  onHover?: (widgetId: string) => void
  onMouseDown?: (e: any) => void
  cols?: any
  initialLayout?: any
  data: GridResponsiveLayoutData
  containerHeight?: number
}

const ResponsiveReactGridLayout = WidthProvider(Responsive)
class GridLayout extends React.Component<GridLayoutProps, GridLayoutState> {
  static defaultProps = {
    className: "layout",
    rowHeight: 200,
    onLayoutChange: function () {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout: [],
    compactType: "vertical",
    allLayouts: {},
  }

  constructor(props: GridLayoutProps) {
    super(props)
    this.state = {
      currentBreakpoint: "lg",
      compactType: "vertical",
      resizeHandles: availableHandles,
      mounted: false,
      layouts: merge({ lg: props.initialLayout }, props.allLayouts, props.data),
      allLayouts: {},
      uniqueId: v4(),
    }

    this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
  }

  // componentDidMount() {
  //   const layouts = merge(
  //     { lg: this.props.initialLayout },
  //     this.props.allLayouts,
  //     this.props.data
  //   );
  //   this.setState({ mounted: true, layouts });
  // }

  // // implement derived state from props;
  // static getDrivedStateFromProps(
  //   nextProps: GridLayoutProps,
  //   prevState: GridLayoutProps
  // ) {
  //   const { allLayouts: prevAllLayouts } = prevState;
  //   const { allLayouts: nextAllLayouts } = nextProps;
  //   if (!isEqual(nextAllLayouts, prevAllLayouts)) {
  //     const layouts = merge(
  //       { lg: nextProps.initialLayout },
  //       nextProps.allLayouts,
  //       nextProps.data
  //     );
  //     return { layouts };
  //   } else {
  //     return null;
  //   }
  // }

  generateDOM() {
    const { data } = this.props
    // hover is added to the grid layout
    const onHover = (e: any) => {
      if (e && e.target) {
        const widgetId = e.target?.getAttribute("data-widgetid")
        if (this.props.onHover) this.props.onHover(widgetId)
      }
    }

    const onMouseDown = (e: any) => {
      if (e && e.target) {
        if (this.props.onMouseDown) this.props.onMouseDown(e)
      }
    }

    return map(data.lg, function (layout, i) {
      return (
        <div
          key={layout.i}
          className={"flex flex-col p-2 pt-0 bg-transparent react-gap"}
          onMouseEnter={onHover}
          onMouseDown={onMouseDown}
          data-widget={"GRID_ITEM"}
          data-widgetid={layout.i}
        >
          <RoundedRectangleSVG />
          <RenderWidgetItem id={layout.i} />
        </div>
      )
    })
  }

  onBreakpointChange = (breakpoint: string) => {
    this.setState({
      currentBreakpoint: breakpoint,
    })
  }

  onLayoutChange = (
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts
  ) => {
    const { currentBreakpoint } = this.state
    this.props?.onLayoutChange(layout)
    ////this.props?.allLayoutChange(layouts);
  }

  handleOnDragStart = (
    layout: any,
    oldItem: any,
    newItem: any,
    placeholder: any,
    e: MouseEvent,
    element: HTMLElement
  ) => {
    if (this.props.onDragStart)
      this.props?.onDragStart(layout, oldItem, newItem, placeholder, e, element)
  }

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
      )
  }

  render() {
    return (
      <div className='flex flex-grow flex-col resizegridlayout'>
        <div className='h-[1080px]' key={this.state.uniqueId}>
          <ResponsiveReactGridLayout
            key={this.state.uniqueId}
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
            allowOverlap={false}
            compactType={this.state.compactType}
            preventCollision={true}
            onDragStart={this.handleOnDragStart}
            onResizeStart={this.handleOnResizeStart}
            transformScale={1}
            margin={[0, 0]}
            autoSize={true}
            draggableHandle='.x-drag-handle'
            // resizeHandle={(
            //   resizeHandleAxis: ResizeHandleAxis,
            //   ref: ReactRef<HTMLElement>
            // ) => <ResizeHandle handleAxis={resizeHandleAxis} ref={ref} />}
          >
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    )
  }
}

export default GridLayout
