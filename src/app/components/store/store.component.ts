import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../store';
import { StoreService } from '../../services/store.service';
import { Transaction } from '../../transaction';
import { CommonModule } from '@angular/common';
import { DatePipe } from '../../pipes/date.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-store',
  imports: [NavbarComponent,CommonModule,NgxPaginationModule,FormsModule,MatIconModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
  providers: [DatePipe]  
})
export class StoreComponent {

  transactions: Transaction[] = [];
  storeId: number = 0;
  store?: Store | undefined = undefined;
  filteredTransactions: Transaction[] = []; // Transactions filtrées

 
  searchTerm: string = ''; // Texte de recherche


  p: number = 1; 
  itemsPerPage: number = 2;
  totalItems: number = 0; 
  constructor(private router: Router, private storeService: StoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.storeId = +this.route.snapshot.paramMap.get('id')!; 
    this.storeService.getstoreById(this.storeId).subscribe(store => {
      this.store = store;
      this.transactions = store.transactions;
      this.filteredTransactions = [...this.transactions]; 
    });
  }
  applySearch(): void {
  if (!this.searchTerm.trim()) { // Si le champ de recherche est vide
    this.filteredTransactions = [...this.transactions]; // Réinitialisation
    return;
  }

  this.filteredTransactions = this.transactions.filter(transaction => {
    const dateStr = transaction.date instanceof Date ? transaction.date.toISOString() : transaction.date;
      
    return transaction.libelle.toLowerCase().startsWith(this.searchTerm.toLowerCase()) || 
           transaction.montant.toString().startsWith(this.searchTerm) || 
           transaction.id.toString().startsWith(this.searchTerm) || 
           dateStr.startsWith(this.searchTerm);
  });
}

  fetchTransactions(): void {
    this.storeService.getTransactions(this.storeId, this.p, this.itemsPerPage).subscribe(data => {
      this.transactions = data.transactions;
      this.totalItems = data.totalItems; // Nombre total de transactions pour gérer la pagination
      this.filteredTransactions = [...this.transactions];
    });
  }




  onPageChange(page: number): void {
    this.p = page;
    this.fetchTransactions(); // Récupérer les transactions de la nouvelle page
  }

  
  viewTransactionDetails(transactionId: number): void {
  this.router.navigate([`/dashboard/store/${this.storeId}/transaction/${transactionId}`]);
}
}


