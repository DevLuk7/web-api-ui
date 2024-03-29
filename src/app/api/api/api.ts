export * from './item.service';
import { ItemService } from './item.service';
export * from './post.service';
import { PostService } from './post.service';
export const APIS = [ItemService, PostService];
