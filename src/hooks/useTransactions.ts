import { useUserCollection } from './index';
import { Transaction } from '../types/transactions';

export const useSpendTransactions = (): string => {
    const { data: spendTransactions } = useUserCollection<Transaction>('spendings');
    // const { data: buckets } = useUserCollection<Bucket>('buckets');

    if (!spendTransactions) {
        return '';
    }

    console.log('hey');

    //             docs.forEach((doc) => {
    //                 if (bucketRef) {
    //                     bucketRef
    //                         .get()
    //                         .then((bucket) => {
    //                             detail.bucket = bucket.data().name;
    //                             temp.push(detail);
    //                             temp.sort((a, b) => b.date - a.date);
    //                             dispatch({ type: 'getSpendings', payload: temp });
    //                         })
    //                         .catch((err) => console.error(err));
    //                 } else {
    //                 }
    //             });
    //         });

    return 'hello';
};
