import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  email: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router, private injector: Injector) {
    // Check if user is already logged in on service initialization
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.getToken();
    const userData = this.getUserData();

    if (token && userData) {
      this.currentUserSubject.next(userData);
    }
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUserData(user: User): void {
    localStorage.setItem('userData', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getUserData(): User | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const userData = this.getUserData();
    return !!(token && userData);
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

  // Enhanced login method with multiple user support
  login({ email, password }: any): Observable<any> {
    // Simulate multiple users for demo purposes
    const users = [
      { email: 'admin@gmail.com', password: 'admin@123', name: 'Admin User', role: 'admin' },
      { email: 'user@gmail.com', password: 'user@123', name: 'Regular User', role: 'user' },
      { email: 'manager@gmail.com', password: 'manager@123', name: 'Manager User', role: 'manager' }
    ];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const userData: User = {
        name: user.name,
        email: user.email,
        role: user.role
      };

      // Generate a simple token (in real app, this would come from server)
      const token = btoa(email + ':' + Date.now());

      this.setToken(token);
      this.setUserData(userData);

      console.log('Login successful, userData:', userData); // Debug log
      return of(userData);
    }

    return throwError(new Error('Invalid credentials. Please check your email and password.'));
  }

  // Method to automatically redirect based on authentication status
  redirectBasedOnAuth(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
