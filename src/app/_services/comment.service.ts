import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class CommentService {
  constructor(private http: HttpClient) { }

  create(comment, post_id) {
    return this.http.post(`${environment.apiUrl}/comment/`, { comment, post_id });
  }
}
