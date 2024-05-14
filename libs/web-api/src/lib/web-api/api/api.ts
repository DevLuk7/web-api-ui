export * from './newsletter.service';
import { NewsletterService } from './newsletter.service';
export * from './posts.service';
import { PostsService } from './posts.service';
export const APIS = [NewsletterService, PostsService];
