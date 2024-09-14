import { Injectable } from '@angular/core';
import { Game } from './game';
// import { GAMES } from './mock-games';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'https://api.rawg.io/api/games';
  private apiKey = '2833eb31ce294862b579de3865c53e42';

  constructor(private http: HttpClient) {}


  // GETS THE GAMES FOR GAME PAGE
  getGames(): Observable<Game[]>{
    const params = new HttpParams().set('key', this.apiKey);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => response.results.map((game: any) => ({
        id: game.id,
        name: game.name,
        description: game.description_raw,
        released: game.released,
        platform: game.platforms.map((p: any) => p.platform.name).join(', '),
        modes: game.tags.map((tag: any) => tag.name).filter((name: string) => 
          name === 'Single-player' || name === 'Multiplayer').join(', '),
        genres: game.genres.map((genre: any) => genre.name).join(', '),
        image: game.background_image,
      })))
    );
  }

  // GETS THE DETAILS FOR GAME DETAIL PAGE
  getGame(id: number): Observable<Game> {
    const params = new HttpParams().set('key', this.apiKey);
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<any>(url, { params }).pipe(
      map(game => ({
        id: game.id,
        name: game.name,
        description: game.description_raw,
        released: game.released,
        platform: game.platforms.map((p: any) => p.platform.name).join(', '),
        modes: game.tags.map((tag: any) => tag.name).filter((name: string) => 
          name === 'Singleplayer' || name === 'Multiplayer').join(', '),
        genres: game.genres.map((genre: any) => genre.name).join(', '),
        image: game.background_image,
      }))
    );
  }


  /* GET heroes whose name contains search term */
  // searchGames(term: string): Observable<Game[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Game[]>(`${this.heroesUrl}/?name=${term}`).pipe(
  //     tap(x => x.length ?
  //       this.log(`found games matching "${term}"`) :
  //       this.log(`no games matching "${term}"`)),
  //     catchError(this.handleError<Game[]>('searchGames', []))
  //   );
  // }
}
