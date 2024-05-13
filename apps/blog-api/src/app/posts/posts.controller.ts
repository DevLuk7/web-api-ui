import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard } from '../authorization.guard';
import { Post as BlogPost, CreatePostDto } from './post.schema';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiResponse({
    type: BlogPost,
    isArray: true,
  })
  getAll() {
    return this.postsService.findAll();
  }

  @Get('/:id')
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
  @Post()
  async add(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }
}
