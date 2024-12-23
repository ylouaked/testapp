import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'auth-app';

  
  ngOnInit(): void {
  }
}
