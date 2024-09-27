import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Game } from '../game';
import { FavoriteService } from '../favorite.service';
import { OwnedService } from '../owned.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent implements OnInit{
  @Input() game!: Game;
  @Input() isFavorite: boolean = false;
  @Input() isOwned: boolean = false;
  @Input() isCurrently: boolean = false;

  @Output() favoriteChange = new EventEmitter<boolean>();
  @Output() ownedChange = new EventEmitter<boolean>();
  @Output() currentlyChange = new EventEmitter<boolean>();

  constructor(public favoriteService: FavoriteService, public ownedService: OwnedService) {}

  ngOnInit(): void {
    this.isOwned = this.ownedService.isOwned(this.game);
    this.isCurrently = this.ownedService.isCurrently(this.game);
  }

  onFavoriteToggle() {
    this.isFavorite = !this.isFavorite;
    this.favoriteChange.emit(this.isFavorite);
  }

  onOwnedToggle() {
    this.isOwned = !this.isOwned;
    this.ownedChange.emit(this.isOwned);
  }

  onCurrentlyToggle(){
    this.isCurrently = !this.isCurrently;
    this.currentlyChange.emit(this.isCurrently);
  }
}
