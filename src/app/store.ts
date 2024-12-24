import { Transaction } from "./transaction";

export interface Store {
    id: number;
    name: string;
    transactions: Transaction[];
}
