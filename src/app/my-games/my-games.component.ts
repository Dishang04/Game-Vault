import { Component } from '@angular/core';
import { OwnedService } from '../owned.service';
import { Game } from '../game';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrl: './my-games.component.css'
})
export class MyGamesComponent {
  ownedGames: Game[] = [];

  constructor(private ownedService: OwnedService){}

  ngOnInit(): void{
    this.ownedGames = this.ownedService.getOwnedGames();
  }

  onOwnedChange(game: Game, isOwned: boolean): void{
    if(!isOwned){
      this.ownedService.removeFromMyGames(game);
      this.ownedGames = this.ownedService.getOwnedGames();
    }
  }

  // ngOnInit(): void{
  //   this.favoriteGames = this.favoriteService.getFavoriteGames();
  // }

  // onFavoriteChange(game: Game, isFavorite: boolean): void{
  //   if(!isFavorite){
  //     this.favoriteService.removeFavorite(game);
  //     this.favoriteGames = this.favoriteService.getFavoriteGames();
  //   }

}
