import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'practiceDash';

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check authentication status on app initialization
    this.checkAuthenticationStatus();
  }

  private checkAuthenticationStatus(): void {
    // If user is authenticated and on login page, redirect to admin
    if (this.authService.isAuthenticated() && this.router.url.includes('/login')) {
      this.router.navigate(['/admin']);
    } else if (!this.authService.isAuthenticated() && !this.router.url.includes('/login') && !this.router.url.includes('/forgot-password')) {
      // If user is not authenticated and not on login/forgot-password page, redirect to login
      this.router.navigate(['/login']);
    }
  }
}
