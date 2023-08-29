import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}

    login(user: any) {
        let data = this.http.post(
            'https://admin-service-api.onrender.com/login',
            user
        );

        return data;
    }

    logout() {
        localStorage.removeItem('token');
    }

    get token() {
        return {
            token: localStorage.getItem('token'),
        };
    }
    set token(value: any) {
        this.token = value;
        localStorage.setItem('token', value);
    }

    isExpired() {
        return false;
    }
}
