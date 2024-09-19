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

  closeMenu(): void{
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');

    if (navLinks?.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger?.classList.remove('active');
    }
  }

  //GIVES AN ERROR
  // ngAfterViewInit(): void {
  //   const links = document.querySelectorAll('.nav-links a');
  //   links.forEach(link => {
  //     link.addEventListener('click', () => {
  //       this.closeMenu();
  //     });
  //   });
  // }
}
