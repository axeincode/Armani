import { WidgetElement, WidgetEnum } from "@/types";
import { BehaviorSubject } from "rxjs";

export interface IHoverWidgetState {
  pageId: string;
  widgetId: string;
  widgetElement: WidgetElement | null;
}

const initialState = {
  widgetId: "",
  pageId: "",
  widgetElement: null,
};

export const hoveredSubject = new BehaviorSubject<IHoverWidgetState>(
  initialState
);

export const useHoveredWidgetRepo = () => {
  const set = (
    widgetId: string,
    pageId: string,
    widgetElement: WidgetElement | null
  ) => {
    const state = hoveredSubject.getValue();
    hoveredSubject.next({
      ...state,
      widgetId,
      pageId,
      ...(widgetElement && { widgetElement }),
    });
  };

  const updateWidgetType = (widgetElement: WidgetElement) => {
    const state = hoveredSubject.getValue();
    hoveredSubject.next({ ...state, widgetElement });
  };

  const unSelect = () => {
    hoveredSubject.next(initialState);
  };

  const getObservable = () => {
    return hoveredSubject;
  };

  return {
    set,
    unSelect,
    getObservable,
    updateWidgetType,
  };
};
