import { AppUser, Auth } from './auth';

interface Bucket {
    id?: string;
    name: string;
    budgeted: number;
}

export type { AppUser, Auth, Bucket };
