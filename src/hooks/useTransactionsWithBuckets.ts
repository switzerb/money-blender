import { AccountType, Transaction as TransactionModel } from '../types/transactions';
import useStore from './useStore';
import useTransactions from './useTransactions';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function useTransactionsWithBuckets<Transaction extends object>(
    type: AccountType,
): {
    data: Transaction[] | null | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    add: (data: Transaction | Transaction[]) => Promise<void> | null;
} {
    const { data, error, add } = useTransactions<Transaction>(type);
    const { buckets } = useStore();

    const results = data?.map((transaction) => {
        const t = transaction as TransactionModel;
        const bucket = buckets.find((bucket) => bucket.id === t.bucketRef?.id);
        return { ...transaction, bucketName: bucket ? bucket.name : '' };
    });

    return { data: results, error, add };
}
