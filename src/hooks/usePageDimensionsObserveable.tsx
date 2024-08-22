import { IPageDimensions, pageDimensionSubject } from "@/store";
import { useLayoutEffect, useState } from "react";
import { debounceTime, distinctUntilChanged, map, shareReplay } from "rxjs";
import isEqual from "lodash/isEqual";

// write a hooks that takes in a subject and returns the current state for editor widgets
export function usePageDimensionsObserveable() {
  const [state, setState] = useState(pageDimensionSubject.getValue());

  useLayoutEffect(() => {
    const subscription = pageDimensionSubject
      .pipe(
        map((state: IPageDimensions) => state),
        distinctUntilChanged(isEqual),
        debounceTime(10),
        shareReplay(1)
      )
      .subscribe((stateValue: any) => {
        setState(stateValue);
      });
    return () => subscription.unsubscribe();
  }, []);

  return state;
}
