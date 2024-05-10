import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthorizationGuard } from '../authorization.guard';
import { Post as BlogPost, CreatePostDto } from './post.schema';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/posts')
  @ApiResponse({
    type: BlogPost,
    isArray: true,
  })
  getAll() {
    return this.postsService.findAll();
  }

  @Get('/post/:id')
  @ApiResponse({
    type: BlogPost,
  })
  get(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AuthorizationGuard)
  @ApiResponse({
    type: BlogPost,
  })
  @Post('/post')
  async add(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }
}
