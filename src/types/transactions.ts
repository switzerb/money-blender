export interface Transaction {
    id: string;
    description: string;
    inflow: number;
    outflow: number;
    bucketRef?: string;
    timestamp: string;
}
