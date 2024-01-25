import { BehaviorSubject } from "rxjs";
import { merge, get, findIndex, reduce } from "lodash";
import { produce } from "immer";
import { v4 as uuidV4 } from "uuid";
import { DeckInfoTypes, EditorStateTypes } from "@/types/editor.types";

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

export const editorSubject = new BehaviorSubject<EditorStateTypes>(initial);

export const useEditorObserveable = () => {
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

  const updateDeckInfo = (
    deckId: string,
    attributeName: keyof DeckInfoTypes,
    value: any // string | number
  ) => {
    const prevState = editorSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      if (draft.result.decks.some((deck) => deck === deckId)) {
        draft.entities.decks[deckId][attributeName] = value;
      }
    });
    setNextState(updatedState);
  };

  const setNextState = (payload: EditorStateTypes) => {
    editorSubject.next(payload);
  };

  const getObservable = (): BehaviorSubject<EditorStateTypes> => {
    return editorSubject;
  };

  return {
    setInitialState,
    updatePageNumber,
    getObservable,
    updateDeckInfo,
  };
};
