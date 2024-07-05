import { Timestamp } from "firebase/firestore";

export type ColumnKeys<T> = Array<keyof T>;
export interface Contact {
    id?: string;
    name: string;
    email: string;
    phone: string;
    action: string;
    created: Timestamp;
    updated: Timestamp;
}