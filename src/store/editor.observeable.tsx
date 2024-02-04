import { BehaviorSubject } from "rxjs";
import { merge, get, findIndex, reduce, filter } from "lodash";
import { produce } from "immer";
import { v4 as uuidV4 } from "uuid";
import {
  DeckInfoTypes,
  EditorStateTypes,
  PageTypes,
  WidgetTypes,
} from "@/types/editor.types";

// @ts-ignore
const initial = {
  entities: {
    decks: {},
    pages: {},
    widgets: {},
  },
  result: {
    decks: [],
    pages: [],
    widgets: [],
  },
};

export const editorSubject = new BehaviorSubject<EditorStateTypes>(initial);

export const useEditorObserveable = () => {
  const setInitialState = (payload: EditorStateTypes) => {
    editorSubject.next(payload);
  };

  const addWidget = (pageId: string, widgetdata: WidgetTypes) => {
    const { id: widgetId } = widgetdata;
    const prevState = editorSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      if (draft.entities.pages[pageId]) {
        if (!draft.entities.pages[pageId].widgets) {
          draft.entities.pages[pageId].widgets = [];
        }
        // @ts-ignore
        draft.entities.pages[pageId].widgets.push(widgetId);
      }
      // add widget to entities
      if (!draft.entities.widgets) {
        draft.entities.widgets = {};
      }
      draft.entities.widgets[widgetId] = widgetdata;
      // add widget to result
      if (!draft.result.widgets.some((widget) => widget === widgetId)) {
        draft.result.widgets.push(widgetId);
      }
    });
    setNextState(updatedState);
  };

  const updateWidget = (widgetId: string, widgetdata: WidgetTypes) => {
    const prevState = editorSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      if (draft.entities.widgets && draft.entities.widgets[widgetId]) {
        // add widget to entities
        draft.entities.widgets[widgetId] = widgetdata;
      }
    });
    setNextState(updatedState);
  };

  //delete widget  by using Id
  const deleteWidget = (pageId: string, widgetId: string) => {
    const prevState = editorSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      if (draft.entities.pages[pageId]) {
        // @ts-ignore
        const index = draft.entities.pages[pageId].widgets.findIndex(
          (widget) => widget === widgetId
        );
        if (index > -1) {
          // @ts-ignore
          draft.entities.pages[pageId].widgets.splice(index, 1);
        }
      }
      // delete widget from entities
      if (draft.entities.widgets && draft.entities.widgets[widgetId]) {
        delete draft.entities.widgets[widgetId];
      }
      // delete widget from result
      if (draft.result.widgets.some((widget) => widget === widgetId)) {
        draft.result.widgets = draft.result.widgets.filter(
          (widget) => widget !== widgetId
        );
      }
    });
    setNextState(updatedState);
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
    addWidget,
    updateWidget,
    getObservable,
    updateDeckInfo,
    deleteWidget,
  };
};
