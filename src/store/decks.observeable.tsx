import { BehaviorSubject } from "rxjs";
import { merge, get, findIndex, reduce } from "lodash";
import { produce } from "immer";
import { v4 as uuidV4 } from "uuid";
import { EditorStateTypes } from "@/types/editor.types";

// @ts-ignore
const initial = {
  entities: {
    decks: {},
    pages: {},
    widgets: {},
    elements: {},
  },
  result: {
    decks: [],
    pages: [],
    widgets: [],
    elements: [],
  },
};

const editorSubject = new BehaviorSubject<EditorStateTypes>(initial);

export const useDecksObserveable = () => {
  const setInitialState = (payload: EditorStateTypes) => {
    editorSubject.next(payload);
  };

  const updatePageNumber = (pageId: string, pageNumber: number) => {
    const prevState = editorSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      if (draft.result.pages.some((page) => page === pageId)) {
        draft.entities.pages[pageId].pageNumber = pageNumber;
      }
    });
    setNextState(updatedState);
  };

  const setNextState = (payload: EditorStateTypes) => {
    editorSubject.next(payload);
  };

  const getObservable = () => {
    return editorSubject;
  };

  return {
    setInitialState,
    updatePageNumber,
    getObservable,
  };
};
