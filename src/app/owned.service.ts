import { Injectable } from '@angular/core';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class OwnedService {
  private ownedGames: Game[] = [];
  private playingGames: Game[] = [];
  private playedGames: Game[] = [];

  constructor() { }

  addToMyGames(game: Game): void{
    if(!this.isOwned(game)){
      this.ownedGames.push(game);
    }
  }

  removeFromMyGames(game: Game): void{
    this.ownedGames = this.ownedGames.filter(g => g.id !== game.id);
  }

  isOwned(game: Game): boolean{
    return this.ownedGames.some(g => g.id === game.id);
  }

  getOwnedGames(): Game[]{
    return this.ownedGames;
  }



// STILL NEEDS FIGURING OUT

  addToCurrentlyPlaying(game: Game): void{
    if(!this.isPlaying(game)){
      this.playingGames.push(game);
    }
  }

  addToPlayedGames(game: Game): void{
    if(!this.isPlayed(game)){
      this.playedGames.push(game);
    }
  }



  isPlaying(game: Game): boolean{
    return this.playingGames.some(g => g.id === game.id);
  }

  isPlayed(game: Game): boolean{
    return this.playedGames.some(g => g.id === game.id);
  }

  getCurrentlyPlayingGames(): Game[]{
    return this.playingGames;
  }

  getPlayedGames(): Game[]{
    return this.playedGames;
  }
}