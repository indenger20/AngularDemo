import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    registration(user: User) {
        return this.http.post(`${environment.apiUrl}/users/registration`, user).pipe(map(newUser => {
            // login successful if there's a jwt token in the response
            if (newUser && newUser['token']) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(newUser));
            }
            return newUser;
        }));
    }

    login() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            return this.http.get<any>(`${environment.apiUrl}/users/login`)
                .subscribe(
                    (newUser) => {
                        if (user && user.token) {
                            localStorage.setItem('currentUser', JSON.stringify(user));
                        }
                        return user;
                    },
                    error => {
                        localStorage.removeItem('currentUser');
                        this.router.navigate(['/login']);
                    }
                );
        }

    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }
}
