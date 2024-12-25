import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../store';
import { StoreService } from '../../services/store.service';
import { Transaction } from '../../transaction';
import { CommonModule } from '@angular/common';
import { DatePipe } from '../../pipes/date.pipe';

@Component({
  selector: 'app-store',
  imports: [NavbarComponent,CommonModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
  providers: [DatePipe]  
})
export class StoreComponent {

  transaction: Transaction[] = [];
  storeID: number = 0;
  store?: Store | undefined = undefined;



  constructor(private router: Router, private storeService: StoreService, private route: ActivatedRoute) { }

  ngOnInit() {

  this.route.params.subscribe(params => {
  this.storeID = params['id'];
  this.loadStoreData();
});
}

loadStoreData(): void {
  this.storeService.getstoreById(this.storeID).subscribe(store => {
    this.store = store;  
    console.log(this.store);

    if (this.store && this.store.transactions) {
      this.transaction = this.store.transactions; 
      

      console.log('Transactions:', this.transaction); 
      
    } 
    
  });
}


}