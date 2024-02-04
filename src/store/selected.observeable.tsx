import { WidgetEnum } from "@/types";
import { BehaviorSubject } from "rxjs";

export interface ISelectedWidgetState {
  pageId: string;
  widgetId: string;
  widgetType: WidgetEnum;
}

const initialState = {
  widgetId: "",
  pageId: "",
  widgetType: WidgetEnum.NONE,
};

const selectedSubject = new BehaviorSubject<ISelectedWidgetState>(initialState);

export const useSelectedWidgetRepo = () => {
  const setSelectedWidget = (
    widgetId: string,
    pageId: string,
    widgetType: WidgetEnum
  ) => {
    const state = selectedSubject.getValue();
    selectedSubject.next({ ...state, widgetId, pageId, widgetType });
  };

  const updateSelectedWidgetType = (widgetType: WidgetEnum) => {
    const state = selectedSubject.getValue();
    selectedSubject.next({ ...state, widgetType });
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
