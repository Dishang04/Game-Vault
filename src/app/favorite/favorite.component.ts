import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  @Input() isFavorite: boolean = true;
  @Output() favoriteChange = new EventEmitter<boolean>();

  constructor(){}

  onClick(): void{
    this.isFavorite = !this.isFavorite;
    this.favoriteChange.emit(this.isFavorite);
    console.log("test");
  }
}