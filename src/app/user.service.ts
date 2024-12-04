import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = null;

  setUserData(user: any) {
    this.userData = user;
  }

  getUserData() {
    return this.userData;
  }
}