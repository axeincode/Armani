import { debounceTime, distinctUntilChanged, shareReplay } from "rxjs";
import { ISelectedWidgetState, useSelectedWidgetRepo } from "@/store";
import { useLayoutEffect, useState } from "react";
import { useUserAgreementRepo } from "@/store/user-agreement.observeable";
import { Agreement } from "@/types/editor.types";

export function useUserAgreementObserveable() {
  const userAgreement$ = useUserAgreementRepo();
  const userAgreementObs = userAgreement$.getObservable();
  const [state, setState] = useState<Agreement[]>(userAgreementObs.getValue());

  useLayoutEffect(() => {
    const subscription = userAgreementObs
      .pipe(
        // map((s) => hash(s)),
        distinctUntilChanged(),
        debounceTime(10),
        shareReplay(1)
      )
      .subscribe((currentState: Agreement[]) => {
        setState(currentState);
      });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, []);

  return state;
}
