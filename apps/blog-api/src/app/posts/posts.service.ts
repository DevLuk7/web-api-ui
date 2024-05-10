import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
