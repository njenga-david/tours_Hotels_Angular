import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface User {
  username: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  login(): void {
    // Basic validation
    if (!this.username || !this.password) {
      this.loginError = 'Username and password are required.';
      return;
    }

    // Fetch users from users.json
    this.http.get<User[]>('/assets/users.json').subscribe(
      (users: User[]) => {
        const foundUser = users.find(user => user.username === this.username && user.password === this.password);

        if (foundUser) {
          console.log('Login successful');
          localStorage.setItem('currentUser', JSON.stringify(foundUser));
          
          // Redirect based on user role
          if (foundUser.username === 'admin' && foundUser.password === 'admin123') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        } else {
          console.error('Login failed');
          this.loginError = 'Invalid username or password.';
        }
      },
      error => {
        console.error('Failed to fetch users:', error);
        this.loginError = 'Failed to login. Please try again later.';
      }
    );
  }
}
