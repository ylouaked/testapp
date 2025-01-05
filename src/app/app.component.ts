import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'auth-app';

  
  ngOnInit(): void {
  }
}
