import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfileComponent } from '../profile/profile.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../../user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  currentUserName: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser() as User;
    this.currentUserName = currentUser ? currentUser.name : null }
  

  
    dropdownOpen = false;

    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
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
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

}