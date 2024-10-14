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
  selectedGenres: string[] = [];
  selectedPlatforms: string[] = [];

  constructor(public ownedService: OwnedService){}

  ngOnInit(): void{
    this.ownedGames = this.ownedService.getOwnedGames();
    this.filteredGames = [...this.ownedGames];
  }

  genreFilterChange(selectedGenres: string[]): void{
    if(selectedGenres.includes('all') || selectedGenres.length === 0){
      this.selectedGenres = [];
    }
    else{
      this.selectedGenres = selectedGenres;
    }
    this.applyFilters();
  }

  platformFilterChange(selectedPlatforms: string[]): void{
    if(selectedPlatforms.includes('all') || selectedPlatforms.length === 0){
      this.selectedPlatforms = [];
    }
    else{
      this.selectedPlatforms = selectedPlatforms;
    }
    this.applyFilters();
  }

  applyFilters(): void{
    this.filteredGames = this.ownedGames.filter(game => {
      const matchesGenres = this.selectedGenres.length === 0 || this.selectedGenres.some(genre => game.genres.toLowerCase().includes(genre.toLowerCase()));
      const matchesPlatforms = this.selectedPlatforms.length === 0 || this.selectedPlatforms.some(platform => game.platform.toLowerCase().includes(platform.toLowerCase()));

      return matchesGenres && matchesPlatforms;
    })
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