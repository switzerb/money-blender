import { useAuth } from './index';
import { useCollection, Document } from '@nandorojo/swr-firestore';

export default function useUserCollection<T extends Document>(collection: string) {
    const { user } = useAuth();
    const currentUser = user?.uid || null;
    const { data, error } = useCollection<T>(`users/${currentUser}/${collection}`, {
        listen: true,
    });
    return { data, error };
}
