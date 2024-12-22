import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfileComponent } from '../profile/profile.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  
    dropdownOpen = false;

  logout(): void {
    this.authService.logout();
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);  
  }

  goToDashboard():void {
    this.router.navigate(['/dashboard']);
  }

  goToDropDown():void {
    this.dropdownOpen = !this.dropdownOpen;
  }

}