import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements OnInit  {
  currentUser: any | null = null;

  userEmail : string = "" ;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser[0]);}

    stores = [
      { name: 'Condor Alger', id: 1 },
      { name: 'Condor Oran', id: 2 },
      { name: 'Condor Annaba', id: 3 }
    ];

    
    navigateToStore(storeName: string): void {
      this.router.navigate([`/store/${storeName}`]);
    }
    
    
  

}