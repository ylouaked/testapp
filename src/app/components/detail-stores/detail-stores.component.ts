import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapAdvancedMarker, } from "@angular/google-maps";
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
export class DetailStoresComponent implements AfterViewInit {

  stores: Store[] = [];
  selectedStore: Store | null = null;
  
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  onMarkerClick(marker: MapAdvancedMarker, store: Store): void {
    this.selectedStore = store; // Stocker le magasin sélectionné
    this.infoWindow.open(marker); // Ouvrir la fenêtre d'info
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadStores();
  }


@ViewChild(GoogleMap, { static: false }) googleMap!: GoogleMap;



  loadStores(): void {
    this.storeService.getAllStores().subscribe((stores) => {
      this.stores = stores;
    });
  }

  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: 34.74, lng: 3.24},
    zoom: 6,
  };
  
  ngAfterViewInit(): void {
    // La carte sera initialisée après que la vue soit prête
    console.log(this.googleMap); // Vérifiez si googleMap est bien initialisé ici
  }


  onStoreClick(store: Store): void {
    const center = new google.maps.LatLng(store.latitude, store.longitude);
    const mapInstance = this.googleMap.googleMap;
    if (mapInstance) {
      mapInstance.setCenter(center);
      mapInstance.setZoom(12); 
    }
  
}
}