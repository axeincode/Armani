import { debounceTime, distinctUntilChanged, shareReplay } from "rxjs";
import { usePageObserveable } from "@/store";
import { useLayoutEffect, useState } from "react";

export function useCurrentPageObserveable() {
  const pageObservable = usePageObserveable();
  const pageSubject = pageObservable.getObservable();
  const [state, setState] = useState(pageSubject.getValue());

  useLayoutEffect(() => {
    const subscription = pageSubject
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
    // eslint-disable-next-line
  }, []);

  return state;
}
