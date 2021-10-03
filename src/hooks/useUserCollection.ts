import { useAuth } from './index';
import { Document, useCollection } from '@nandorojo/swr-firestore';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function useUserCollection<T extends object>(
    collection: string,
): {
    data: Document<T>[] | null | undefined;
    error: any;
    add: (data: T | T[]) => Promise<void> | null;
} {
    const { user } = useAuth();
    const currentUser = user?.uid || null;
    const { data, error, add } = useCollection<T>(`users/${currentUser}/${collection}`, {
        parseDates: ['timestamp'],
        listen: true,
    });
    return { data, error, add };
}
