import { Transaction, Bucket } from '../types';

// const getBucketName = (bucketRef: any, buckets: Bucket[]): string => {
//     const bucket = buckets.find((bucket) => bucket.id === bucketRef);
//     if (!bucket) {
//         return '';
//     }
//     return bucket.name;
// };

export const selectTransactions = (
    spendTransactions?: Transaction[] | null,
    buckets?: Bucket[] | null,
): Transaction[] => {
    if (!spendTransactions) {
        return [];
    }
    // const result = spendTransactions.map((t) => {
    //     let bucketName = '';
    //     if (t.bucketRef && buckets) {
    //         console.log(t.bucketRef.get());
    //         bucketName = getBucketName(t.bucketRef, buckets);
    //     }
    //     return Object.assign({}, t, bucketName);
    // });
    // console.log(result);
    return spendTransactions;
};