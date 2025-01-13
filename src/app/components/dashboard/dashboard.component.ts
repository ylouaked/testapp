import { CommonModule, ɵnormalizeQueryParams } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../user';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../store';
import { StoreService } from '../../services/store.service';
import { Transaction } from '../../transaction';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements OnInit {
  
 stores: Store[] = [];
  

  constructor(private authService: AuthService, private router: Router, private storeService: StoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.storeService.getAllStores().subscribe(
      (stores : Store[]) => {
        this.stores = stores;
        console.log('Stores:', this.stores);
      }
    );
  }

  navigateToStore(store:Store): void {    
    this.router.navigate(['/dashboard/store',store.id]);
  }


}






