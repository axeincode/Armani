"use client";
import { WidgetTypes } from "@/types";
import * as React from "react";
import Moveable, { OnDragStart } from "react-moveable";
import Selecto from "react-selecto";

export type MoveablePlusManagerProps = {
  children: React.ReactNode;
  mainAreaRef: React.RefObject<HTMLDivElement>;
  onSelectMoveableStart: (widgetName: WidgetTypes) => void;
  onUnselectMoveable: () => void;
};

export default function MoveablePlusManager({
  children,
  mainAreaRef,
  onSelectMoveableStart,
  onUnselectMoveable,
}: MoveablePlusManagerProps) {
  const [targets, setTargets] = React.useState<Array<HTMLElement | SVGElement>>(
    []
  );
  const moveableRef = React.useRef<Moveable>(null);
  const selectoRef = React.useRef<Selecto>(null);

  return (
    <div className="moveable app flex flex-grow flex-col">
      {children}
      <Moveable
        ref={moveableRef}
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
        snapDirections={{ top: true, left: true, bottom: true, right: true }}
        snapThreshold={20}
        snapGridWidth={20}
        snapGridHeight={20}
        isDisplayGridGuidelines={true}
        snapGridAll={true}
        verticalGuidelines={[50, 150, 250, 450, 550]}
        horizontalGuidelines={[0, 100, 200, 400, 500]}
        preventClickDefault={true}
        onClickGroup={(e) => {
          selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
        }}
        onDragStart={(e: any) => {
          console.log("onDragStart", e.target);
          console.log("onDragStart", e.target.getAttribute("data-widget"));
          const widgetName = e.target.getAttribute("data-widget");
          if (widgetName === WidgetTypes.CARD) {
            e.stop && e.stop();
            onSelectMoveableStart(WidgetTypes.CARD);
          }
          // if (
          //   ["input", "select"].indexOf(e.target.tagName.toLowerCase()) > -1
          // ) {
          //   e.stopDrag();
          // }
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
          if (
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
