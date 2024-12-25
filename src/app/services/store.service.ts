import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../store';
import { Transaction } from '../transaction';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'http://localhost:3000/stores'

  constructor(private http: HttpClient) { }

  getstoreById(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/${id}`);
  }


  
  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}`);
  }

  getTransactionById(id: number ): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }
  
}