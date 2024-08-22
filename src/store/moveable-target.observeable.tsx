import { BehaviorSubject } from "rxjs";

export interface IMoveableTargetState {
  target: HTMLElement | SVGElement | null;
  widgetId?: string;
}

const initialState = {
  target: null,
  widgetId: "",
};

const moveableTargetSubject = new BehaviorSubject<IMoveableTargetState>(
  initialState
);

export const useMoveableTargetRepo = () => {
  const update = (
    target: HTMLElement | SVGElement | null,
    widgetId: string
  ) => {
    moveableTargetSubject.next({ target, widgetId });
  };

  const reset = () => {
    moveableTargetSubject.next(initialState);
  };

  const getObservable = () => {
    return moveableTargetSubject;
  };

  return {
    update,
    reset,
    getObservable,
  };
};
