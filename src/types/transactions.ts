import firebase from 'firebase/app';
import 'firebase/firestore';

export type Timestamp = firebase.firestore.Timestamp;
export type DocumentReference = firebase.firestore.DocumentReference;

export enum AccountType {
    SAVING = 'saving',
    SPENDING = 'spending',
}

export enum TransactionType {
    MONEY_IN = 'in',
    MONEY_OUT = 'out',
}

export interface Transaction {
    id?: string;
    description: string;
    inflow: number;
    outflow: number;
    type?: TransactionType;
    bucketRef?: DocumentReference;
    bucketName?: string;
    timestamp?: Timestamp;
}
