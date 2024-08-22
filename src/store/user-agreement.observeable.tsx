import { Agreement } from "@/types/editor.types";
import { produce } from "immer";
import { BehaviorSubject } from "rxjs";

const initialState = [
  {
    title: "",
    uid: "",
    email: "",
    deckId: "",
    accepted: false,
  },
];

export const userAgreementSubject = new BehaviorSubject<Agreement[]>(
  initialState
);

export const useUserAgreementRepo = () => {
  const setInitalAgreements = (payload: Agreement[]) => {
    userAgreementSubject.next(payload);
  };

  const confirmAgreement = (useremail: string, deckId: string) => {
    const prevState = userAgreementSubject.getValue();
    const updatedState = produce(prevState, (draft) => {
      const index = draft.findIndex((item) => item.deckId === deckId);
      if (index !== -1) {
        draft[index].accepted = true;
      }
    });
    userAgreementSubject.next(updatedState);
  };

  const resetAllAgreements = () => {
    userAgreementSubject.next(initialState);
  };

  const getObservable = () => {
    return userAgreementSubject;
  };

  return {
    setInitalAgreements,
    confirmAgreement,
    getObservable,
    resetAllAgreements,
  };
};
