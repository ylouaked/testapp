import { DatePipe } from "./pipes/date.pipe";

export interface Transaction {


    id: number;
    montant: number;
    libelle: string;
    date?: Date;

    
}
