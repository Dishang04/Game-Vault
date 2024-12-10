// import { Injectable } from '@angular/core';
// import { Game } from './game';

// @Injectable({
//   providedIn: 'root'
// })
// export class FavoriteService {
//   private favoriteGames: Game[] = [];

//   constructor() { }

//   addFavorite(game: Game): void{
//     if(!this.isFavorite(game)){
//       this.favoriteGames.push(game);
//     }
//   }

//   removeFavorite(game: Game): void{
//     this.favoriteGames = this.favoriteGames.filter(g => g.game_id !== game.game_id);
//   }

//   isFavorite(game: Game): boolean{
//     return this.favoriteGames.some(g => g.game_id === game.game_id);
//   }

//   getFavoriteGames(): Game[]{
//     return this.favoriteGames;
//   }
// }

import { Injectable } from '@angular/core';
import { Game } from './game';
import { GameService } from './game.service';
import { UserService } from './user.service';
import { UserStorageService } from './user-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteGames: Game[] = [];

  constructor(
    private gameService: GameService, 
    private userService: UserService, 
    private userStorageService: UserStorageService,
    private http: HttpClient,
  ) { }

  addFavorite(game: Game): void{
    if(!this.isFavorite(game)){
      // this.favoriteGames.push(game);
      const user = this.userStorageService.getUser();
      this.favoriteGames.push(game);

      const gameData = {
        user_id: user.id,
        game_id: game.game_id
      }

      this.http.post('http://localhost:8000/addwishlist', gameData).subscribe(
        (response: any) => {
          console.log('User data retrieved successfully:', response);
          this.favoriteGames = Array.isArray(response) ? response : []; 
        },
        (error) => {
          console.error('Error fetching owned games data:', error);
          this.favoriteGames = [];
        }
      );
    }
  }

  removeFavorite(game: Game): void{
    this.favoriteGames = this.favoriteGames.filter(g => g.game_id !== game.game_id);
  }

  isFavorite(game: Game): boolean{
    return this.favoriteGames.some(g => g.game_id === game.game_id);
  }

  getFavoriteGames(): Observable<Game[]>{
    // return this.favoriteGames;
    const user = this.userStorageService.getUser();
    return this.http.post<Game[]>('http://localhost:8000/mywishlist', { email: user.email });
  }
}

