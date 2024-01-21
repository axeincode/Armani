import { BehaviorSubject } from "rxjs";
import { merge, get, findIndex, reduce } from "lodash";
import { produce } from "immer";
import { v4 as uuidV4 } from "uuid";

export type PageSubjectTypes = {
  id: string;
  pageNumber: number;
  pageName: string;
  order: number;
  title: string;
  subtitle: string;
  widgets: string[];
};

export type WidgetSubjectTypes = {
  id: string;
  name: string;
  elements: string[];
};

export type ElementSubjectTypes = {
  id: string;
  transformation: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  elementName: string;
};

export type EditorSubjectTypes = {
  pages: PageSubjectTypes[];
  widgets: WidgetSubjectTypes[];
  elements: ElementSubjectTypes[];
};

// @ts-ignore
const initial: EditorSubjectTypes = [
  {
    pages: [],
    widgets: [],
    elements: [],
  },
];

const editorSubject = new BehaviorSubject<EditorSubjectTypes>(initial);

export const useEditorObserveable = () => {
  const initialState = (payload: EditorSubjectTypes) => {
    editorSubject.next(payload);
  };

  const updatePageNumber = (pageId: string, pageNumber: number) => {
    const prevState = editorSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      const pageIndex = draft.pages.findIndex((page) => page.id === pageId);
      if (pageIndex > 0) {
        draft.pages[pageIndex].pageNumber = pageNumber;
      }
    });
    setNextState(updatedState);
    ////setNextState({ widget: selectedWidget, error: "" });
  };

  const setNextState = (payload: EditorSubjectTypes) => {
    const state = editorSubject.getValue();
    editorSubject.next({ ...state, ...payload });
  };
};
