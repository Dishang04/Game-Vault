import { Component } from '@angular/core';
import { Game } from '../game';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  favoriteGames: Game[] = [];

  constructor(private favoriteService: FavoriteService){}

  ngOnInit(): void{
    this.favoriteGames = this.favoriteService.getFavoriteGames();
  }

  onFavoriteChange(game: Game, isFavorite: boolean): void{
    if(!isFavorite){
      this.favoriteService.removeFavorite(game);
      this.favoriteGames = this.favoriteService.getFavoriteGames();
    }
  }

}
