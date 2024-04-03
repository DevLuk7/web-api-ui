export * from './blobStorage.service';
import { BlobStorageService } from './blobStorage.service';
export * from './generate.service';
import { GenerateService } from './generate.service';
export * from './post.service';
import { PostService } from './post.service';
export const APIS = [BlobStorageService, GenerateService, PostService];
