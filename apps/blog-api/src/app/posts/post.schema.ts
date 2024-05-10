import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Post {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  createdBy: string;

  @Prop()
  createdAt: Date;
}

export type PostDocument = HydratedDocument<Post>;

export const PostSchema = SchemaFactory.createForClass(Post);

export type CreatePost = Pick<Post, 'title' | 'content'>;

export class CreatePostDto implements CreatePost {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
