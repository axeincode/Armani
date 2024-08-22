import { IHoverWidgetState, hoveredSubject } from "@/store";
import { useLayoutEffect, useState } from "react";
import { debounceTime, distinctUntilChanged, map, shareReplay } from "rxjs";
import isEqual from "lodash/isEqual";

// write a hooks that takes in a subject and returns the current state for editor widgets
export function useHoverObserveable() {
  const [state, setState] = useState(hoveredSubject.getValue());

  useLayoutEffect(() => {
    const subscription = hoveredSubject
      .pipe(
        map((state: IHoverWidgetState) => state),
        distinctUntilChanged(isEqual),
        debounceTime(1),
        shareReplay(1)
      )
      .subscribe((stateValue: any) => {
        setState(stateValue);
      });
    return () => subscription.unsubscribe();
  }, []);

  return state;
}
