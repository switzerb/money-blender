import { useContext } from 'react';
import { StoreContext } from '../providers/StoreProvider';
import { Store } from '../types/store';

export default function useStore(): Store {
    return useContext(StoreContext);
}
