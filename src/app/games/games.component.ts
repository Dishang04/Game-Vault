import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
// import { GAMES } from '../mock-games';
import { GameService } from '../game.service';
import { FavoriteService } from '../favorite.service';
import { OwnedService } from '../owned.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService, public favoriteService: FavoriteService, public ownedService: OwnedService) {}

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

  onOwnedChange(game: Game, isOwned: boolean): void{
    if(isOwned){
      this.ownedService.addToMyGames(game);
      this.favoriteService.removeFavorite(game);
    }
    else{
      this.ownedService.removeFromMyGames(game);
    }
  }

  onCurrentlyChange(game: Game, isCurrently: boolean): void{
    if(isCurrently){
      this.ownedService.addToCurrentlyPlaying(game);
    }
    else{
      this.ownedService.removeFromCurrentlyPlaying(game);
    }
    this.games = this.games.filter(g => this.ownedService.isCurrently(g));
  }

  ngOnInit(): void {
    this.getGames();
  }
}
