import { Component, OnInit} from '@angular/core';
import { OwnedService } from '../owned.service';
import { Game } from '../game';
import { filter } from 'rxjs';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrl: './my-games.component.css'
})
export class MyGamesComponent implements OnInit {
  ownedGames: Game[] = [];
  filteredGames: Game[] = [];

  constructor(public ownedService: OwnedService){}

  ngOnInit(): void{
    this.ownedGames = this.ownedService.getOwnedGames();
    this.filteredGames = [...this.ownedGames];
  }

  onFilterChange(selectedGenres: string[]): void{
    if(selectedGenres.includes('all') || selectedGenres.length === 0){
      this.filteredGames = [...this.ownedGames];
    }
    else{
      this.filteredGames = this.ownedGames.filter(game => 
        selectedGenres.some(genre => game.genres.toLowerCase().includes(genre.toLowerCase()))
      );
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
    this.filteredGames = [...this.ownedGames];
  }
}
