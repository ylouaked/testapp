import { Transaction } from "./transaction";

export interface Store {
    id: number;
    name: string;
    wilaya: string;
    adresse: string;
    telephone: string;
    latitude: number;
    longitude: number;
    transactions: Transaction[];
}
