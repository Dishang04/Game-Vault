import { Component, OnInit} from '@angular/core';
import { OwnedService } from '../owned.service';
import { Game } from '../game';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrl: './my-games.component.css'
})
export class MyGamesComponent implements OnInit {
  ownedGames: Game[] = [];

  constructor(public ownedService: OwnedService){}

  ngOnInit(): void{
    this.ownedGames = this.ownedService.getOwnedGames();
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