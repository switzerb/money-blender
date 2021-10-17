import * as React from 'react';
import { useReducer } from 'react';
import { Store } from '../types/store';

type Props = {
    children: React.ReactNode;
};

type Action = { type: 'request' } | { type: 'success'; results: Store } | { type: 'failure'; error: string };

type State = {
    data: Store;
    isLoading: boolean;
    error?: string;
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'request':
            return { ...state, isLoading: true };
        case 'success':
            return { ...state, isLoading: false, data: action.results };
        case 'failure':
            return { ...state, isLoading: false, error: action.error };
    }
};

const defaultStore = {
    buckets: [],
};

const initialState = {
    data: defaultStore,
    isLoading: false,
};

const StoreContext = React.createContext<Store>(defaultStore);

const StoreProvider: React.FC<Props> = ({ children }: Props) => {
    const [{ data }] = useReducer(reducer, initialState);

    return <StoreContext.Provider value={{ buckets: data.buckets }}>{children}</StoreContext.Provider>;
};

export { StoreContext, StoreProvider };
