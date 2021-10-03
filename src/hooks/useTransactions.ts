import { useAuth } from './index';
import { Document, useCollection } from '@nandorojo/swr-firestore';
import { TransactionType } from '../types/transactions';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function useTransactions<Transaction extends object>(
    type: TransactionType,
): {
    data: Document<Transaction>[] | null | undefined;
    // eslint-disable-next-line
    error: any;
    add: (data: Transaction | Transaction[]) => Promise<void> | null;
} {
    const { user } = useAuth();
    const currentUser = user?.uid || null;

    const transactionType = {
        [TransactionType.SAVING]: 'savings',
        [TransactionType.SPENDING]: 'spendings',
    }[type];
    const { data, error, add } = useCollection<Transaction>(`users/${currentUser}/${transactionType}`, {
        parseDates: ['timestamp'],
        orderBy: ['timestamp', 'desc'],
        listen: true,
    });
    return { data, error, add };
}
