import { Injectable } from '@angular/core';
import { Game } from './game';
import { GameService } from './game.service';
import { UserService } from './user.service';
import { UserStorageService } from './user-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, tap } from 'rxjs';

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
        game_id: game.game_id
      }

      this.http.post('http://localhost:8000/addmygame', gameData).subscribe(
        (response: any) => {
          console.log('User data retrieved successfully:', response);
          // this.ownedGames = response;
          this.ownedGames = Array.isArray(response) ? response : []; // Ensure it's an array
        },
        (error) => {
          console.error('Error fetching owned games data:', error);
          this.ownedGames = [];
        }
      );

      // toevoegen aan backend /addmygame met game info
    }
  }

  removeFromMyGames(game: Game): void{
    this.ownedGames = this.ownedGames.filter(g => g.game_id !== game.game_id);
  }

  isOwned(game: Game): boolean{
    // return this.ownedGames.some(g => g.id === game.id);
    if (!Array.isArray(this.ownedGames)) {
      console.error('ownedGames is not an array:', this.ownedGames);
      return false;
    }
    return this.ownedGames.some(g => g.game_id === game.game_id);
  }

  getOwnedGames(): Observable<Game[]>{
    const user = this.userStorageService.getUser();
    
    return this.http.post<Game[]>('http://localhost:8000/mygames', { email: user.email });
  }

  getDetailedGameInfo(gameId: number): Observable<Game> {
    return this.gameService.getGameDetailsById(gameId);
  }


//  //WISHLIST
  addToWishlist(game: Game): void{
    if(!this.isInWishlist(game)){
    //   this.wishlistGames.push(game);

  // toevoegen aan backend /addwishlist
    }
  }

  removeFromWishlist(game: Game): void{
    this.wishlistGames = this.wishlistGames.filter(g => g.game_id !== game.game_id);
  }

  isInWishlist(game: Game): boolean{
    return this.wishlistGames.some(g => g.game_id === game.game_id);
  }

  getWishlistGames(): Game[]{
    return this.wishlistGames;
  }


  //CURRENTLY PLAYING
  addToCurrentlyPlaying(game: Game): void{
    if(!this.isCurrently(game)){
      // this.playingGames.push(game);

      const user = this.userStorageService.getUser();

      this.playingGames.push(game);
      // this.removeFromWishlist(game);

      const gameData = {
        user_id: user.id,
        game_id: game.game_id
      }

      this.http.post('http://localhost:8000/addcurrently', gameData).subscribe(
        (response: any) => {
          console.log('User data retrieved successfully:', response);
          // this.ownedGames = response;
          this.playingGames = Array.isArray(response) ? response : []; // Ensure it's an array
        },
        (error) => {
          console.error('Error fetching owned games data:', error);
          this.playingGames = [];
        }
      );
    }
  }
  
  removeFromCurrentlyPlaying(game: Game): void{
    this.playingGames = this.playingGames.filter(g => g.game_id !== game.game_id);
  }

  isCurrently(game: Game): boolean{
    return this.playingGames.some(g => g.game_id === game.game_id);
  }

  getCurrentlyPlaying(): Observable<Game[]>{
    // return this.playingGames;
    const user = this.userStorageService.getUser();
    
    return this.http.post<Game[]>('http://localhost:8000/mycurrent', { email: user.email });
  }

  
  //FINISHED GAMES
  // addToPlayedGames(game: Game): void{
  //   if(!this.isPlayed(game)){
  //     this.playedGames.push(game);
  //   }
  // }

  //I THINK THIS IS RIGHT FUNCTION NOW
  addToPlayedGames(game: Game): void{
    if(!this.isPlayed(game)){
      // this.playingGames.push(game);

      const user = this.userStorageService.getUser();

      this.playedGames.push(game);

      const gameData = {
        user_id: user.id,
        game_id: game.game_id
      }

      this.http.post('http://localhost:8000/addfinished', gameData).subscribe(
        (response: any) => {
          console.log('User data retrieved successfully:', response);
          // this.ownedGames = response;
          this.playedGames = Array.isArray(response) ? response : []; // Ensure it's an array
        },
        (error) => {
          console.error('Error fetching owned games data:', error);
          this.playedGames = [];
        }
      );
    }
  }

  removeFromPlayedGames(game: Game): void{
    this.playedGames = this.playedGames.filter(g => g.game_id !== game.game_id);
  }

  isPlayed(game: Game): boolean{
    return this.playedGames.some(g => g.game_id === game.game_id);
  }

  getPlayedGames(): Observable<Game[]>{
    // return this.playedGames;
    const user = this.userStorageService.getUser();
    
    return this.http.post<Game[]>('http://localhost:8000/myfinished', { email: user.email });
  }
}