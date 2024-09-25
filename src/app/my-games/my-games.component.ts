import { Component, OnInit} from '@angular/core';
import { OwnedService } from '../owned.service';
import { FavoriteService } from '../favorite.service';
import { Game } from '../game';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrl: './my-games.component.css'
})
export class MyGamesComponent implements OnInit {
  ownedGames: Game[] = [];

  constructor( public favoriteService: FavoriteService, public ownedService: OwnedService) {}

  ngOnInit(): void{
    this.ownedGames = this.ownedService.getOwnedGames();
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
}
