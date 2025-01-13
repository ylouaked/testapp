import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Transaction } from '../../transaction';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction',
  imports: [NavbarComponent,CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  transactionId: number =0;
  transaction?: Transaction;
  storeId: number = 0;
  store?: Store | undefined = undefined;

constructor(private router: Router, private storeService: StoreService, private route: ActivatedRoute) { }




    ngOnInit(): void {
      this.storeId = +this.route.snapshot.paramMap.get('storeId')!;
      this.transactionId = +this.route.snapshot.paramMap.get('transactionId')!;
      this.storeService.getstoreById(this.storeId).subscribe(store => {
        this.store = store;
        this.transaction = store.transactions.find(t => t.id === this.transactionId);// pour chercher la transaction spécifique correspondant à transactionId
      });
    }


}

