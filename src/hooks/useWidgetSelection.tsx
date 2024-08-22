import {
  useEditorObserveable,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import React from "react";
import { useCurrentPageObserveable } from "./useCurrentPageObserveable";

export const useWidgetSelection = () => {
  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const currentPage$ = useCurrentPageObserveable();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());

  return null;
};
