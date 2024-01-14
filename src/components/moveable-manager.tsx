import * as React from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";

interface Frame {
  translate: [number, number];
}

interface MyMoveableProps {
  container: React.RefObject<HTMLElement>;
  targets: {
    value: HTMLElement[];
    setValue: (value: HTMLElement[]) => void;
  };
}

const MoveableManager: React.FC<MyMoveableProps> = ({ container, targets }) => {
  const [frameMap] = React.useState<Map<HTMLElement | SVGElement, Frame>>(
    () => new Map()
  );
  const moveableRef = React.useRef<Moveable>(null);
  const selectoRef = React.useRef<Selecto>(null);

  return (
    <>
      <Moveable
        container={container?.current}
        /// bounds={container?.current?.getBoundingClientRect()}
        snappable
        keepRatio
        rotationPosition={"top"}
        throttleResize={0}
        throttleDrag={0}
        throttleRotate={0}
        startDragRotate={0}
        throttleDragRotate={0}
        bounds={{ left: 0, top: 0, right: 0, bottom: 0, position: "css" }}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        ref={moveableRef}
        draggable={true}
        target={targets.value}
        onClickGroup={(e) => {
          if (!selectoRef.current) return;
          selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
        }}
        onDragStart={(e) => {
          const target = e.target;
          if (!frameMap.has(target)) {
            frameMap.set(target, {
              translate: [0, 0],
            });
          }
          const frame = frameMap.get(target);
          if (!frame) return;
          e.set(frame.translate);
        }}
        onDrag={(e) => {
          const target = e.target;
          const frame = frameMap.get(target);
          if (!frame) return;
          // @ts-ignore
          frame.translate = e.beforeTranslate;
          target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
        }}
        onDragGroupStart={(e) => {
          e.events.forEach((ev) => {
            const target = ev.target;

            if (!frameMap.has(target)) {
              frameMap.set(target, {
                translate: [0, 0],
              });
            }
            const frame = frameMap.get(target);
            if (!frame) return;
            ev.set(frame.translate);
          });
        }}
        onDragGroup={(e) => {
          e.events.forEach((ev) => {
            const target = ev.target;
            const frame = frameMap.get(target);
            if (!frame) return;
            // @ts-ignore
            frame.translate = ev.beforeTranslate;
            target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
          });
        }}
      ></Moveable>
      <Selecto
        ref={selectoRef}
        dragContainer={container?.current}
        selectableTargets={[".target"]}
        hitRate={0}
        selectByClick={true}
        selectFromInside={false}
        toggleContinueSelect={["shift"]}
        ratio={0}
        onDragStart={(e) => {
          const moveable = moveableRef.current;
          const target = e.inputEvent.target;
          if (
            (moveable && moveable.isMoveableElement(target)) ||
            targets.value.some((t) => t === target || t.contains(target))
          ) {
            e.stop();
          }
        }}
        onSelectEnd={(e) => {
          const moveable = moveableRef.current;
          // @ts-ignore
          targets.setValue(e.selected);

          if (e.isDragStart) {
            e.inputEvent.preventDefault();

            setTimeout(() => {
              moveable && moveable.dragStart(e.inputEvent);
            });
          }
        }}
      ></Selecto>
    </>
  );
};

export default React.memo(MoveableManager);
