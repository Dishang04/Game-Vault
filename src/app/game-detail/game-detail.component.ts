import { Component, Input } from '@angular/core';
import { Game } from '../game';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent {
  @Input() game?: Game;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location
  ){}

  ngOnInit(): void{
    this.getGame();
  }

  getGame(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGame(id).subscribe(game => this.game = game);
  }

  goBack(): void{
    this.location.back();
  }
}
