import React, { useLayoutEffect, useState } from "react";
// import hash from 'hash-it';
// import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, shareReplay } from "rxjs";
import isEqual from "lodash/isEqual";
import { map } from "rxjs/operators";

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
  }, []);

  return state;
}
