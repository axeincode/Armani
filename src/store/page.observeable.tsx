import { BehaviorSubject } from "rxjs";

export interface IPageState {
  currentPage: number;
  totalPages: number;
  pageName?: string;
  pageId?: string;
}

const iniState = {
  currentPage: 1,
  totalPages: 7,
};

const selectedSubject = new BehaviorSubject<IPageState>(iniState);

export const usePageObserveable = () => {
  const setPage = (page: number) => {
    const state = selectedSubject.getValue();
    selectedSubject.next({
      currentPage: page,
      totalPages: state.totalPages,
    });
  };

  const setPageInfo = (page: IPageState) => {
    selectedSubject.next(page);
  };

  const getObservable = () => {
    return selectedSubject;
  };

  return {
    getObservable,
    setPage,
    setPageInfo,
  };
};
