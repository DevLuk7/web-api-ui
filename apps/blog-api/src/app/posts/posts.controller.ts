import { Controller, Get, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/posts')
  getAll() {
    return 'posts';
  }

  @Get('/post/:id')
  get(@Query('id') id: number) {
    return id;
  }

  @Post('/post')
  add() {
    return 'add';
  }
}
