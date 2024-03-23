import React, { useLayoutEffect, useState } from "react";
import { debounceTime, distinctUntilChanged, shareReplay, map } from "rxjs";
import isEqual from "lodash/isEqual";
import { EditorStateTypes, PageTypes } from "@/types/editor.types";
import { editorSubject } from "@/store";

// write a hook that takes in a subject and returns the current state for editor decks
export function useEditorPagesObserveable() {
  const editorState$ = editorSubject.value;
  const pageInfo = editorState$.entities.pages;
  const [state, setState] = useState<Record<string, PageTypes>>(pageInfo);

  useLayoutEffect(() => {
    const subscription = editorSubject
      .pipe(
        map((state: EditorStateTypes) => state.entities.pages),
        distinctUntilChanged(isEqual),
        shareReplay(1)
      )
      .subscribe((currentPage: Record<string, PageTypes>) => {
        setState(currentPage);
      });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}

// write a hook that takes in a subject and returns the current state for editor decks
export function useEditorPageObserveable(pageId: string) {
  const editorState$ = editorSubject.value;
  const pageInfo = editorState$.entities.pages[pageId];
  const [state, setState] = useState<PageTypes>(pageInfo);

  useLayoutEffect(() => {
    const subscription = editorSubject
      .pipe(
        map((state: EditorStateTypes) => state.entities.pages[pageId]),
        distinctUntilChanged(isEqual),
        debounceTime(1),
        shareReplay(1)
      )
      .subscribe((currentPage: PageTypes) => {
        setState(currentPage);
      });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, []);

  return state;
}
