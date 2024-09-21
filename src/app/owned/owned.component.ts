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
  @Output() ownedChange = new EventEmitter<boolean>();

  constructor(){}

  onClick(): void{
    this.isOwned = !this.isOwned;
    this.ownedChange.emit(this.isOwned);
    console.log("test");
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
