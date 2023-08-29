import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    rememberMe: boolean = false;
    loginForm: FormGroup;
    email!: string;
    password!: string;
    submitted = false;

    token: any;
    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,

        private router: Router
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    onSubmit() {
        this.submitted = true;

        this.authService.login(this.loginForm.value).subscribe(
            (response: any) => {
                if (response.success == true) {
                    this.token = response.data.token;
                    localStorage.setItem('token', response.data.token);

                    this.router.navigate(['/']);
                } else {
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onRememberMeChange(e: any) {
        this.rememberMe = e.checked;
        console.log(this.rememberMe);
    }
}
