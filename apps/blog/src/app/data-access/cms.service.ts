import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { config } from '../app.config';
import { Post } from './post.model';


@Injectable({ providedIn: 'root' })
export class CMSService {
  private readonly http = inject(HttpClient);
  private readonly cmsUrl = config().cmsUrl;

  getPosts(): Observable<Post[]> {
    return this.http
      .get(`${this.cmsUrl}/api/posts`)
      .pipe(map((res: any) => res.data));
  }

  getPost(slug: string): Observable<Post> {
    return this.http
      .get(`${this.cmsUrl}/api/posts?filters[slug][$eq]=${slug}&populate=*`)
      .pipe(map((res: any) => res.data[0]));
  }
}
