import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrl: './login.scss'
})
export class Login {
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    onSubmit(): void{
        console.log(this.loginForm.value);
    }
}
