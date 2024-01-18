// store.js
import { BehaviorSubject } from 'rxjs';

const initialState = {
    // Your initial state here

};

const subject = new BehaviorSubject(initialState);

export const store$ = subject;

export const updateStore = (newState: any) => {
    const currentState = subject.value;
    subject.next({ ...currentState, ...newState });
};
