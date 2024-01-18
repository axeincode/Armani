import { useState, useEffect } from 'react';
import { store$ } from './store';

export const useStore = () => {
    const [state, setState] = useState(store$.getValue());

    useEffect(() => {
        const subscription = store$.subscribe((newState) => {
            setState(newState);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return state;
};