import React, { useLayoutEffect, useState } from "react";
import { debounceTime, distinctUntilChanged, shareReplay } from "rxjs";
import isEqual from "lodash/isEqual";
import { map } from "rxjs/operators";
import {
  DeckInfoTypes,
  EditorStateTypes,
  PageTypes,
} from "@/types/editor.types";
import { first, values } from "lodash";
import { editorSubject } from "./editor.observeable";
import { IPageState } from ".";

export function useObservable(stateSubject: any) {
  
  const [state, setState] = useState(stateSubject.getValue());

  useLayoutEffect(() => {
    const subscription = stateSubject
      .pipe(
        // map((s) => hash(s)),
        distinctUntilChanged(),
        debounceTime(10),
        shareReplay(1)
      )
      .subscribe((currentState: any) => {
        setState(currentState);
      });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

// write a hook that takes in a subject and returns the current state for editor decks
export function useEditorDecksObserveable() {
  const editorState$ = editorSubject.value;
  const [state, setState] = useState<DeckInfoTypes>(
    values(editorState$.entities.decks)[0]
  );

  useLayoutEffect(() => {
    const subscription = editorSubject
      .pipe(
        map((state: EditorStateTypes) => state.entities.decks),
        distinctUntilChanged(isEqual),
        debounceTime(10),
        shareReplay(1)
      )
      .subscribe((currentDecks: Record<string, DeckInfoTypes>) => {
        setState(values(currentDecks)[0] || {});
      });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

// write a hooks that takes in a subject and returns the current state for editor widgets
export function useEditorWidgetsObserveable() {
  const [state, setState] = useState(editorSubject.getValue().entities.widgets);

  useLayoutEffect(() => {
    const subscription = editorSubject
      .pipe(
        map((state: EditorStateTypes) => state.entities.widgets),
        distinctUntilChanged(isEqual),
        debounceTime(10),
        shareReplay(1)
      )
      .subscribe((currentWidgets: any) => {
        setState(currentWidgets);
      });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}
