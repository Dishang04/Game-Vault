import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { FavoriteService } from '../favorite.service';
import { OwnedService } from '../owned.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  favoriteGames: Game[] = [];
  ownedGames: Game[] = [];

  constructor( public favoriteService: FavoriteService, public ownedService: OwnedService) {}

  ngOnInit(): void{
    this.favoriteGames = this.favoriteService.getFavoriteGames();
  }

  onFavoriteChange(game: Game, isFavorite: boolean): void{
    if(!isFavorite){
      this.favoriteService.removeFavorite(game);
      this.favoriteGames = this.favoriteService.getFavoriteGames();
    }
  }

  onOwnedChange(game: Game, isOwned: boolean): void{
    if(!isOwned){
      this.ownedService.removeFromMyGames(game);
      this.ownedGames = this.ownedService.getOwnedGames();
    }
  }
}
