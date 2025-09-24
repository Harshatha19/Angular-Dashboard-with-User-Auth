import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
    providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {

    constructor(
        private authService: AuthServiceService,
        private router: Router
    ) { }

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            // If user is already logged in, redirect to admin dashboard
            this.router.navigate(['/admin']);
            return false;
        }
        return true;
    }
}
