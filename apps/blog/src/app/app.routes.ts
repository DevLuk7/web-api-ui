import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';

export const appRoutes: Route[] = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'post/:id',
    component: PostComponent,
  },
  {
    path: 'post-list',
    component: PostListComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
