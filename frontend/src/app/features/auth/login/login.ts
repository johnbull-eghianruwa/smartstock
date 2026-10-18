
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  passwordVisible = false;
  isSubmitting = false;
  serverError = '';

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    })
  });

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isSubmitting) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.serverError = '';
    this.isSubmitting = true;

    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(finalize(() => {
        this.isSubmitting = false;
      }))
      .subscribe({
        next: (response) => {
          // Temporary: we'll implement secure session handling next.
          console.log('Login successful:', response.data.user);

          this.router.navigate(['/dashboard']);
        },
        error: (error: { error?: { message?: string } }) => {
          this.serverError =
            error.error?.message ??
            'Unable to sign in. Please try again.';
        }
      });
  }
}
