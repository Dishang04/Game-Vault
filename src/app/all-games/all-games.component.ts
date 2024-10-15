import { Component, Input, OnInit} from '@angular/core';
import { OwnedService } from '../owned.service';
import { Game } from '../game';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrl: './all-games.component.css'
})
export class AllGamesComponent implements OnInit{
  ownedGames: Game[] = [];
  @Input() filteredGames: Game[] = [];

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
