import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { OpenAIService } from '../open-ai.service';
import { CreatePostDto, GeneratedPostDto, Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>, private openAIService: OpenAIService) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel({ id: crypto.randomUUID(), ...createPostDto });
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async genearte(description: string): Promise<GeneratedPostDto> {
    const text = await this.openAIService.generatePost(description);
    const image = await this.openAIService.generateImagePost(text.content.slice(0, 800));

    return {
      title: text.title,
      content: text.content,
      image: image[0].url,
    };
  }
}
