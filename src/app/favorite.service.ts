import { Injectable } from '@angular/core';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteGames: Game[] = [];

  constructor() { }

  addFavorite(game: Game): void{
    if(!this.isFavorite(game)){
      this.favoriteGames.push(game);
    }
  }

  removeFavorite(game: Game): void{
    this.favoriteGames = this.favoriteGames.filter(g => g.game_id !== game.game_id);
  }

  isFavorite(game: Game): boolean{
    return this.favoriteGames.some(g => g.game_id === game.game_id);
  }

  getFavoriteGames(): Game[]{
    return this.favoriteGames;
  }
}
