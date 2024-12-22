import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message: string | null = null;

  users = [
    { email: 'jass@yopmail.com', password: '123456', name: 'Jass' },
    { email: 'admin@yopmail.com', password: '123456', name: 'Admin' },
    { email: 'user@yopmail.com', password: '123456', name: 'User' }
  ];

  

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    this.message = null; 

    const { email, password } = this.loginForm.value;

    
    const user = this.users.find(u => u.email === email && u.password === password);

    
  if (user) {
    this.authService.login(user); 
    this.router.navigate(['/dashboard']);
  } else {
    this.message = 'Email ou mot de passe incorrect.';
  }
}
}

