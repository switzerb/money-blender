import { useAuth } from './index';
import { useCollection } from '@nandorojo/swr-firestore';
import { AccountType } from '../types/transactions';

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

    const transactionType = {
        [AccountType.SAVING]: 'savings',
        [AccountType.SPENDING]: 'spendings',
    }[type];

    const { data, error, add } = useCollection<Transaction>(`users/${currentUser}/${transactionType}`, {
        orderBy: ['timestamp', 'desc'],
        listen: true,
    });

    return { data, error, add };
}
