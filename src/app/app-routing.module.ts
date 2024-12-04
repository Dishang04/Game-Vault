import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CurrentlyPlayingComponent } from './currently-playing/currently-playing.component';
import { PlayedGamesComponent } from './played-games/played-games.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'games', component: GamesComponent},
  {path: 'detail/:id', component: GameDetailComponent},
  {path: 'my-games', component: MyGamesComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'currently-playing', component: CurrentlyPlayingComponent},
  {path: 'played-games', component: PlayedGamesComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
