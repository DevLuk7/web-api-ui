import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { DefaultService, Post } from '@web-api-ui/web-api';
import { switchMap } from 'rxjs';

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
      const postService = inject(DefaultService);

      postService.postsControllerGetAll().subscribe((posts) => {
        patchState(store, (state) => ({ ...state, posts }));
      });
    },
  }),
  withMethods((store, postService = inject(DefaultService)) => ({
    createPost: rxMethod<Post>(
      switchMap((post) =>
        postService.postsControllerAdd(post).pipe(
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
