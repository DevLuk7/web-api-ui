import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PostsModule,
    MongooseModule.forRoot('mongodb+srv://lukass100:71HZuHvgIV8utvKF@blog.cbhdfxx.mongodb.net/', {
      appName: 'Blog',
    }),
  ],
})
export class AppModule {}
