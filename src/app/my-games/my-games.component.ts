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
  filteredGames: Game[] = [];
  selectedGenres: string[] = [];
  selectedPlatforms: string[] = [];
  selectedModes: string[] = [];

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

  modeFilterChange(selectedModes: string[]): void{
    if(selectedModes.includes('all') || selectedModes.length === 0){
      this.selectedModes = [];
    }
    else{
      this.selectedModes = selectedModes;
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
      const matchesModes = this.selectedModes.length === 0 || this.selectedModes.some(mode => game.modes.toLowerCase().includes(mode.toLowerCase()));
      const matchesPlatforms = this.selectedPlatforms.length === 0 || this.selectedPlatforms.some(platform => game.platform.toLowerCase().includes(platform.toLowerCase()));

      return matchesGenres && matchesModes && matchesPlatforms;
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