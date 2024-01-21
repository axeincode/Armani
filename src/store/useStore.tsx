'use client'

import { useState, useEffect } from 'react';
import { store$, updateStore } from './store';

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

    return { state, updateStore };
};