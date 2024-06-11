import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { config } from '../app.config';
import { Post } from './post.model';

const headers = {
  Authorization:
    'Bearer 15d40688cc9ece96ab1cc59a26ea411de6069bc3927533b7fd3e859931d4f1b61a67ee5c241ed60c03a748f47ace0fe6a659fde04482923b8355b112b25fab3b83938f381f85182bbbaae0fe7e20aabad9df986b9789a084a2953b46c6b5541f9a8f43dfc28efd18a6dece24af339cfc93d9a7d4f6a81d7fd9659575074cdbde',
}

@Injectable({ providedIn: 'root' })
export class CMSService {
  private readonly http = inject(HttpClient);
  private readonly cmsUrl = config().cmsUrl;

  getPosts(): Observable<Post[]> {
    return this.http
      .get(`${this.cmsUrl}/api/posts`, {
        headers
      })
      .pipe(map((res: any) => res.data));
  }

  getPost(slug: string): Observable<Post> {
    return this.http
      .get(`${this.cmsUrl}/api/posts?filters[slug][$eq]=${slug}`, {
        headers
      })
      .pipe(map((res: any) => res.data[0]));
  }
}
