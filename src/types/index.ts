import { Transaction } from './transactions';
import { AppUser, Auth } from './auth';

interface Bucket {
    id: string;
    name: string;
    budgeted: string;
}

export type { AppUser, Auth, Bucket, Transaction };
