import { BehaviorSubject } from "rxjs";

export interface ICreateDeckState {
  loading: boolean;
  error?: string | null;
}

const iniState = {
  loading: false,
  error: null,
};

const createDeckSubject = new BehaviorSubject<ICreateDeckState>(iniState);

export const useCreateDeckObserveable = () => {
  const setLoading = (loading: boolean) => {
    const state = createDeckSubject.getValue();
    createDeckSubject.next({
      ...state,
      loading,
    });
  };

  const setError = (error: string) => {
    const state = createDeckSubject.getValue();
    createDeckSubject.next({
      ...state,
      error,
    });
  };

  const getObservable = () => {
    return createDeckSubject;
  };

  return {
    setLoading,
    setError,
    getObservable,
  };
};
