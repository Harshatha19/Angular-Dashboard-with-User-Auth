import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  isLoading = false;
  errorMessage = '';
  returnUrl = '';

  constructor(
    private authservice: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get the return URL from query parameters or default to admin
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authservice.login(this.loginForm.value).subscribe(
        (result) => {
          this.isLoading = false;
          // Navigate to the return URL or admin dashboard
          this.router.navigate([this.returnUrl]);
        },
        (err: Error) => {
          this.errorMessage = err.message;
          this.isLoading = false;
        }
      );
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  // Helper methods for template
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
