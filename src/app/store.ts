import { Transaction } from "./transaction";

export interface Store {
    id: number;
    name: string;
    location: string;
    transactions: Transaction[];
}
