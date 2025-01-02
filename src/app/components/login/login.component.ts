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

    this.http.get<User[]>(`http://localhost:3001/signupUsersList?email=${email}&password=${password}`).subscribe(
      (users) => {
        if (users.length === 1) {
          const user = users[0];  // Utilise le premier utilisateur retourné
           console.log(user);


          // Générer un token JWT avec l'utilisateur
          const token = this.generateJwtToken(user);
          console.log("Token généré: ", token);

          // Stocker le JWT et l'utilisateur dans le localStorage
          localStorage.setItem('jwt', token);
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Rediriger vers le dashboard après connexion réussie
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

  // Méthode pour générer un token JWT
  generateJwtToken(user: User): string {
    const secretKey = "my_secret_key";  // Cette clé doit être protégée en production !

    // Entête du JWT
    const header = {
      alg: "HS256",
      typ: "JWT"
    };

    // Payload (informations utilisateur à inclure dans le token)
    const payload = {
      id: user.id,   // Ajout de l'id de l'utilisateur pour l'identifier de façon unique
      email: user.email,
      iat: Math.floor(Date.now() / 1000)  // Horodatage de création du token
    };

    // Encodage de l'entête et du payload en Base64
    const base64Header = btoa(JSON.stringify(header));
    const base64Payload = btoa(JSON.stringify(payload));

    // Signature du token (Note : cette partie est simplifiée, en production utilise une bibliothèque comme jsonwebtoken)
    const signature = btoa(`${base64Header}.${base64Payload}.${secretKey}`);

    // Retourner le token complet
    return `${base64Header}.${base64Payload}.${signature}`;
  }
}




