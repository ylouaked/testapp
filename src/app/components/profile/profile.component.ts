import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  currentUser: User | null = null;


  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser(); 
  }

}
