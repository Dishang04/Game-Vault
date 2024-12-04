import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Game } from '../game';
import { OwnedService } from '../owned.service';

@Component({
  selector: 'app-owned',
  templateUrl: './owned.component.html',
  styleUrl: './owned.component.css'
})

export class OwnedComponent{
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
    console.log("myGames");
    this.isOwned = !this.isOwned;
    this.ownedChange.emit(this.isOwned);

    if(this.isOwned){
      this.ownedService.addToMyGames(this.game);
    }
    else{
      this.ownedService.removeFromMyGames(this.game);
    }
  }

  addToCurrentlyPlaying(): void{
    console.log("currently");
    this.isCurrently = !this.isCurrently;
    this.currentlyChange.emit(this.isCurrently);

    if(this.isCurrently){
      this.ownedService.addToCurrentlyPlaying(this.game);
    }
    else{
      this.ownedService.removeFromCurrentlyPlaying(this.game);
    }
  }

  addToPlayedGames(): void{
    console.log("played");
    this.isPlayed = !this.isPlayed;
    this.playedChange.emit(this.isPlayed);

    if(this.isPlayed){
      this.ownedService.addToPlayedGames(this.game);
    }
    else{
      this.ownedService.removeFromPlayedGames(this.game);
    }
  }
}