"use client";
import { WidgetEnum } from "@/types";
import * as React from "react";
import Moveable, { OnDragEnd, OnDragStart, OnResizeEnd } from "react-moveable";
import Selecto from "react-selecto";

export type MoveablePlusManagerProps = {
  children: React.ReactNode;
  mainAreaRef: React.RefObject<HTMLDivElement>;
  onSelectMoveableStart: (widgetId: string, widgetName: WidgetEnum) => void;
  onUnselectMoveable: () => void;
  onChangeEnd: (e: OnDragEnd | OnResizeEnd) => void;
  verticalGuidelines: number[];
  horizontalGuidelines: number[];
  isUnSelected: boolean;
  onClickInternalWidget: (e: React.MouseEvent) => void;
};

export default function MoveablePlusManager({
  children,
  mainAreaRef,
  onSelectMoveableStart,
  onUnselectMoveable,
  onChangeEnd,
  verticalGuidelines,
  horizontalGuidelines,
  isUnSelected,
  onClickInternalWidget,
}: MoveablePlusManagerProps) {
  const [targets, setTargets] = React.useState<Array<HTMLElement | SVGElement>>(
    []
  );
  const moveableRef = React.useRef<Moveable>(null);
  const selectoRef = React.useRef<Selecto>(null);

  React.useEffect(() => {
    if (isUnSelected) {
      setTargets([]);
    }
  }, [isUnSelected]);

  return (
    <div className="moveable app flex flex-grow flex-col">
      {children}
      <Moveable
        ref={moveableRef}
        preventDefault={true}
        target={targets}
        draggable={true}
        throttleDrag={1}
        edgeDraggable={false}
        startDragRotate={0}
        throttleDragRotate={0}
        resizable={true}
        keepRatio={false}
        edge={[]}
        bounds={{ left: 0, top: 0, bottom: 0, right: 0, position: "css" }}
        snappable={true}
        snapDirections={{
          top: true,
          left: true,
          bottom: true,
          right: true,
          center: true,
          middle: true,
        }}
        snapThreshold={20}
        snapGridWidth={20}
        snapGridHeight={20}
        snapDigit={20}
        snapGap={false}
        snapDistFormat={(v) => `${Math.round(v / 20) * 20}px`}
        isDisplayGridGuidelines={true}
        /// snapGridAll={true}
        verticalGuidelines={verticalGuidelines}
        horizontalGuidelines={horizontalGuidelines}
        preventClickDefault={true}
        onClickGroup={(e) => {
          selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
        }}
        onDragStart={(e: any) => {
          console.log("onDragStart", e.target);
          console.log("onDragStart", e.target.getAttribute("data-widget"));
          const widgetName = e.target.getAttribute("data-widget");
          const widgetId = e.target.getAttribute("data-widget-id");
          if (widgetName === WidgetEnum.CARD) {
            e.stop && e.stop();
            onSelectMoveableStart(widgetId, WidgetEnum.CARD);
          } else if (widgetName === WidgetEnum.FRAME) {
            e.stop && e.stop();
            onSelectMoveableStart(widgetId, WidgetEnum.FRAME);
          }
          // if (
          //   ["input", "select"].indexOf(e.target.tagName.toLowerCase()) > -1
          // ) {
          //   e.stopDrag();
          // }
        }}
        onDragEnd={(e: OnDragEnd) => {
          console.log("onDragEnd", e.lastEvent);
          onChangeEnd(e);
        }}
        onResizeEnd={(e: OnResizeEnd) => {
          console.log("onResizeEnd", e);
          onChangeEnd(e);
        }}
        onRender={(e) => {
          e.target.style.cssText += e.cssText;
        }}
        onRenderGroup={(e) => {
          e.events.forEach((ev) => {
            ev.target.style.cssText += ev.cssText;
          });
        }}
      />
      <Selecto
        ref={selectoRef}
        dragContainer={".elements"}
        selectableTargets={[".target"]}
        hitRate={0}
        selectByClick={true}
        selectFromInside={false}
        toggleContinueSelect={["shift"]}
        ratio={0}
        keyContainer={mainAreaRef.current!}
        onDragStart={(e: any) => {
          const target = e.inputEvent.target;
          console.log("target", target);
          const getInternalValue = target.getAttribute("data-id");
          console.log("getInternalValue", getInternalValue);
          if (getInternalValue === "INTERNAL_WIDGET") {
            e.stop();
            onClickInternalWidget(e.inputEvent);
          } else if (
            moveableRef.current!.isMoveableElement(target) ||
            targets!.some((t) => t === target || t.contains(target))
          ) {
            e.stop();
          } else {
            onUnselectMoveable();
          }
        }}
        onSelectEnd={(e) => {
          if (e.isDragStartEnd) {
            e.inputEvent.preventDefault();
            moveableRef.current!.waitToChangeTarget().then(() => {
              moveableRef.current!.dragStart(e.inputEvent);
            });
          }
          setTargets(e.selected);
        }}
      />
    </div>
  );
}
