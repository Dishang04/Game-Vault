import { Injectable } from '@angular/core';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class OwnedService {
  private ownedGames: Game[] = [];
  private wishlistGames: Game[] = [];
  private playingGames: Game[] = [];
  private playedGames: Game[] = [];

  constructor() { }

  //MY GAMES
  addToMyGames(game: Game): void{
    if(!this.isOwned(game)){
      this.ownedGames.push(game);
      this.removeFromWishlist(game);
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


  //WISHLIST
  addToWishlist(game: Game): void{
    if(!this.isInWishlist(game)){
      this.wishlistGames.push(game);
    }
  }

  removeFromWishlist(game: Game): void{
    this.wishlistGames = this.wishlistGames.filter(g => g.id !== game.id);
  }

  isInWishlist(game: Game): boolean{
    return this.wishlistGames.some(g => g.id === game.id);
  }

  getWishlistGames(): Game[]{
    return this.wishlistGames;
  }


  //CURRENTLY PLAYING
  addToCurrentlyPlaying(game: Game): void{
    if(!this.isCurrently(game)){
      this.playingGames.push(game);
    }
  }
  
  removeFromCurrentlyPlaying(game: Game): void{
    this.playingGames = this.playingGames.filter(g => g.id !== game.id);
  }

  isCurrently(game: Game): boolean{
    return this.playingGames.some(g => g.id === game.id);
  }

  getCurrentlyPlaying(): Game[]{
    return this.playingGames;
  }


  
  //FINISHED GAMES
  addToPlayedGames(game: Game): void{
    if(!this.isPlayed(game)){
      this.playedGames.push(game);
    }
  }

  removeFromPlayedGames(game: Game): void{
    this.playedGames = this.playedGames.filter(g => g.id !== game.id);
  }

  isPlayed(game: Game): boolean{
    return this.playedGames.some(g => g.id === game.id);
  }

  getPlayedGames(): Game[]{
    return this.playedGames;
  }
}