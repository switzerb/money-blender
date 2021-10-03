import { DocumentReference } from '@firebase/firestore-types';

export enum TransactionType {
    SAVING = 'saving',
    SPENDING = 'spending',
}

export interface Transaction {
    id: string;
    description: string;
    inflow: number;
    outflow: number;
    bucketRef?: DocumentReference;
    bucketName?: string;
    timestamp: string;
}
