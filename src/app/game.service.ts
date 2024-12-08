import { Injectable } from '@angular/core';
import { Game } from './game';
// import { GAMES } from './mock-games';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'https://api.rawg.io/api/games';
  private apiKey = '2833eb31ce294862b579de3865c53e42';

  constructor(private http: HttpClient) {}


  // GETS THE GAMES FOR GAME PAGE
  getGames(query: string = ''): Observable<Game[]>{
    
    //SHOWS THE SEARCH RESULTS 
    let params = new HttpParams().set('key', this.apiKey);
    if(query){
      params = params.set('page_size', '10').set('page', 1).set('search', query);
    }
    console.log('API Params:', params.toString());

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => response.results.map((game: any) => ({
        game_id: game.id,
        name: game.name,
        // description: game.description_raw,
        // released: game.released,
        platform: game.platforms.map((p: any) => p.platform.name).join(', '),
        modes: game.tags.map((tag: any) => tag.name).filter((name: string) => 
          name === 'Singleplayer' || name === 'Multiplayer').join(', '),
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
      tap(console.log),
      map(game => ({
        game_id: game.id,
        name: game.name,
        description: game.description_raw || game.description,
        // description: game.description,
        released: game.released,
        platform: game.platforms.map((p: any) => p.platform.name).join(', '),
        modes: game.tags.map((tag: any) => tag.name).filter((name: string) => 
          name === 'Singleplayer' || name === 'Multiplayer').join(', '),
        genres: game.genres.map((genre: any) => genre.name).join(', '),
        developers: game.developers.map((developer: any) => developer.name).join(', '),
        publishers: game.publishers.map((publisher: any) => publisher.name).join(', '),
        image: game.background_image,
      }))
    );
  }

  getGameDetailsById(gameId: number): Observable<Game> {
    const params = new HttpParams().set('key', this.apiKey);
    const url = `${this.apiUrl}/${gameId}`;
  
    return this.http.get<any>(url, { params }).pipe(
      map(game => ({
        game_id: game.id,
        name: game.name,
        description: game.description_raw || game.description,
        released: game.released,
        platform: game.platforms.map((p: any) => p.platform.name).join(', '),
        modes: game.tags.map((tag: any) => tag.name).filter((name: string) => 
          name === 'Singleplayer' || name === 'Multiplayer').join(', '),
        genres: game.genres.map((genre: any) => genre.name).join(', '),
        developers: game.developers.map((developer: any) => developer.name).join(', '),
        publishers: game.publishers.map((publisher: any) => publisher.name).join(', '),
        image: game.background_image,
      }))
    );
  }
}
