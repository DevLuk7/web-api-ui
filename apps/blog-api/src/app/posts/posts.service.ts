import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { CreatePostDto, Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

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
}
