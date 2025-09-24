import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private sessionTimeoutMinutes = 30; // 30 minutes timeout
    private warningTimeoutMinutes = 5; // Show warning 5 minutes before timeout
    private sessionTimer?: Subscription;
    private lastActivity = Date.now();

    private sessionWarningSubject = new BehaviorSubject<boolean>(false);
    public sessionWarning$ = this.sessionWarningSubject.asObservable();

    constructor(private authService: AuthServiceService) {
        this.setupActivityListeners();
    }

    startSession(): void {
        this.lastActivity = Date.now();
        this.startSessionTimer();
    }

    endSession(): void {
        this.stopSessionTimer();
        this.authService.logOut();
    }

    refreshSession(): void {
        this.lastActivity = Date.now();
        this.sessionWarningSubject.next(false);
    }

    private setupActivityListeners(): void {
        // Listen for user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

        events.forEach(event => {
            document.addEventListener(event, () => {
                this.refreshSession();
            }, true);
        });
    }

    private startSessionTimer(): void {
        this.stopSessionTimer();

        this.sessionTimer = interval(60000).subscribe(() => { // Check every minute
            const now = Date.now();
            const timeSinceLastActivity = now - this.lastActivity;
            const timeoutMillis = this.sessionTimeoutMinutes * 60 * 1000;
            const warningMillis = this.warningTimeoutMinutes * 60 * 1000;

            if (timeSinceLastActivity >= timeoutMillis) {
                // Session expired
                this.endSession();
            } else if (timeSinceLastActivity >= (timeoutMillis - warningMillis)) {
                // Show warning
                this.sessionWarningSubject.next(true);
            }
        });
    }

    private stopSessionTimer(): void {
        if (this.sessionTimer) {
            this.sessionTimer.unsubscribe();
            this.sessionTimer = undefined;
        }
    }

    getSessionInfo(): {
        lastActivity: Date,
        timeUntilTimeout: number,
        isWarning: boolean
    } {
        const now = Date.now();
        const timeSinceLastActivity = now - this.lastActivity;
        const timeoutMillis = this.sessionTimeoutMinutes * 60 * 1000;
        const warningMillis = this.warningTimeoutMinutes * 60 * 1000;

        return {
            lastActivity: new Date(this.lastActivity),
            timeUntilTimeout: Math.max(0, timeoutMillis - timeSinceLastActivity),
            isWarning: timeSinceLastActivity >= (timeoutMillis - warningMillis)
        };
    }
}
