import { useDocument } from '@nandorojo/swr-firestore';
import { useAuth } from './index';
import { AccountType } from '../types/transactions';

export default function useTransaction<Transaction>(
    id: string,
    type: AccountType,
): {
    update: (data: Partial<Transaction>) => Promise<void> | null;
    deleteDocument: () => void;
} {
    const { user } = useAuth();
    const currentUser = user?.uid || null;

    const transactionType = {
        [AccountType.SAVING]: 'savings',
        [AccountType.SPENDING]: 'spendings',
    }[type];

    const { update, deleteDocument } = useDocument(`users/${currentUser}/${transactionType}/${id}`);

    return { update, deleteDocument };
}
