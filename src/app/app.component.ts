import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Game Vault';


  toggleMenu(): void{
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    
    navLinks?.classList.toggle('active');
    hamburger?.classList.toggle('active');
  }
}
