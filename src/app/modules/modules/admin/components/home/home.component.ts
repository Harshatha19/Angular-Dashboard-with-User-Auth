import { Component, OnInit } from '@angular/core';
import { AuthServiceService, User } from 'src/app/services/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser$: Observable<User | null>;
  currentUser: User | null = null;
  currentTime: string = '';

  constructor(private authService: AuthServiceService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Set current time
    this.currentTime = new Date().toLocaleString();
  }

  logOut(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logOut();
    }
  }
}
