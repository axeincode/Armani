import { SelectedState, WidgetTypes } from "@/types";
import { BehaviorSubject } from "rxjs";

const initialState = {
  widget: null,
};

const selectedSubject = new BehaviorSubject<SelectedState>(initialState);

export const useSelectedObserveable = () => {
  const update = (selectedWidget: WidgetTypes | null) => {
    setNextState({ widget: selectedWidget, error: "" });
  };

  const setSelectedWidget = (selectedWidget: WidgetTypes | null) => {
    selectedSubject.next({ widget: selectedWidget });
  };

  const unSelect = () => {
    selectedSubject.next(initialState);
  };

  const error = (message: string) => {
    const state = selectedSubject.getValue();
    setNextState({ widget: state.widget, error: message });
  };

  const setNextState = (payload: SelectedState) => {
    const state = selectedSubject.getValue();
    selectedSubject.next({ ...state, ...payload });
  };

  const getObservable = () => {
    return selectedSubject;
  };

  return {
    update,
    setSelectedWidget,
    unSelect,
    error,
    getObservable,
  };
};
