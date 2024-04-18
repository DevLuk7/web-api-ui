import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { Post, PostService } from '../api';

type PostsState = {
  posts: Post[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const PostsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withHooks({
    onInit(store) {
      const postService = inject(PostService);

      postService.apiPostGet().subscribe((posts) => {
        patchState(store, (state) => ({ ...state, posts }));
      });
    },
  }),
  withMethods((store, postService = inject(PostService)) => ({
    createPost: rxMethod<Post>(
      switchMap((post) =>
        postService.apiPostPost(post).pipe(
          tapResponse({
            next: (post) => {
              patchState(store, (state) => ({ ...state, posts: [...state.posts, post as Post] }));
            },
            error: console.error,
          })
        )
      )
    ),
  }))
);
