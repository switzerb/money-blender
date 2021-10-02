import { useAuth } from './index';
import { Document, useCollection } from '@nandorojo/swr-firestore';

export default function useUserCollection<T extends Document>(
    collection: string,
    // eslint-disable-next-line
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
