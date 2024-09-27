import { Component, OnInit } from '@angular/core';
import { OwnedService } from '../owned.service';
import { FavoriteService } from '../favorite.service';
import { Game } from '../game';

@Component({
  selector: 'app-currently-playing',
  templateUrl: './currently-playing.component.html',
  styleUrl: './currently-playing.component.css'
})
export class CurrentlyPlayingComponent implements OnInit{
  playingGames: Game[] = [];
  ownedGames: Game[] = [];

  constructor( public favoriteService: FavoriteService, public ownedService: OwnedService) {}

  ngOnInit(): void{
    this.playingGames = this.ownedService.getCurrentlyPlaying();
  }

  removeFromCurrentlyPlaying(game: Game): void{
    this.ownedService.removeFromCurrentlyPlaying(game);

    this.playingGames = this.ownedService.getCurrentlyPlaying();
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

  onCurrentlyChange(game: Game, isCurrently: boolean): void{
    if(isCurrently){
      this.ownedService.addToCurrentlyPlaying(game);
    }
    else{
      this.ownedService.removeFromCurrentlyPlaying(game);
    }
    this.playingGames = this.ownedService.getCurrentlyPlaying();
  }
}
