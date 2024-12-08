import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { OwnedService } from '../owned.service';
import { FavoriteService } from '../favorite.service';
import { Game } from '../game';
import { Location } from '@angular/common';

@Component({
  selector: 'app-currently-playing',
  templateUrl: './currently-playing.component.html',
  styleUrl: './currently-playing.component.css'
})
export class CurrentlyPlayingComponent{
  playingGames$: Observable<Game[]>;
  ownedGames$: Observable<Game[]>;
  playedGames: Game[] = [];

  constructor( 
    public favoriteService: FavoriteService, 
    public ownedService: OwnedService, 
    private location: Location
  ){
    this.ownedGames$ = this.ownedService.getOwnedGames();
    this.playingGames$ = this.ownedService.getCurrentlyPlaying();
  }

  // ngOnInit(): void{
  //   this.playingGames$ = this.ownedService.getCurrentlyPlaying();
  // }

  removeFromCurrentlyPlaying(game: Game): void{
    this.ownedService.removeFromCurrentlyPlaying(game);
    // this.playingGames = this.playingGames.filter(g => g.game_id !== game.game_id);
  }

  removeFromPlayedGames(game: Game): void{
    this.ownedService.removeFromPlayedGames(game);
    this.playedGames = this.playedGames.filter(g => g.game_id !== game.game_id);
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

  onCurrentlyChange(game: Game, isCurrently: boolean): void {
    if(!isCurrently){
      this.removeFromCurrentlyPlaying(game);
    } 
    else{
      this.ownedService.addToCurrentlyPlaying(game);
      // this.playingGames.push(game);
    }
  }

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