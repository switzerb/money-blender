import * as React from 'react';
import { Store } from '../types/store';
import { useCollection } from '@nandorojo/swr-firestore';
import { Bucket } from '../types';
import { useAuth } from '../hooks';

type Props = {
    children: React.ReactNode;
};

const defaultStore = {
    buckets: [],
};

const StoreContext = React.createContext<Store>(defaultStore);

const StoreProvider: React.FC<Props> = ({ children }: Props) => {
    const { user } = useAuth();
    const currentUser = user?.uid || null;

    const { data: buckets } = useCollection<Bucket>(`users/${currentUser}/buckets`, {
        listen: true,
    });

    return <StoreContext.Provider value={{ buckets: buckets || [] }}>{children}</StoreContext.Provider>;
};

export { StoreContext, StoreProvider };
