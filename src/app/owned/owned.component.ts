import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../game';
import { OwnedService } from '../owned.service';

@Component({
  selector: 'app-owned',
  templateUrl: './owned.component.html',
  styleUrl: './owned.component.css'
})

export class OwnedComponent {

  @Input() isOwned: boolean = true;
  @Input() isCurrently: boolean = true;
  @Input() isPlayed: boolean = true;
  @Output() ownedChange = new EventEmitter<boolean>();
  @Output() currentlyChange = new EventEmitter<boolean>();
  @Output() playedChange = new EventEmitter<boolean>();

  constructor(){}

  addToMyGames(): void{
    console.log("owned");
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