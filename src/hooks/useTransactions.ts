import { useAuth } from './index';
import { useCollection } from '@nandorojo/swr-firestore';
import { AccountType, Transaction as TransactionModel } from '../types/transactions';
import useStore from './useStore';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function useTransactions<Transaction extends object>(
    type: AccountType,
): {
    data: Transaction[] | null | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    add: (data: Transaction | Transaction[]) => Promise<void> | null;
} {
    const { user } = useAuth();
    const currentUser = user?.uid || null;
    const { buckets } = useStore();

    const transactionType = {
        [AccountType.SAVING]: 'savings',
        [AccountType.SPENDING]: 'spendings',
    }[type];

    const { data, error, add } = useCollection<Transaction>(`users/${currentUser}/${transactionType}`, {
        orderBy: ['timestamp', 'desc'],
        listen: true,
    });

    // TODO: figure out a way to not make this so stupid
    const results = data?.map((transaction) => {
        const t = (transaction as unknown) as TransactionModel;
        const bucket = buckets.find((bucket) => bucket.id === t.bucketRef?.id);
        return { ...transaction, bucketName: bucket ? bucket.name : '' };
    });

    return { data: results, error, add };
}
