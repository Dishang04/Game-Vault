import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { FavoriteService } from '../favorite.service';
import { OwnedService } from '../owned.service';

@Component({
  selector: 'app-played-games',
  templateUrl: './played-games.component.html',
  styleUrl: './played-games.component.css'
})
export class PlayedGamesComponent{
  playedGames$: Observable<Game[]>;
  ownedGames$: Observable<Game[]>;

  constructor(
    public favoriteService: FavoriteService, 
    public ownedService: OwnedService, 
  ){
    this.playedGames$ = this.ownedService.getPlayedGames();
    this.ownedGames$ = this.ownedService.getOwnedGames();
  }

  // ngOnInit(): void{
  //   this.playedGames = this.ownedService.getPlayedGames();
  // }

  removeFromPlayedGames(game: Game): void{
    this.ownedService.removeFromPlayedGames(game);
    // this.playedGames = this.playedGames.filter(g => g.game_id !== game.game_id);
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
    }
    else{
      this.ownedService.removeFromMyGames(game);
    }
  }

  // onCurrentlyChange(game: Game, isCurrently: boolean): void {
  //   if(!isCurrently){
  //     this.removeFromCurrentlyPlaying(game);
  //   } 
  //   else{
  //     this.ownedService.addToCurrentlyPlaying(game);
  //     this.playedGames.push(game);
  //   }
  // }

  onPlayedChange(game: Game, isPlayed: boolean): void{
    if(!isPlayed){
      this.removeFromPlayedGames(game);
    }
    else{
      this.ownedService.addToPlayedGames(game);
      // this.playedGames.push(game);
    }
  }

}