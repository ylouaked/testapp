import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent  implements OnInit {
  changePasswordForm!: FormGroup;
  message: string | null = null;

  constructor(private fb: FormBuilder,private http: HttpClient,private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.matchPasswords });
  }

  matchPasswords(group: FormGroup): { [key: string]: any } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  changePassword(): void {
    const { oldPassword, newPassword } = this.changePasswordForm.value;

    
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.message = "Utilisateur non authentifié.";
      return;
    }

  
    this.http.get<any[]>(`http://localhost:3001/signupUsersList?id=${currentUser.id}&password=${oldPassword}`)
      .subscribe(users => {
        if (users.length === 1) {
          
          this.http.patch(`http://localhost:3001/signupUsersList/${currentUser.id}`, { password: newPassword })
            .subscribe(() => {
              this.message = "Mot de passe changé avec succès.";
              this.changePasswordForm.reset();
            }, () => {
              this.message = "Erreur lors de la mise à jour du mot de passe.";
            });
        } else {
          this.message = "Ancien mot de passe incorrect.";
        }
      }, () => {
        this.message = "Erreur lors de la vérification de l'ancien mot de passe.";
      });
  }
}




// import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import {
//   FormControl,
//   FormsModule,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { merge } from 'rxjs';

// /** @title Form field with error messages */
// @Component({
//   selector: 'form-field-error-example',
//   templateUrl: 'form-field-error-example.html',
//   styleUrl: 'form-field-error-example.css',
//   imports: [
//     MatFormFieldModule,
//     MatInputModule,
//     FormsModule,
//     ReactiveFormsModule,
//   ],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class FormFieldErrorExample {
//   readonly password = new FormControl('', [Validators.required]);
//   readonly newpassword = new FormControl('', [Validators.required]);
//   readonly confirmpassword = new FormControl('', [Validators.required]);
//   errorMessage = signal('');

//   constructor() {
//     merge(this.password.statusChanges, this.password.valueChanges)
//       .pipe(takeUntilDestroyed())
//       .subscribe(() => this.updateErrorMessage());
//   }

//   updateErrorMessage() {
//     if (this.password.hasError('required') && (this.newpassword.hasError('required') ) ) 
//     {
//       this.errorMessage.set('Ce champ est obligatoire');
//     } else 
//       {
//       this.errorMessage.set('');
//     }
//   }

//   protected readonly value = signal('');

//   protected onInput(event: Event) {
//     this.value.set((event.target as HTMLInputElement).value);
//   }
// }
