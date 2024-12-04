import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from '../user-storage.service';
import { UserService } from '../user.service';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private userStorageService: UserStorageService,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      const body = new HttpParams()
        .set('username', email)
        .set('password', password);

      this.http.post('http://localhost:8001/token', body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }).subscribe(
        (response: any) => {
        console.log("succesful response");
        localStorage.setItem('accessToken', response.access_token);

          this.http.post('http://localhost:8001/user', { email: email }).subscribe(
            (user: any) => {
              this.userStorageService.setUser(user);
              this.userService.setUserData(user);
              console.log(user)
              this.router.navigate(['/games']);
            },
            (error) => {
              this.errorMessage = 'Error retrieving user data.';
              console.error(error);
            }
          );
        },
        (error) => {
          this.errorMessage = 'Invalid email or password.';
          console.error(error);
        }
      );
    }
  }
}