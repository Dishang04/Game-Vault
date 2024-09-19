import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrl: './my-games.component.css'
})
export class MyGamesComponent {
  // favoriteGames: Game[] = [];

  // constructor(private favoriteService: FavoriteService){}

  // ngOnInit(): void{
  //   this.favoriteGames = this.favoriteService.getFavoriteGames();
  // }

  // onFavoriteChange(game: Game, isFavorite: boolean): void{
  //   if(!isFavorite){
  //     this.favoriteService.removeFavorite(game);
  //     this.favoriteGames = this.favoriteService.getFavoriteGames();
  //   }
  // }
}
