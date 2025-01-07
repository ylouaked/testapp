import { Component } from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";
import { StoreService } from '../../services/store.service';
import { Store } from '../../store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-stores',
  imports: [GoogleMapsModule,FormsModule,CommonModule],
  templateUrl: './detail-stores.component.html',
  styleUrl: './detail-stores.component.css'
})
export class DetailStoresComponent {

  stores: Store[] = [];

  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getAllStores().subscribe((stores) => {
      this.stores = stores;
    });
  }
}
