import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  games: Game[] = [];

  constructor(private gameService: GameService){}
  ngOnInit(): void{
    this.getGames();
  }

  getGames(): void{
    this.gameService.getGames().subscribe(games => this.games = games.slice(1, 5));
  }
}
