import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../store';
import { StoreService } from '../../services/store.service';
import { Transaction } from '../../transaction';

@Component({
  selector: 'app-store',
  imports: [NavbarComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  transaction: Transaction[] = [];
  storeID: number = 0;
  store?: Store | undefined = undefined;



  constructor(private router: Router, private storeService: StoreService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.storeID = Number(this.route.snapshot.paramMap.get('id'));
    this.storeService.getstoreById(this.storeID).subscribe(store => { this.store = store; console.log(this.store);
     })


  }

}
