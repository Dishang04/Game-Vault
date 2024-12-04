import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  getUser(): any {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to get user data from localStorage:", error);
      return null;
    }
  }

  setUser(user: any): void {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Failed to set user data in localStorage:", error);
    }
  }

  removeUser(): void {
    try {
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Failed to remove user data from localStorage:", error);
    }
  }
}