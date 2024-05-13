import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Post {
  @ApiProperty()
  @Prop()
  id: string;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  content: string;

  @ApiProperty()
  @Prop()
  createdBy: string;

  @ApiProperty()
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

export class GeneratePostDto {
  @ApiProperty()
  description: string;
}

export class GeneratedPostDto implements CreatePost {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  image: string;
}
