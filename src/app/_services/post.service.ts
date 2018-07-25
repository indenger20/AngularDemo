import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Post } from '../_models';

@Injectable()
export class PostService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Post[]>(`${environment.apiUrl}/post`);
    }

    // getById(id: number) {
    //     return this.http.get(`${environment.apiUrl}/post/${id}`);
    // }

    // update(post: Post) {
    //     return this.http.put(`${environment.apiUrl}/post/${post.id}`, post);
    // }

    // delete(id: number) {
    //     return this.http.delete(`${environment.apiUrl}/post/${id}`);
    // }

    create(post: Post) {
        return this.http.post(`${environment.apiUrl}/post/`, post);
    }
}
