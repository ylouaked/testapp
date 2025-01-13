import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';

  @Output() searchChange = new EventEmitter<string>();

  onInputChange(): void {
    this.searchChange.emit(this.searchTerm);
  }
}
