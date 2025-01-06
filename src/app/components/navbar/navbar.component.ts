import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../../user';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { DecpopComponent } from '../decpop/decpop.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet,CommonModule,MatIconModule,MatMenuModule,DecpopComponent,MatDialogModule,MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  currentUserName: string | null = null;
  activeLink: string = 'dashboard';

  constructor(private authService: AuthService, private router: Router,private dialog: MatDialog) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser() as User;
    this.currentUserName = currentUser ? currentUser.name : null }
  

  
    

    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
    }

  goToProfile(): void {
    this.router.navigate(['/profile']);  
    this.setActive('profile');
    
  }

  goToDashboard():void {
    this.router.navigate(['/dashboard']);
    this.setActive('dashboard');
  }

  

  setActive(link: string): void {
    this.activeLink = link; 
  }



deconnexion: boolean | undefined;
  
  openDialog():void {
  this.dialog.open(DecpopComponent)  
  }



}