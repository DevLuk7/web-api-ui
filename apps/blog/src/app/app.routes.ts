import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'posts/:slug',
    component: PostComponent,
  },
  {
    path: 'posts',
    component: PostListComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
