import { debounceTime, distinctUntilChanged, shareReplay } from "rxjs";
import { ISelectedWidgetState, useSelectedWidgetRepo } from "@/store";
import { useLayoutEffect, useState } from "react";

export function useCurrentWidgetObserveable() {
  const widgetObs = useSelectedWidgetRepo();
  const selectedObs = widgetObs.getObservable();
  const [state, setState] = useState<ISelectedWidgetState>(
    selectedObs.getValue()
  );

  useLayoutEffect(() => {
    const subscription = selectedObs
      .pipe(
        // map((s) => hash(s)),
        distinctUntilChanged(),
        debounceTime(10),
        shareReplay(1)
      )
      .subscribe((currentState: ISelectedWidgetState) => {
        setState(currentState);
      });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, []);

  return state;
}
