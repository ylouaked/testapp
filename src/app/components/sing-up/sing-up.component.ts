import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sing-up',
  imports: [FormsModule,ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent {

  public signUpForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ["",  [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6),]],
      name:["", [Validators.required]]
    })
  }

 /* signUp(){
    this.http.post<any>("http://localhost:3000/signupUsersList",this.signUpForm.value)
    .subscribe(res=>{
      alert('SIGNIN SUCCESFUL');
      this.signUpForm.reset()
      this.router.navigate(["login"])
    },err=>{
      alert("Something went wrong")
    })
  }*/
  signUp() {
    const { email } = this.signUpForm.value;

    this.http.get<any[]>(`http://localhost:3000/signupUsersList?email=${email}`).subscribe(
      (users) => {
        if (users.length > 0) {
          alert("Cet email existe déjà. Veuillez utiliser un autre email.");
        } else {
          
          this.http.post<any>("http://localhost:3000/signupUsersList", this.signUpForm.value).subscribe(
            () => {
            
              this.signUpForm.reset();
              this.router.navigate(["/login"]);
            },
          );
        }
      },
      (err) => {
        alert("Something went wrong");
      }
    );
  }
}

