import React, { useLayoutEffect, useState } from "react";
import { debounceTime, distinctUntilChanged, shareReplay, map } from "rxjs";
import isEqual from "lodash/isEqual";
import { EditorStateTypes, PageTypes, WidgetTypes } from "@/types/editor.types";
import { editorSubject } from "@/store";
import { filter, includes } from "lodash";

// write a hook that takes in a subject and returns the current state for editor decks
export function useEditorPageWidgetsObserveable(
  pageId: string,
  tabId?: string
) {
  const editorState$ = editorSubject.value;
  const page = editorState$.entities.pages[pageId];
  const pageOnlyWidgets = page && (page.widgets as string[]);
  const widgetsInfo = filter(editorState$.entities.widgets, (f: WidgetTypes) =>
    includes(pageOnlyWidgets, f.id as string)
  );

  const [state, setState] = useState<WidgetTypes[]>(widgetsInfo);

  useLayoutEffect(() => {
    if (!pageId) return;
    const subscription = editorSubject
      .pipe(
        map((state: EditorStateTypes) => {
          const page = state.entities.pages[pageId];
          const pageOnlyWidgets = page.widgets as string[];
          const widgetsInfo = filter(state.entities.widgets, (f: WidgetTypes) =>
            includes(pageOnlyWidgets, f.id as string)
          );
          const tabs = page.tabs;
          if (tabs && tabId) {
            const tab = filter(tabs, (f) => f.id === tabId);
            const tabWidgets = tab && (tab[0]?.widgets as string[]);
            return filter(widgetsInfo, (f: WidgetTypes) =>
              includes(tabWidgets, f.id as string)
            );
          }
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
  }, [pageId, tabId]);

  return state;
}

// write a hook that takes in a subject and returns the current state for editor decks
export function useEditorWidgetObserveable(widgetId: string) {
  const editorState$ = editorSubject.value;
  const widgetInfo =
    editorState$.entities.widgets && editorState$.entities.widgets[widgetId];
  const [state, setState] = useState<WidgetTypes>(widgetInfo);

  useLayoutEffect(() => {
    if (!widgetId) return;
    const subscription = editorSubject
      .pipe(
        map((state: EditorStateTypes) => state.entities.widgets[widgetId]),
        distinctUntilChanged(isEqual),
        shareReplay(1)
      )
      .subscribe((currentWidget: WidgetTypes) => {
        console.log("currentPage", currentWidget);
        setState(currentWidget);
      });

    return () => subscription.unsubscribe();
  }, [widgetId]);

  return state;
}
