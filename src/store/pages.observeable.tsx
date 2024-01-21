import { BehaviorSubject } from "rxjs";
import { merge, get, findIndex, reduce } from "lodash";
import { produce } from "immer";
import { v4 as uuidV4 } from "uuid";
import { WidgetTypes } from "@/types";

const widgetinitialState = {
  editorPage: {
    pageId: {
      widgets: {
        widgetId: {
          elements: {
            elementId: {
              transformation: {
                x: 0,
                y: 0,
                width: 100,
                height: 100,
              },
              elementName: "Element Name",
            },
          },
        },
      },
    },
  },
};

export interface PageTypes {
  pageId: string;
  pageNumber: number;
  pageName: string;
  order: number;
  title: string;
  subtitle: string;
  widgets: WidgetTypes[];
}

const initialState = [
  {
    pageId: uuidV4(),
    pageNumber: 1,
    pageName: "Page 1",
    order: 1,
    title: "The artium",
    subtitle: "Boston MA",
    widgets: [],
  },
];

const pageSubject = new BehaviorSubject<PageTypes[]>(initialState);

export const usePagesObserveable = () => {
  const initialState = (payload: PageTypes[]) => {
    pageSubject.next(payload);
  };

  const updatePageNumber = (pageId: string, pageNumber: number) => {
    const prevState = pageSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      const pageIndex = findIndex(draft, { pageId });
      if (pageIndex > 0) {
        draft[pageIndex].pageNumber = pageNumber;
      }
    });
    setNextState(updatedState);
    ////setNextState({ widget: selectedWidget, error: "" });
  };

  const setNextState = (payload: PageTypes[]) => {
    const state = pageSubject.getValue();
    pageSubject.next({ ...state, ...payload });
  };

  const getObservable = () => {
    return pageSubject;
  };

  return {
    updatePageNumber,
    getObservable,
  };
};
