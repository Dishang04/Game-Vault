import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import {MatTabsModule} from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule} from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';

import { FormsModule } from '@angular/forms';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameSearchComponent } from './game-search/game-search.component';

import { HttpClientModule } from '@angular/common/http';
import { FavoriteComponent } from './favorite/favorite.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { OwnedComponent } from './owned/owned.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CurrentlyPlayingComponent } from './currently-playing/currently-playing.component';
import { PlayedGamesComponent } from './played-games/played-games.component';
import { GameCardComponent } from './game-card/game-card.component';
import { MyGameCardComponent } from './my-game-card/my-game-card.component';
import { PlatformOptionsComponent } from './platform-options/platform-options.component';
import { AllGamesComponent } from './all-games/all-games.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GameDetailComponent,
    DashboardComponent,
    GameSearchComponent,
    FavoriteComponent,
    MyGamesComponent,
    OwnedComponent,
    WishlistComponent,
    CurrentlyPlayingComponent,
    PlayedGamesComponent,
    GameCardComponent,
    MyGameCardComponent,
    PlatformOptionsComponent,
    AllGamesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatMenuModule,
    MatTabsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync('noop'),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
