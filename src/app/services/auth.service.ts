import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

interface User {
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private apiUrl = 'http://localhost:3000/signupUsersList';

  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('jwt');
    }
    return null;
  }

  getCurrentUser(): any {
    if (this.isLocalStorageAvailable()) {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('currentUser');
    }
  }

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }
}
