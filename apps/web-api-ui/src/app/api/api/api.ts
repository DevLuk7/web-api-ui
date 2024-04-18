export * from './blobStorage.service';
export * from './generate.service';
export * from './post.service';
import { BlobStorageService } from './blobStorage.service';
import { GenerateService } from './generate.service';
import { PostService } from './post.service';
export const APIS = [BlobStorageService, GenerateService, PostService];
