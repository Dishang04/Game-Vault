import { Injectable } from '@angular/core';
import { Game } from './game';
import { GameService } from './game.service';
import { UserService } from './user.service';
import { UserStorageService } from './user-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OwnedService {
  private ownedGames: Game[] = [];
  private wishlistGames: Game[] = [];
  private playingGames: Game[] = [];
  private playedGames: Game[] = [];
  userData: any;

  constructor(
    private gameService: GameService, 
    private userService: UserService, 
    private userStorageService: UserStorageService,
    private http: HttpClient,
    private router: Router
  ) {}

  //MY GAMES
  addToMyGames(game: Game): void{
    console.log("test");
    if(!this.isOwned(game)){
      const user = this.userStorageService.getUser();

      this.ownedGames.push(game);
      this.removeFromWishlist(game);

      const gameData = {
        user_id: user.id,
        game_id: game.id
      }


      this.http.post('http://localhost:8001/addmygame', gameData).subscribe(
        (response: any) => {
          console.log('User data retrieved successfully:', response);
          this.ownedGames = response;
        },
        (error) => {
          console.error('Error fetching owned games data:', error);
        }
      );

      // toevoegen aan backend /addmygame met game info
    }
  }

  removeFromMyGames(game: Game): void{
    this.ownedGames = this.ownedGames.filter(g => g.id !== game.id);
  }

  isOwned(game: Game): boolean{
    return this.ownedGames.some(g => g.id === game.id);
  }

  getOwnedGames(): Game[]{
    const user = this.userStorageService.getUser();
    
    this.http.post('http://localhost:8001/mygames', { email: user.email }).subscribe(
      (response: any) => {
        console.log('User data retrieved successfully:', response);
        this.ownedGames = response;
      },
      (error) => {
        console.error('Error fetching owned games data:', error);
      }
    );
    return this.ownedGames;
  }


//  //WISHLIST
  addToWishlist(game: Game): void{
    if(!this.isInWishlist(game)){
    //   this.wishlistGames.push(game);

  // toevoegen aan backend /addwishlist
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