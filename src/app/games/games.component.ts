import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
// import { GAMES } from '../mock-games';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService) { }

  getGames(): void {
    this.gameService.getGames().subscribe(games => this.games = games);
  }

  ngOnInit(): void {
    this.getGames();
  }


  // games: Game[] = [];

  // constructor(private gameService: GameService){}

  // getGames(): void{
  //   this.gameService.getGames().subscribe(games => this.games = games);
  // }

  // ngOnInit(): void{
  //   this.getGames();
  // }
}
