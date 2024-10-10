import { Component, OnInit} from '@angular/core';
import { OwnedService } from '../owned.service';
import { Game } from '../game';

@Component({
  selector: 'app-played-games',
  templateUrl: './played-games.component.html',
  styleUrl: './played-games.component.css'
})
export class PlayedGamesComponent implements OnInit {
  ownedGames: Game[] = [];
  playedGames: Game[] = [];

  constructor(
    // public favoriteService: FavoriteService,
    public ownedService: OwnedService
  ){}

  ngOnInit(): void{
    this.playedGames = this.ownedService.getOwnedGames();
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

  onPlayedChange(game: Game, isPlayed: boolean): void {
    if (isPlayed) {
      this.ownedService.addToPlayedGames(game);
    } else {
      this.ownedService.removeFromPlayedGames(game);
    }
    this.playedGames = this.ownedService.getPlayedGames(); // Refresh the list
  }
}
