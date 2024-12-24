import { CommonModule, ɵnormalizeQueryParams } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../user';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../store';
import { StoreService } from '../../services/store.service';
import { Transaction } from '../../transaction';
import { error } from 'console';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements OnInit {
  currentUser: any | null = null;
  transactions: Transaction[] = [];
  userEmail: string = "";
  StoreName: String = '';
  stores: Store[] = [];
  StoreId: number = 0 ;

  constructor(private authService: AuthService, private router: Router, private storeService: StoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();


    this.storeService.getAllStores().subscribe(
      (stores) => {
        this.stores = stores;
      }
    );

  }

  navigateToStore(storeId: number): void {
    this.router.navigate(['/store',storeId]);
  }



}







/* stores : Store[]=[     {
      "id":1,   
      "name": "Condor Alger",
      "transactions":[
          {
          "montant":50,
          "label":"",

          },
          {
            "montant":30,
              "label":"",
          }
      ]
      
  } ,
  {
    "id":3,   
    "name": "Condor safsafsaf ",
    "transactions":[
        {
        "montant":50,
        "label":"",

        },
        {
          "montant":30,
            "label":"",
        }
    ]

}];*/


