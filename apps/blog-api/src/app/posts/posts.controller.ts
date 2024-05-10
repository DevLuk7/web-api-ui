import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../authorization.guard';
import { CreatePostDto } from './post.schema';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/posts')
  getAll() {
    return this.postsService.findAll();
  }

  @Get('/post/:id')
  get(@Query('id') id: string) {
    console.log(id);

    return this.postsService.findOne(id);
  }

  @UseGuards(AuthorizationGuard)
  @Post('/post')
  async add(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }
}
