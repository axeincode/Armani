import React, { useLayoutEffect, useState } from "react";
import { debounceTime, distinctUntilChanged, shareReplay, map } from "rxjs";
import isEqual from "lodash/isEqual";
import { EditorStateTypes, PageTypes, WidgetTypes } from "@/types/editor.types";
import { editorSubject } from "@/store";
import { filter, includes } from "lodash";

// write a hook that takes in a subject and returns the current state for editor decks
export function useEditorPageWidgetsObserveable(pageId: string) {
  const editorState$ = editorSubject.value;
  const page = editorState$.entities.pages[pageId];
  const pageOnlyWidgets = page.widgets as string[];
  const widgetsInfo = filter(editorState$.entities.widgets, (f: WidgetTypes) =>
    includes(pageOnlyWidgets, f.id as string)
  );

  const [state, setState] = useState<WidgetTypes[]>(widgetsInfo);

  useLayoutEffect(() => {
    const subscription = editorSubject
      .pipe(
        map((state: EditorStateTypes) => {
          const page = state.entities.pages[pageId];
          const pageOnlyWidgets = page.widgets as string[];
          const widgetsInfo = filter(state.entities.widgets, (f: WidgetTypes) =>
            includes(pageOnlyWidgets, f.id as string)
          );
          return widgetsInfo;
        }),
        distinctUntilChanged(isEqual),
        debounceTime(10),
        shareReplay(1)
      )
      .subscribe((widgets: WidgetTypes[]) => {
        setState(widgets);
      });

    return () => subscription.unsubscribe();
  }, [pageId]);

  return state;
}

// write a hook that takes in a subject and returns the current state for editor decks
export function useEditorWidgetObserveable(widgetId: string) {
  const editorState$ = editorSubject.value;
  const widgetInfo = editorState$.entities.widgets[widgetId];
  const [state, setState] = useState<WidgetTypes>(widgetInfo);

  useLayoutEffect(() => {
    const subscription = editorSubject
      .pipe(
        map((state: EditorStateTypes) => state.entities.widgets[widgetId]),
        distinctUntilChanged(isEqual),
        debounceTime(10),
        shareReplay(1)
      )
      .subscribe((currentWidget: WidgetTypes) => {
        console.log("currentPage", currentWidget);
        setState(currentWidget);
      });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}
