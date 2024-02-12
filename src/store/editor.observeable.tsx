import { BehaviorSubject } from "rxjs";
import { merge, get, findIndex, reduce, filter } from "lodash";
import { produce } from "immer";
import { v4 as uuidV4 } from "uuid";
import {
  DeckInfoTypes,
  DocumentTypes,
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

  const updatePageIcon = (pageId: string, icon: string) => {
    const prevState = editorSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      if (draft.result.pages.some((page) => page === pageId)) {
        draft.entities.pages[pageId].iconName = icon;
      }
    });
    setNextState(updatedState);
  };

  // update page Name
  const updatePageName = (pageId: string, name: string) => {
    const prevState = editorSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      if (draft.result.pages.some((page) => page === pageId)) {
        draft.entities.pages[pageId].name = name;
      }
    });
    setNextState(updatedState);
  };

  const addNewPage = (deckId: string, pageData: PageTypes) => {
    const { id: pageId } = pageData;
    const prevState = editorSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      if (draft.entities.decks[deckId]) {
        if (!draft.entities.decks[deckId].pages) {
          draft.entities.decks[deckId].pages = [];
        }
        // @ts-ignore
        draft.entities.decks[deckId].pages.push(pageId);
      }
      // add page to entities
      if (!draft.entities.pages) {
        draft.entities.pages = {};
      }
      draft.entities.pages[pageId] = pageData;
      // add page to result
      if (!draft.result.pages.some((page) => page === pageId)) {
        draft.result.pages.push(pageId);
      }
    });
    setNextState(updatedState);
  };

  // delete page
  const deletePage = (deckId: string, pageId: string) => {
    const prevState = editorSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      if (draft.entities.decks[deckId]) {
        // @ts-ignore
        const index = draft.entities.decks[deckId].pages.findIndex(
          (page) => page === pageId
        );
        if (index > -1) {
          // @ts-ignore
          draft.entities.decks[deckId].pages.splice(index, 1);
        }
      }
      // delete page from entities
      if (draft.entities.pages && draft.entities.pages[pageId]) {
        delete draft.entities.pages[pageId];
      }
      // delete page from result
      if (draft.result.pages.some((page) => page === pageId)) {
        draft.result.pages = draft.result.pages.filter(
          (page) => page !== pageId
        );
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

  // update document by using Id
  const updateDocument = (deckId: string, document: DocumentTypes) => {
    const prevState = editorSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      if (draft.result.decks.some((deck) => deck === deckId)) {
        if (!draft.entities.decks[deckId].documents) {
          draft.entities.decks[deckId].documents = [];
        }
        if (draft.entities.decks[deckId]) {
          if (draft.entities.decks[deckId].documents) {
            draft.entities.decks[deckId].documents?.push(document);
          }
        }
      }
    });
    setNextState(updatedState);
  };

  // delete document by using Id
  const deleteDocument = (deckId: string, documentId: string) => {
    const prevState = editorSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      if (draft.result.decks.some((deck) => deck === deckId)) {
        if (draft.entities.decks[deckId].documents) {
          const index = findIndex(
            draft.entities.decks[deckId].documents,
            (doc) => doc.id === documentId
          );
          if (index > -1) {
            draft.entities.decks[deckId].documents?.splice(index, 1);
          }
        }
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
    updatePageName,
    updatePageIcon,
    addNewPage,
    deletePage,
    updateDocument,
    deleteDocument,
  };
};
