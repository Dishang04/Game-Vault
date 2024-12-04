import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { UserService } from '../user.service';
import { UserStorageService } from '../user-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  games: Game[] = [];
  firstname: string = '';
  isLoggedIn: boolean = false; 
  // firstname: string | null = null;
  userData: any;

  constructor(
    private gameService: GameService, 
    private userService: UserService, 
    private userStorageService: UserStorageService,
    private http: HttpClient,
    private router: Router
  ){}

  ngOnInit(): void{
    this.getGames();
    const user = this.userStorageService.getUser();

    if (user) {
      this.isLoggedIn = true;

      this.getUserData(user.email)
    }
  }


  // Moet misschien op meer paginas bereikbaar zijn.
  getUserData(email: string): void {
    this.http.post('http://localhost:8000/user', { email: email }).subscribe(
      (response: any) => {
        console.log('User data retrieved successfully:', response);
        this.userData = response;
        this.firstname = this.userData.firstname;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.router.navigate(['/dashboard']); 
      }
    );
  }

  getGames(): void{
    this.gameService.getGames().subscribe(games => this.games = games.slice(1, 5));
  }

  logout(){
    this.userStorageService.removeUser();
    window.location.reload();
  }
}
