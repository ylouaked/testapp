import { Component, OnInit } from '@angular/core';
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
import { SearchComponent } from '../search/search.component';
@Component({
  selector: 'app-store',
  imports: [NavbarComponent,CommonModule,NgxPaginationModule,FormsModule,MatIconModule,SearchComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
  providers: [DatePipe]  
})
export class StoreComponent implements OnInit {

  transactions: Transaction[] = [];
  storeId: number = 0;
  store?: Store | undefined = undefined;
  filteredTransactions: Transaction[] = []; // transactions filtrées
  searchTerm: string = ''; // texte de recherche
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


  applySearch(searchTerm: string): void {
  if (!searchTerm.trim()) { // si le champ de recherche est vide
    this.filteredTransactions = [...this.transactions]; // réinitialisation de filtredTransaction avec toutes les transactions
    return;
  }
  // un filtre sur this.transactions
  this.filteredTransactions = this.transactions.filter(transaction => {
    const dateStr = transaction.date instanceof Date ? transaction.date.toISOString() : transaction.date;
      
    return transaction.libelle.toLowerCase().includes(searchTerm.toLowerCase()) || 
           transaction.montant.toString().includes(searchTerm) || 
           transaction.id.toString().includes(searchTerm) || 
           dateStr.includes(searchTerm);
  });
}


//pagination 
  fetchTransactions(): void {
    this.storeService.getTransactions(this.storeId, this.p, this.itemsPerPage).subscribe(data => {
      this.transactions = data.transactions;
      this.totalItems = data.totalItems; 
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


