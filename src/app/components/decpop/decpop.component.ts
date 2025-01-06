import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-decpop',
  imports: [RouterOutlet,CommonModule,MatDialogModule,MatButtonModule],
  templateUrl: './decpop.component.html',
  styleUrl: './decpop.component.css'
})
export class DecpopComponent {

 constructor(private authService: AuthService, private router: Router) {}

ngOnInit(): void {
}

logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}



}


