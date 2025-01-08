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



  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl);
  }
  
  getstoreById(storeId: number): Observable<Store> {
    console.log(`Store ID : ${storeId}`);
    return this.http.get<Store>(`${this.apiUrl}/${storeId}`);
  }

  

getTransactions(storeId: number, page: number, itemsPerPage: number):
 Observable<{ transactions: Transaction[], totalItems: number }> 
 {
  return this.http.get<{ transactions: Transaction[], totalItems: number }>
  (`${this.apiUrl}/${storeId}/transactions`, {
    params: {
      _page: page.toString(),
      _limit: itemsPerPage.toString(),
    }
  });
}
}