import { Transaction, TransactionType } from '../types/transactions';

// const getBucketName = (bucketRef: any, buckets: Bucket[]): string => {
//     const bucket = buckets.find((bucket) => bucket.id === bucketRef);
//     if (!bucket) {
//         return '';
//     }
//     return bucket.name;
// };

export const selectTransactions = (spendTransactions?: Transaction[] | null): Transaction[] => {
    if (!spendTransactions) {
        return [];
    }
    return spendTransactions.map((t) => {
        return {
            ...t,
            timestamp: t.timestamp,
            type: t.inflow > 0 ? TransactionType.MONEY_IN : TransactionType.MONEY_OUT,
        };
    });
};
