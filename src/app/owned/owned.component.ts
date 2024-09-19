import { Component } from '@angular/core';

@Component({
  selector: 'app-owned',
  templateUrl: './owned.component.html',
  styleUrl: './owned.component.css'
})
export class OwnedComponent {
  constructor(){}

  addToCurrentlyPlaying(): void{
    console.log("currently playing");
  }

  addToPlayedGames(): void{
    console.log("played games");
  }

  addToMyGames(): void{
    console.log("my playing");
  }

  addToNewCollection(): void{
    console.log("new collection");
  }
}
