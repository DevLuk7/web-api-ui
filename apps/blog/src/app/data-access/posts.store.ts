import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { CMSService } from './cms.service';
import { Post } from './post.model';

type PostsState = {
  posts: Post[];
  isLoading: boolean;
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
};

export const PostsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, cmsService = inject(CMSService)) => ({
    getAll() {
      patchState(store, { isLoading: true });

      cmsService.getPosts().subscribe((posts) => {
        patchState(store, { posts, isLoading: false });
      });
    },
  })),
  withHooks({
    onInit(store) {
      store.getAll();
    },
  })
);
