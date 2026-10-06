import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-login',
    imports: [RouterLink, ReactiveFormsModule, MatIconModule],
    templateUrl: './login.html',
    styleUrl: './login.scss'
})
export class Login {
    passwordVisible = false;

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    togglePasswordVisibility(): void {
        this.passwordVisible = !this.passwordVisible;
    }
    onSubmit(): void {

        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        console.log(this.loginForm.value);
    }
}
