import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-owned',
  templateUrl: './owned.component.html',
  styleUrl: './owned.component.css'
})
export class OwnedComponent {
  @Input() isAdded: boolean = true;
  @Output() addedChange = new EventEmitter<boolean>();

  isMyGamesAdded: boolean = false;
  isCurrentlyPlayingAdded: boolean = false;
  isPlayedGamesAdded: boolean = false;

  constructor(){}

  toggleList(list: string): void {
    switch (list) {
      case 'myGames':
        this.isMyGamesAdded = !this.isMyGamesAdded;
        break;
      case 'currentlyPlaying':
        this.isCurrentlyPlayingAdded = !this.isCurrentlyPlayingAdded;
        break;
      case 'playedGames':
        this.isPlayedGamesAdded = !this.isPlayedGamesAdded;
        break;
      default:
        break;
    }
  }

  addToMyGames(): void {
    this.toggleList('myGames');
    console.log('Toggled My games');
  }

  addToCurrentlyPlaying(): void {
    this.toggleList('currentlyPlaying');
    console.log('Toggled Currently playing');
  }

  addToPlayedGames(): void {
    this.toggleList('playedGames');
    console.log('Toggled Played games');
  }

  // onClick(): void{
  //   this.isAdded = !this.isAdded;
  //   this.addedChange.emit(this.isAdded);
  //   console.log('click test');
  // }

  // addToCurrentlyPlaying(): void{
  //   console.log("currently playing");
  // }

  // addToPlayedGames(): void{
  //   console.log("played games");
  // }

  // addToMyGames(): void{
  //   console.log("my playing");
  // }

  // addToNewCollection(): void{
  //   console.log("new collection");
  // }
}
