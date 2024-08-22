import React, { useState, useEffect } from "react";
import {
  usePageObserveable,
  useEditorDecksObserveable,
  useEditorObserveable,
  useObservable,
} from "@/store";
import { EditorStateTypes, User } from "@/types/editor.types";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { useEditorPagesObserveable } from "@/hooks/useEditorPagesObserveable";

export const useViewPage = () => {
  const page$ = usePageObserveable();
  const currentPage$ = useCurrentPageObserveable();
  const deckInfo = useEditorDecksObserveable();
  const pages$ = useEditorPagesObserveable();
  const editorDeck$ = useEditorObserveable();
  const editorState = useObservable(editorDeck$.getObservable());

  const setPage = (page: number) => {
    const getPage = Object.keys(pages$).filter((key) => {
      return pages$[key].pageNumber === page;
    })[0];
    if (!getPage) return;
    page$.setPageInfo({
      currentPage: page,
      totalPages: Object.keys(pages$).length,
      pageName: pages$[getPage].name,
      pageId: getPage,
    });
  };

  return {
    page$,
    currentPage$,
    deckInfo,
    pages$,
    editorDeck$,
    editorState,
    setPage,
  };
};
