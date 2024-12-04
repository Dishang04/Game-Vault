import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user'; 
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private http: HttpClient, 
    private router: Router,
    private userService: UserService
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const user: User = form.value;
      console.log("Form daga:", user);
      
      this.http.post('http://localhost:8001/new_user', user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(
        (response) => {
          console.log('User registered successfully:', response);

          this.userService.setUserData(user);
          this.router.navigate(['/games']);
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }
}