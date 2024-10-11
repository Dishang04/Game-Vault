import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { FavoriteService } from '../favorite.service';
import { OwnedService } from '../owned.service';

@Component({
  selector: 'app-played-games',
  templateUrl: './played-games.component.html',
  styleUrl: './played-games.component.css'
})
export class PlayedGamesComponent implements OnInit{
  playedGames: Game[] = [];
  ownedGames: Game[] = [];

  constructor(
    public favoriteService: FavoriteService, 
    public ownedService: OwnedService, 
  ){}

  ngOnInit(): void{
    this.playedGames = this.ownedService.getPlayedGames();
  }

  removeFromPlayedGames(game: Game): void{
    this.ownedService.removeFromPlayedGames(game);
    this.playedGames = this.playedGames.filter(g => g.id !== game.id);
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
    this.ownedGames = this.ownedService.getOwnedGames();
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
      this.playedGames.push(game);
    }
  }

}