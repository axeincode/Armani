import { WidgetElement, WidgetEnum } from "@/types";
import { BehaviorSubject } from "rxjs";

export interface ISelectedWidgetState {
  pageId: string;
  widgetId: string;
  widgetElement: WidgetElement | null;
}

const initialState = {
  widgetId: "",
  pageId: "",
  widgetElement: null,
};

const selectedSubject = new BehaviorSubject<ISelectedWidgetState>(initialState);

export const useSelectedWidgetRepo = () => {
  const setSelectedWidget = (
    widgetId: string,
    pageId: string,
    widgetElement: WidgetElement | null
  ) => {
    const state = selectedSubject.getValue();
    selectedSubject.next({
      ...state,
      widgetId,
      pageId,
      ...(widgetElement && { widgetElement }),
    });
  };

  const updateSelectedWidgetType = (widgetElement: WidgetElement) => {
    const state = selectedSubject.getValue();
    selectedSubject.next({ ...state, widgetElement });
  };

  const unSelect = () => {
    selectedSubject.next(initialState);
  };

  const getObservable = () => {
    return selectedSubject;
  };

  return {
    setSelectedWidget,
    unSelect,
    getObservable,
    updateSelectedWidgetType,
  };
};
