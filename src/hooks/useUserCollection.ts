import { useAuth } from './index';
import { useCollection, Document } from '@nandorojo/swr-firestore';

export default function useUserCollection<T extends Document>(
    collection: string,
): { data: Document<T>[] | null | undefined; error: any } {
    const { user } = useAuth();
    const currentUser = user?.uid || null;
    const { data, error } = useCollection<T>(`users/${currentUser}/${collection}`, {
        parseDates: ['timestamp'],
        orderBy: ['timestamp', 'desc'],
        listen: true,
    });
    return { data, error };
}
