import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Post } from '@web-api-ui/web-api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private baseUrl = 'http://localhost:3333/api';
  private readonly http = inject(HttpClient);

  getAllPosts(): Observable<Post[]> {
    return this.http.get(`${this.baseUrl}/posts`) as Observable<Post[]>;
  }

  createPost(post: Post) {
    return this.http.post(`${this.baseUrl}/post`, post);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get(`${this.baseUrl}/post/${id}`);
  }
}
