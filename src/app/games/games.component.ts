import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
// import { GAMES } from '../mock-games';
import { GameService } from '../game.service';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService, public favoriteService: FavoriteService) { }

  getGames(query: string = ''): void {
    this.gameService.getGames(query).subscribe(games =>{
      this.games = games;
    });
  }

  onSearch(query: string): void {
    this.getGames(query);
  }

  onFavoriteChange(game: Game, isFavorite: boolean): void{
    if(isFavorite){
      this.favoriteService.addFavorite(game);
    }
    else{
      this.favoriteService.removeFavorite(game);
    }
  }

  ngOnInit(): void {
    this.getGames();
  }
}
