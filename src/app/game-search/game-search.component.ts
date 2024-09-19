import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrl: './game-search.component.css'
})
export class GameSearchComponent {
  @Output() searchQuery = new EventEmitter<string>();

  onSearch(value: string): void{
    console.log('User input:', value); 
    this.searchQuery.emit(value);
  }
}
