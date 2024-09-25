import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../game';
import { OwnedService } from '../owned.service';

@Component({
  selector: 'app-owned',
  templateUrl: './owned.component.html',
  styleUrl: './owned.component.css'
})

export class OwnedComponent {
  @Input() game!: Game;
  @Input() isOwned: boolean = false;
  @Input() isWishlist: boolean = false;
  @Input() isCurrently: boolean = false;
  @Input() isPlayed: boolean = false;
  @Output() ownedChange = new EventEmitter<boolean>();
  @Output() currentlyChange = new EventEmitter<boolean>();
  @Output() playedChange = new EventEmitter<boolean>();

  constructor(private ownedService: OwnedService){}

  addToMyGames(): void{
    this.isOwned = !this.isOwned;
    this.ownedChange.emit(this.isOwned);
  }

  addToCurrentlyPlaying(): void{
    console.log("currently");
    this.isCurrently = !this.isCurrently;
    this.currentlyChange.emit(this.isCurrently);
  }

  addToPlayedGames(): void{
    console.log("played");
    this.isPlayed = !this.isPlayed;
    this.playedChange.emit(this.isPlayed);

  }


  // STILL NEEDS FIGURING OUT 
  // addToMyGames(): void{
  //   this.ownedService.addToMyGames(this.game);
  //   this.isOwned = true;
  // }

  // addToCurrentlyPlaying(): void{
  //   this.ownedService.addToCurrentlyPlaying(this.game);
  // }

  // addToPlayedGames(): void{
  //   this.ownedService.addToPlayedGames(this.game);
  // }
}