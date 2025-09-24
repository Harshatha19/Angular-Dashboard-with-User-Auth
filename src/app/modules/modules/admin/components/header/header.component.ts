import { Component, OnInit } from '@angular/core';
import { AuthServiceService, User } from 'src/app/services/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<User | null>;
  currentUser: User | null = null;
  showLogoutConfirmation = false;

  constructor(private authservice: AuthServiceService) {
    this.currentUser$ = this.authservice.currentUser$;
  }

  ngOnInit(): void {
    // Subscribe to current user changes
    this.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  showLogoutDialog(): void {
    this.showLogoutConfirmation = true;
  }

  onLogoutConfirmed(): void {
    this.showLogoutConfirmation = false;
    this.authservice.logOut();
  }

  onLogoutCancelled(): void {
    this.showLogoutConfirmation = false;
  }

  logOut(): void {
    // Simple direct logout for now
    if (confirm('Are you sure you want to logout?')) {
      this.authservice.logOut();
    }
  }
}
