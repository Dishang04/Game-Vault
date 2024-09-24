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
  @Input() isOwned: boolean = true;
  @Input() isWishlist: boolean = false;
  @Input() isCurrently: boolean = true;
  @Input() isPlayed: boolean = true;
  @Output() ownedChange = new EventEmitter<boolean>();
  @Output() currentlyChange = new EventEmitter<boolean>();
  @Output() playedChange = new EventEmitter<boolean>();

  constructor(private ownedService: OwnedService){}

  addToMyGames(): void{
    if(!this.isOwned){
      this.isOwned = false;
      this.ownedService.removeFromMyGames(this.game);
      console.log("game removed from my games");
    }
    else{
      this.isOwned = true;
      this.ownedService.addToMyGames(this.game);
      console.log("game added to my games");
    }

    this.ownedChange.emit(this.isOwned);

    if(this.isWishlist){
      this.ownedService.removeFromWishlist(this.game);
    }
   
    // this.isOwned = !this.isOwned;
    // this.ownedChange.emit(this.isOwned);
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