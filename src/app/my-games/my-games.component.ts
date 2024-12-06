import { Observable } from 'rxjs';
import { Component, OnInit} from '@angular/core';
import { OwnedService } from '../owned.service';
import { Game } from '../game';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrl: './my-games.component.css'
})
export class MyGamesComponent implements OnInit {
  ownedGames$: Observable<Game[]>;

  constructor(public ownedService: OwnedService){
    this.ownedGames$ = this.ownedService.getOwnedGames();

  }

  ngOnInit(): void{
  }

  onOwnedChange(game: Game, isOwned: boolean): void{
    if(isOwned){
      this.ownedService.addToMyGames(game);
    }
    else{
      this.ownedService.removeFromMyGames(game);
    }
  }
}