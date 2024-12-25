import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { User } from '../../user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  
  }

  login(): void {
    const { email, password } = this.loginForm.value;
    this.message = null;

    
    this.http.get<any>(`http://localhost:3001/signupUsersList?email=${email}&password=${password}`).subscribe(
      (user) => {
        if (user.length >0) {
          console.log(user);
           const token = generateJwtToken(user.email, user.password)
           console.log("token " , token);          
           localStorage.setItem('jwt', token); //pour stocker les val (clé,val)
           localStorage.setItem('currentUser', JSON.stringify(user))

          this.router.navigate(['/dashboard']);
        } else {
          this.message = "Email ou mot de passe incorrect.";
        }
      },
      () => {
        this.message = "Une erreur est survenue lors de la connexion.";
      }
    );
  }
}


function generateJwtToken(email : string, password : string) {
  
  const secretKey = "my_secret_key";

  
  const header = {
      alg: "HS256",
      typ: "JWT"
  };

  
  const payload = {
      email,
      password,
      iat: Math.floor(Date.now() / 1000) // Issued at timestamp
  };

  
  const base64Header = btoa(JSON.stringify(header));
  const base64Payload = btoa(JSON.stringify(payload));

 
  const signature = btoa(`${base64Header}.${base64Payload}.${secretKey}`);

  
  return `${base64Header}.${base64Payload}.${signature}`;
}



