import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PostsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      appName: 'Blog',
    }),
  ],
})
export class AppModule {}
