import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  username: string;
  password: string;
  role: string; // You can define roles like 'user' or 'admin'
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  registrationError: string = '';

  constructor(private http: HttpClient) {}

  register(): void {
    // Basic validation
    if (!this.username || !this.password || !this.confirmPassword) {
      this.registrationError = 'All fields are required.';
      return;
    }

    // Passwords matching validation
    if (this.password !== this.confirmPassword) {
      this.registrationError = 'Passwords do not match.';
      return;
    }

    // Prepare user data
    const newUser: User = {
      username: this.username,
      password: this.password,
      role: 'user' // Default role for registered users
    };

    // Save user to users.json
    this.http.get<User[]>('/assets/users.json').subscribe(
      (users: User[]) => {
        const updatedUsers = [...users, newUser];
        this.http.put('/assets/users.json', updatedUsers).subscribe(
          () => {
            console.log('User registered successfully:', newUser);
            // Optionally, navigate to login page or handle success/failure
          },
          error => {
            console.error('Failed to save user:', error);
            this.registrationError = 'Failed to register. Please try again later.';
          }
        );
      },
      error => {
        console.error('Failed to fetch users:', error);
        this.registrationError = 'Failed to register. Please try again later.';
      }
    );

    // Clear form fields after successful registration
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.registrationError = '';
  }
}
