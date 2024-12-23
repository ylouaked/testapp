import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

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

  /*login(): void {
    const { email, password } = this.loginForm.value;
    this.message = null;

    
    this.http.get<any[]>(`http://localhost:3000/signupUsersList?email=${email}&password=${password}`).subscribe(
      (users) => {
        if (users.length > 0) {
          this.router.navigate(["/dashboard"]);
        } else {
          this.message = 'Email ou mot de passe incorrect.';
        }
      },
      () => {
        this.message = "Une erreur est survenue lors de la connexion.";
      }
    );
  }
}

/*onSubmit(): void {

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

*/


login(): void {
  const { email, password } = this.loginForm.value;
  this.message = null;

  this.authService.login(email, password).subscribe(
    (users) => {
      if (users.length > 0) {
        
         const token = btoa(`${email}:${password}`); //const token = http://localhost:3000/signupUsersList
        localStorage.setItem('jwt', token);
        localStorage.setItem('currentUser', JSON.stringify(users[0]));
        this.router.navigate(['/dashboard']);
      } else {
        this.message = 'Email ou mot de passe incorrect.';
      }
    },
    () => {
      this.message = "Identifiant incorrect.";
    }
  );
}
}
