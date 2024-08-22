import { BehaviorSubject } from "rxjs";

export interface IPageDimensions {
  width: number;
  height: number;
}

const initialState = {
  width: 0,
  height: 0,
};

export const pageDimensionSubject = new BehaviorSubject<IPageDimensions>(
  initialState
);

export const usePageDimensions = () => {
  const set = ({ height, width }: IPageDimensions) => {
    const state = pageDimensionSubject.getValue();
    pageDimensionSubject.next({
      ...state,
      width,
      height,
    });
  };

  const update = ({ height, width }: IPageDimensions) => {
    const state = pageDimensionSubject.getValue();
    pageDimensionSubject.next({ ...state, width, height });
  };

  const getObservable = () => {
    return pageDimensionSubject;
  };

  return {
    set,
    getObservable,
    update,
  };
};
