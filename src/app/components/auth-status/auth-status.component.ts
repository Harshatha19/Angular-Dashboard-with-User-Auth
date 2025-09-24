import { Component, OnInit } from '@angular/core';
import { AuthServiceService, User } from 'src/app/services/auth-service.service';

@Component({
    selector: 'app-auth-status',
    template: `
    <div class="card mb-3 border-left-primary" *ngIf="showStatus">
      <div class="card-body py-2">
        <h6 class="card-title mb-2">
          <i class="fas fa-shield-alt"></i> Authentication Status
        </h6>
        <div *ngIf="isAuthenticated; else notAuthenticated">
          <div class="d-flex align-items-center mb-2">
            <span class="badge badge-success mr-2">
              <i class="fas fa-check-circle"></i> Authenticated
            </span>
            <small class="text-muted">Session Active</small>
          </div>
          <div class="small text-dark">
            <strong>User:</strong> {{ currentUser?.name }}<br>
            <strong>Email:</strong> {{ currentUser?.email }}<br>
            <strong>Role:</strong> <span class="badge badge-info badge-sm">{{ currentUser?.role || 'user' }}</span><br>
            <strong>Token:</strong> <code class="small">{{ token ? (token.substring(0, 15) + '...') : 'None' }}</code>
          </div>
        </div>
        <ng-template #notAuthenticated>
          <div class="d-flex align-items-center mb-2">
            <span class="badge badge-secondary mr-2">
              <i class="fas fa-times-circle"></i> Not Authenticated
            </span>
            <small class="text-muted">Please log in</small>
          </div>
        </ng-template>
      </div>
    </div>
  `,
    styles: [`
    .card {
      font-size: 0.85rem;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    }
    .border-left-primary {
      border-left: 0.25rem solid #4e73df;
    }
    .badge-sm {
      font-size: 0.7em;
    }
    code {
      font-size: 0.75em;
      color: #6c757d;
    }
  `]
})
export class AuthStatusComponent implements OnInit {
    isAuthenticated = false;
    currentUser: User | null = null;
    token: string | null = null;
    showStatus = true;

    constructor(private authService: AuthServiceService) { }

    ngOnInit(): void {
        this.updateStatus();

        // Subscribe to auth changes
        this.authService.currentUser$.subscribe(() => {
            this.updateStatus();
        });
    }

    private updateStatus(): void {
        this.isAuthenticated = this.authService.isAuthenticated();
        this.currentUser = this.authService.getCurrentUser();
        this.token = this.authService.getToken();

        // Log status for debugging
        console.log('Auth Status Update:', {
            isAuthenticated: this.isAuthenticated,
            currentUser: this.currentUser,
            hasToken: !!this.token
        });
    }
}
