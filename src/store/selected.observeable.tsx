import { SelectedState, WidgetTypes } from "@/types";
import { BehaviorSubject } from "rxjs";

const initialState = {
  widget: null,
  id: "",
};

const selectedSubject = new BehaviorSubject<SelectedState>(initialState);

export const useSelectedObserveable = () => {
  const update = (selectedWidget: WidgetTypes | null, id: string) => {
    setNextState({ widget: selectedWidget, error: "", id });
  };

  const setSelectedWidget = (
    selectedWidget: WidgetTypes | null,
    id: string
  ) => {
    selectedSubject.next({ widget: selectedWidget, id });
  };

  const unSelect = () => {
    selectedSubject.next(initialState);
  };

  const error = (message: string) => {
    const state = selectedSubject.getValue();
    setNextState({ widget: state.widget, error: message, id: state.id });
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
