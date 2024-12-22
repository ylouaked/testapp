import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: any = null;

  constructor(private router: Router) {}


  private memoryStorage: { [key: string]: string } = {};


  login(user: any): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  //avec JWT 
  //loginJwt(user: any): Observable<any> {
    //return this.http.post<any>('https://api/auth/login', user);   }

 // logout(): void {
   // this.currentUser = null;
   // localStorage.removeItem('currentUser');
   // sessionStorage.removeItem('jwtToken'); 
   // this.router.navigate(['/login']);}




  /// isLoggedIn(): boolean {
    //return this.getCurrentUser() !== null || this.getJwtToken() !== null; }



}
