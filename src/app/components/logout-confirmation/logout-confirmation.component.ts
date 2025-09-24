import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-logout-confirmation',
    template: `
    <div class="modal fade" [class.show]="show" [style.display]="show ? 'block' : 'none'" 
         tabindex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="logoutModalLabel">Confirm Logout</h5>
            <button type="button" class="close" (click)="onCancel()" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to logout?</p>
            <div class="alert alert-info" *ngIf="currentUser">
              <strong>Current User:</strong> {{ currentUser.name }}<br>
              <strong>Email:</strong> {{ currentUser.email }}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="onCancel()">Cancel</button>
            <button type="button" class="btn btn-danger" (click)="onConfirm()">Logout</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" [class.show]="show" *ngIf="show"></div>
  `,
    styles: [`
    .modal {
      z-index: 1050;
    }
    .modal-backdrop {
      z-index: 1040;
    }
  `]
})
export class LogoutConfirmationComponent {
    @Input() show = false;
    @Input() currentUser: any;
    @Output() confirmed = new EventEmitter<void>();
    @Output() cancelled = new EventEmitter<void>();

    onConfirm(): void {
        this.confirmed.emit();
    }

    onCancel(): void {
        this.cancelled.emit();
    }
}
